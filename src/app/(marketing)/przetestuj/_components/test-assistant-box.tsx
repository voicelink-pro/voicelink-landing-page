"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Image from "next/image";
import {
  CheckCircle2Icon,
  CheckIcon,
  CopyIcon,
  PhoneCallIcon,
  PhoneIncomingIcon,
  PhoneOffIcon,
} from "lucide-react";

import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";
import type { ConversationStatus } from "@/lib/elevenlabs-outbound";
import { formatPolishNational, polishNationalDigits } from "@/lib/polish-phone";
import { cn } from "@/lib/utils";

import { testAssistantContent } from "../_content/test-assistant";

const {
  eyebrow,
  heading,
  description,
  form,
  states,
  metrics,
  promptsHeading,
  prompts,
} = testAssistantContent;

type Stage =
  | "idle"
  | "calling"
  | "ringing"
  | "live"
  | "ended"
  | "unanswered"
  | "invalid"
  | "failed"
  | "unavailable"
  | "limited";

type ErrorStage = "invalid" | "failed" | "unavailable" | "limited";

type CallSession = {
  conversationId: string;
  callSid: string | null;
  callTicket: string;
  phoneE164: string;
};

type CallEventName =
  | "voicelink:test_call_initiated"
  | "voicelink:test_call_answered"
  | "voicelink:test_call_completed";

type CallEventPayload = {
  event: CallEventName;
  conversationId: string;
  callSid: string | null;
  phoneNumber: string;
  durationSecs?: number;
  answered?: boolean;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const AUTO_CALL_DELAY_MS = 800;
const POLL_INTERVAL_MS = 1_500;
const RINGING_TIMEOUT_MS = 75_000;
const MAX_POLL_DURATION_MS = 25 * 60 * 1000;

function cursorAfterDigits(formatted: string, digitCount: number) {
  if (digitCount <= 0) {
    return 0;
  }

  let seen = 0;

  for (let index = 0; index < formatted.length; index += 1) {
    if (/\d/.test(formatted[index] ?? "")) {
      seen += 1;
      if (seen === digitCount) {
        return index + 1;
      }
    }
  }

  return formatted.length;
}

function formatTimer(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function isErrorCode(value: unknown): value is ErrorStage {
  return (
    value === "invalid" ||
    value === "failed" ||
    value === "unavailable" ||
    value === "limited"
  );
}

function isConversationStatus(value: unknown): value is ConversationStatus {
  return (
    value === "initiated" ||
    value === "in-progress" ||
    value === "processing" ||
    value === "done" ||
    value === "failed"
  );
}

function emitCallEvent(payload: CallEventPayload) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent(payload.event, { detail: payload }));
}

export function TestAssistantBox() {
  const [digits, setDigits] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [session, setSession] = useState<CallSession | null>(null);
  const [elapsedSecs, setElapsedSecs] = useState(0);
  const [copiedField, setCopiedField] = useState<"cid" | "sid" | null>(null);

  const caretDigits = useRef<number | null>(null);
  const autoTimer = useRef<number | null>(null);
  const copyTimer = useRef<number | null>(null);
  const inFlight = useRef(false);
  const lastAutoNumber = useRef<string | null>(null);
  const confirmedNumber = useRef<string | null>(null);
  const requestSeq = useRef(0);
  const liveAnchorMs = useRef<number | null>(null);
  const answeredEmittedFor = useRef<string | null>(null);
  const completedEmittedFor = useRef<string | null>(null);

  useLayoutEffect(() => {
    const element = document.getElementById("test-page-phone");
    const digitsBefore = caretDigits.current;

    if (!(element instanceof HTMLInputElement) || digitsBefore === null) {
      return;
    }

    const position = cursorAfterDigits(element.value, digitsBefore);
    element.setSelectionRange(position, position);
    caretDigits.current = null;
  }, [digits]);

  useEffect(() => {
    return () => {
      if (autoTimer.current !== null) {
        window.clearTimeout(autoTimer.current);
      }
      if (copyTimer.current !== null) {
        window.clearTimeout(copyTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (stage !== "live") {
      return;
    }

    if (liveAnchorMs.current === null) {
      liveAnchorMs.current = Date.now() - elapsedSecs * 1000;
    }

    const updateTimer = () => {
      if (liveAnchorMs.current === null) {
        return;
      }

      const nextSeconds = Math.max(
        0,
        Math.floor((Date.now() - liveAnchorMs.current) / 1000),
      );
      setElapsedSecs((current) => Math.max(current, nextSeconds));
    };

    updateTimer();
    const interval = window.setInterval(updateTimer, 250);

    return () => window.clearInterval(interval);
  }, [stage, elapsedSecs]);

  useEffect(() => {
    if (!session || (stage !== "ringing" && stage !== "live")) {
      return;
    }

    let cancelled = false;
    let pollBusy = false;
    const pollStartedAt = Date.now();

    const checkStatus = async () => {
      if (cancelled || pollBusy) {
        return;
      }

      if (Date.now() - pollStartedAt > MAX_POLL_DURATION_MS) {
        setStage((current) => (current === "live" ? "ended" : "unanswered"));
        return;
      }

      if (
        stage === "ringing" &&
        liveAnchorMs.current === null &&
        Date.now() - pollStartedAt > RINGING_TIMEOUT_MS
      ) {
        setStage("unanswered");
        return;
      }

      pollBusy = true;

      try {
        const response = await fetch(
          `/api/assistant-call?ticket=${encodeURIComponent(session.callTicket)}`,
          { cache: "no-store" },
        );
        const payload: unknown = await response.json().catch(() => null);

        if (
          cancelled ||
          !response.ok ||
          !payload ||
          typeof payload !== "object"
        ) {
          return;
        }

        const status =
          "status" in payload && isConversationStatus(payload.status)
            ? payload.status
            : "initiated";
        const answered = "answered" in payload && payload.answered === true;
        const acceptedAtUnixSecs =
          "acceptedAtUnixSecs" in payload &&
          typeof payload.acceptedAtUnixSecs === "number"
            ? payload.acceptedAtUnixSecs
            : null;
        const durationSecs =
          "durationSecs" in payload && typeof payload.durationSecs === "number"
            ? Math.max(0, Math.round(payload.durationSecs))
            : 0;
        const nextSid =
          "callSid" in payload && typeof payload.callSid === "string"
            ? payload.callSid
            : session.callSid;

        if (nextSid && nextSid !== session.callSid) {
          setSession((current) =>
            current ? { ...current, callSid: nextSid } : current,
          );
        }

        if (
          (status === "in-progress" || (answered && status === "initiated")) &&
          liveAnchorMs.current === null
        ) {
          const acceptedMs =
            acceptedAtUnixSecs !== null ? acceptedAtUnixSecs * 1000 : null;
          const now = Date.now();
          liveAnchorMs.current =
            acceptedMs !== null &&
            acceptedMs <= now &&
            now - acceptedMs < 10 * 60 * 1000
              ? acceptedMs
              : now;
        }

        if (status === "in-progress" || (answered && status === "initiated")) {
          if (answeredEmittedFor.current !== session.conversationId) {
            answeredEmittedFor.current = session.conversationId;
            emitCallEvent({
              event: "voicelink:test_call_answered",
              conversationId: session.conversationId,
              callSid: nextSid,
              phoneNumber: session.phoneE164,
              answered: true,
            });
          }

          setStage("live");
          return;
        }

        if (
          status === "processing" ||
          status === "done" ||
          status === "failed"
        ) {
          const localElapsed =
            liveAnchorMs.current !== null
              ? Math.max(
                  1,
                  Math.round((Date.now() - liveAnchorMs.current) / 1000),
                )
              : 0;
          const finalDuration = Math.max(durationSecs, localElapsed);
          const wasAnswered =
            answered || liveAnchorMs.current !== null || finalDuration > 0;

          if (
            wasAnswered &&
            answeredEmittedFor.current !== session.conversationId
          ) {
            answeredEmittedFor.current = session.conversationId;
            emitCallEvent({
              event: "voicelink:test_call_answered",
              conversationId: session.conversationId,
              callSid: nextSid,
              phoneNumber: session.phoneE164,
              answered: true,
            });
          }

          setElapsedSecs(finalDuration);
          liveAnchorMs.current = null;

          if (completedEmittedFor.current !== session.conversationId) {
            completedEmittedFor.current = session.conversationId;
            emitCallEvent({
              event: "voicelink:test_call_completed",
              conversationId: session.conversationId,
              callSid: nextSid,
              phoneNumber: session.phoneE164,
              durationSecs: finalDuration,
              answered: wasAnswered,
            });
          }

          setStage(wasAnswered ? "ended" : "unanswered");
        }
      } catch {
        // Błędy chwilowe pomijamy i sprawdzamy przy kolejnym odpytaniu.
      } finally {
        pollBusy = false;
      }
    };

    void checkStatus();
    const interval = window.setInterval(() => {
      void checkStatus();
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [session, stage]);

  function clearAutoTimer() {
    if (autoTimer.current !== null) {
      window.clearTimeout(autoTimer.current);
      autoTimer.current = null;
    }
  }

  async function startCall(national: string, source: "auto" | "manual") {
    if (inFlight.current || stage === "ringing" || stage === "live") {
      return;
    }

    if (!/^[1-9]\d{8}$/.test(national)) {
      setStage("invalid");
      return;
    }

    if (source === "auto" && lastAutoNumber.current === national) {
      return;
    }

    if (source === "auto") {
      lastAutoNumber.current = national;
    }

    const seq = requestSeq.current + 1;
    requestSeq.current = seq;
    inFlight.current = true;
    liveAnchorMs.current = null;
    setElapsedSecs(0);
    setStage("calling");

    try {
      const response = await fetch("/api/assistant-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: national }),
      });
      const payload: unknown = await response.json().catch(() => null);

      if (seq !== requestSeq.current) {
        return;
      }

      if (
        response.ok &&
        payload &&
        typeof payload === "object" &&
        "conversationId" in payload &&
        typeof payload.conversationId === "string" &&
        "callTicket" in payload &&
        typeof payload.callTicket === "string"
      ) {
        const callSid =
          "callSid" in payload && typeof payload.callSid === "string"
            ? payload.callSid
            : null;
        const phoneE164 = `+48${national}`;

        confirmedNumber.current = national;
        answeredEmittedFor.current = null;
        completedEmittedFor.current = null;
        setSession({
          conversationId: payload.conversationId,
          callSid,
          callTicket: payload.callTicket,
          phoneE164,
        });
        setStage("ringing");

        emitCallEvent({
          event: "voicelink:test_call_initiated",
          conversationId: payload.conversationId,
          callSid,
          phoneNumber: phoneE164,
        });
        return;
      }

      const code =
        payload &&
        typeof payload === "object" &&
        "code" in payload &&
        isErrorCode(payload.code)
          ? payload.code
          : null;

      if (
        code === "limited" &&
        confirmedNumber.current === national &&
        session
      ) {
        setStage("ringing");
        return;
      }

      setStage(code ?? "failed");
    } catch {
      if (seq === requestSeq.current) {
        setStage("failed");
      }
    } finally {
      if (seq === requestSeq.current) {
        inFlight.current = false;
      }
    }
  }

  function scheduleCall(national: string) {
    clearAutoTimer();

    if (
      national.length !== 9 ||
      national === lastAutoNumber.current ||
      inFlight.current ||
      stage === "ringing" ||
      stage === "live"
    ) {
      return;
    }

    autoTimer.current = window.setTimeout(() => {
      autoTimer.current = null;
      void startCall(national, "auto");
    }, AUTO_CALL_DELAY_MS);
  }

  function updateDigits(raw: string, selectionStart: number) {
    const next = polishNationalDigits(raw);
    caretDigits.current = polishNationalDigits(
      raw.slice(0, selectionStart),
    ).length;
    setDigits(next);

    if (next !== digits && stage !== "ringing" && stage !== "live") {
      setStage("idle");
    }

    scheduleCall(next);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearAutoTimer();
    void startCall(digits, "manual");
  }

  async function copyValue(value: string, field: "cid" | "sid") {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      if (copyTimer.current !== null) {
        window.clearTimeout(copyTimer.current);
      }
      copyTimer.current = window.setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch {
      // Schowek może być niedostępny w niezabezpieczonym kontekście.
    }
  }

  const isBusy = stage === "calling" || stage === "ringing" || stage === "live";
  const isError =
    stage === "invalid" ||
    stage === "failed" ||
    stage === "unavailable" ||
    stage === "limited";

  const statusMessage =
    stage === "calling"
      ? states.calling
      : stage === "invalid"
        ? states.invalid
        : stage === "limited"
          ? states.limited
          : stage === "unavailable"
            ? states.unavailable
            : stage === "failed"
              ? states.failed
              : form.note;

  const buttonLabel =
    stage === "calling" || stage === "ringing"
      ? form.pendingLabel
      : stage === "live"
        ? form.inCallLabel
        : stage === "ended" || stage === "unanswered"
          ? form.retryLabel
          : form.submitLabel;

  const showMonitor =
    session !== null &&
    (stage === "ringing" ||
      stage === "live" ||
      stage === "ended" ||
      stage === "unanswered");

  return (
    <div
      className="w-full rounded-[1.5rem] border border-white/15 bg-white px-5 py-6 text-left shadow-[0_32px_90px_-36px_rgba(2,11,36,0.78)] sm:px-9 sm:py-9"
      data-call-stage={stage}
      data-call-sid={session?.callSid ?? undefined}
      data-conversation-id={session?.conversationId}
      data-duration-secs={stage === "ended" ? elapsedSecs : undefined}
    >
      <div className="flex flex-col items-center text-center">
        <Image
          src={siteConfig.logo.navy.src}
          alt={siteConfig.name}
          width={siteConfig.logo.navy.width}
          height={siteConfig.logo.navy.height}
          className="mb-5 h-7 w-auto sm:mb-6 sm:h-8"
          sizes="200px"
          unoptimized
        />
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h1
          id="test-assistant-heading"
          className="mt-3 text-[clamp(1.65rem,3.6vw,2.4rem)] leading-[1.1] font-normal tracking-[-0.035em] text-balance text-foreground"
        >
          {heading}
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-pretty text-muted-foreground sm:text-base sm:leading-7">
          {description}
        </p>
      </div>

      <form className="mt-6 sm:mt-7" noValidate onSubmit={onSubmit}>
        <FieldGroup className="gap-2.5 sm:flex-row sm:items-center sm:gap-3">
          <Field className="min-w-0 flex-1">
            <FieldLabel className="sr-only" htmlFor="test-page-phone">
              {form.phoneLabel}
            </FieldLabel>
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                +48
              </span>
              <Input
                aria-describedby="test-page-phone-status"
                aria-invalid={isError || undefined}
                autoCapitalize="off"
                autoComplete="tel-national"
                autoCorrect="off"
                className="h-12 rounded-xl border-border bg-muted/45 pr-4 pl-14 text-base text-foreground focus-visible:bg-white sm:h-13 sm:pr-5 md:text-base"
                disabled={isBusy}
                enterKeyHint="send"
                id="test-page-phone"
                inputMode="numeric"
                name="phone"
                placeholder={form.phonePlaceholder}
                spellCheck={false}
                type="tel"
                value={formatPolishNational(digits)}
                onBeforeInput={(event) => {
                  const nativeEvent = event.nativeEvent;
                  if (!(nativeEvent instanceof InputEvent)) {
                    return;
                  }

                  if (
                    nativeEvent.inputType === "insertFromPaste" ||
                    nativeEvent.inputType === "insertFromDrop"
                  ) {
                    return;
                  }

                  if (nativeEvent.data && /\D/.test(nativeEvent.data)) {
                    event.preventDefault();
                  }
                }}
                onChange={(event) => {
                  updateDigits(
                    event.target.value,
                    event.target.selectionStart ?? 0,
                  );
                }}
              />
            </div>
          </Field>
          <Button
            className="h-12 w-full shrink-0 rounded-xl px-6 text-base sm:h-13 sm:w-auto sm:px-7"
            disabled={isBusy}
            size="lg"
            type="submit"
          >
            {buttonLabel}
          </Button>
        </FieldGroup>

        <p
          aria-live="polite"
          className={cn(
            "mt-2.5 text-center text-xs leading-5 text-pretty sm:text-left sm:text-sm sm:leading-6",
            isError ? "text-destructive" : "text-muted-foreground",
          )}
          id="test-page-phone-status"
          role="status"
        >
          {statusMessage}
        </p>
      </form>

      {showMonitor && session ? (
        <div
          aria-live="polite"
          className="mt-6 rounded-2xl border border-border bg-muted/55 p-4 sm:p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <div
                className={cn(
                  "relative flex size-11 shrink-0 items-center justify-center rounded-xl text-primary-foreground",
                  stage === "live"
                    ? "bg-emerald-600"
                    : stage === "ended"
                      ? "bg-primary"
                      : stage === "unanswered"
                        ? "bg-muted-foreground"
                        : "bg-primary",
                )}
              >
                {stage === "ringing" ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 animate-ping rounded-xl bg-primary/35"
                  />
                ) : null}
                {stage === "ringing" ? (
                  <PhoneIncomingIcon className="relative size-5" />
                ) : stage === "live" ? (
                  <PhoneCallIcon className="relative size-5" />
                ) : stage === "ended" ? (
                  <CheckCircle2Icon className="relative size-5" />
                ) : (
                  <PhoneOffIcon className="relative size-5" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-base font-medium text-foreground">
                    {stage === "ringing"
                      ? states.ringingTitle
                      : stage === "live"
                        ? states.liveTitle
                        : stage === "ended"
                          ? states.endedTitle
                          : states.unansweredTitle}
                  </p>
                  {stage === "live" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/12 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                      <span className="size-1.5 animate-pulse rounded-full bg-emerald-600" />
                      Na żywo
                    </span>
                  ) : null}
                </div>
                <p className="mt-0.5 text-xs leading-5 text-pretty text-muted-foreground sm:text-sm">
                  {stage === "ringing"
                    ? states.ringingHint
                    : stage === "live"
                      ? states.liveHint
                      : stage === "ended"
                        ? states.endedHint
                        : states.unansweredHint}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-2.5 sm:shrink-0 sm:flex-col sm:items-end sm:justify-center">
              <span className="text-[0.7rem] tracking-[0.04em] text-muted-foreground uppercase">
                {stage === "ended" ? metrics.durationLabel : metrics.timerLabel}
              </span>
              <span
                className="font-mono text-2xl leading-tight font-medium tracking-tight text-foreground tabular-nums sm:text-[1.65rem]"
                data-testid="call-timer"
              >
                {formatTimer(elapsedSecs)}
              </span>
            </div>
          </div>

          <dl className="mt-4 grid gap-2.5 border-t border-border/80 pt-3.5 text-xs sm:grid-cols-2 sm:gap-3">
            <div className="flex items-center justify-between gap-2 rounded-xl border border-border/80 bg-white px-3.5 py-2.5">
              <div className="min-w-0">
                <dt className="text-[0.6875rem] text-muted-foreground">
                  {metrics.conversationIdLabel}
                </dt>
                <dd
                  className="mt-0.5 truncate font-mono text-xs font-medium text-foreground"
                  data-testid="conversation-id"
                  title={session.conversationId}
                >
                  {session.conversationId}
                </dd>
              </div>
              <Button
                aria-label={`${metrics.copyLabel} ${metrics.conversationIdLabel}`}
                className="shrink-0"
                size="icon-xs"
                type="button"
                variant="ghost"
                onClick={() => void copyValue(session.conversationId, "cid")}
              >
                {copiedField === "cid" ? (
                  <CheckIcon className="size-3.5 text-emerald-600" />
                ) : (
                  <CopyIcon className="size-3.5" />
                )}
              </Button>
            </div>

            <div className="flex items-center justify-between gap-2 rounded-xl border border-border/80 bg-white px-3.5 py-2.5">
              <div className="min-w-0">
                <dt className="text-[0.6875rem] text-muted-foreground">
                  {metrics.callSidLabel}
                </dt>
                <dd
                  className="mt-0.5 truncate font-mono text-xs font-medium text-foreground"
                  data-testid="call-sid"
                  title={session.callSid ?? "—"}
                >
                  {session.callSid ?? "—"}
                </dd>
              </div>
              {session.callSid ? (
                <Button
                  aria-label={`${metrics.copyLabel} ${metrics.callSidLabel}`}
                  className="shrink-0"
                  size="icon-xs"
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    session.callSid
                      ? void copyValue(session.callSid, "sid")
                      : undefined
                  }
                >
                  {copiedField === "sid" ? (
                    <CheckIcon className="size-3.5 text-emerald-600" />
                  ) : (
                    <CopyIcon className="size-3.5" />
                  )}
                </Button>
              ) : null}
            </div>
          </dl>
        </div>
      ) : null}

      <div className="mt-6 border-t border-border pt-5">
        <p className="text-xs font-medium tracking-[-0.01em] text-foreground sm:text-sm">
          {promptsHeading}
        </p>
        <ul className="mt-2.5 grid gap-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
          {prompts.map((prompt) => (
            <li key={prompt} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
              />
              <span>{prompt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
