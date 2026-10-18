"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatPolishNational, polishNationalDigits } from "@/lib/polish-phone";

import { homeContent } from "../_content/home";

const { assistantCall } = homeContent;

type CallStatus =
  | "idle"
  | "calling"
  | "success"
  | "invalid"
  | "failed"
  | "unavailable"
  | "limited";

type AssistantCallFormProps = {
  id: string;
  phoneLabel: string;
  phonePlaceholder: string;
  submitLabel: string;
  note: string;
  appearance: "hero" | "panel";
};

const AUTO_CALL_DELAY_MS = 800;

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

function isCallCode(
  value: unknown,
): value is Exclude<CallStatus, "idle" | "calling"> {
  return (
    value === "success" ||
    value === "invalid" ||
    value === "failed" ||
    value === "unavailable" ||
    value === "limited"
  );
}

export function AssistantCallForm({
  id,
  phoneLabel,
  phonePlaceholder,
  submitLabel,
  note,
  appearance,
}: AssistantCallFormProps) {
  const [digits, setDigits] = useState("");
  const [status, setStatus] = useState<CallStatus>("idle");
  const caretDigits = useRef<number | null>(null);
  const timer = useRef<number | null>(null);
  const inFlight = useRef(false);
  const lastAutoNumber = useRef<string | null>(null);
  const confirmedNumber = useRef<string | null>(null);
  const requestSeq = useRef(0);

  useLayoutEffect(() => {
    const element = document.getElementById(id);
    const digitsBefore = caretDigits.current;

    if (!(element instanceof HTMLInputElement) || digitsBefore === null) {
      return;
    }

    const position = cursorAfterDigits(element.value, digitsBefore);
    element.setSelectionRange(position, position);
    caretDigits.current = null;
  }, [digits, id]);

  useLayoutEffect(() => {
    return () => {
      if (timer.current !== null) {
        window.clearTimeout(timer.current);
      }
    };
  }, []);

  function clearTimer() {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }

  async function startCall(national: string, source: "auto" | "manual") {
    if (inFlight.current) {
      return;
    }

    if (!/^[1-9]\d{8}$/.test(national)) {
      setStatus("invalid");
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
    setStatus("calling");

    try {
      const response = await fetch("/api/assistant-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: national }),
      });
      const payload: unknown = await response.json().catch(() => null);
      const code =
        payload &&
        typeof payload === "object" &&
        "code" in payload &&
        isCallCode(payload.code)
          ? payload.code
          : null;

      if (seq !== requestSeq.current) {
        return;
      }

      if (response.ok) {
        confirmedNumber.current = national;
        setStatus("success");
        return;
      }

      if (code === "limited" && confirmedNumber.current === national) {
        setStatus("success");
        return;
      }

      setStatus(code ?? "failed");
    } catch {
      if (seq === requestSeq.current) {
        setStatus("failed");
      }
    } finally {
      if (seq === requestSeq.current) {
        inFlight.current = false;
      }
    }
  }

  function scheduleCall(national: string) {
    clearTimer();

    if (
      national.length !== 9 ||
      national === lastAutoNumber.current ||
      inFlight.current
    ) {
      return;
    }

    timer.current = window.setTimeout(() => {
      timer.current = null;
      void startCall(national, "auto");
    }, AUTO_CALL_DELAY_MS);
  }

  function updateDigits(raw: string, selectionStart: number) {
    const next = polishNationalDigits(raw);
    caretDigits.current = polishNationalDigits(
      raw.slice(0, selectionStart),
    ).length;
    setDigits(next);

    if (next !== digits) {
      setStatus("idle");
    }

    scheduleCall(next);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearTimer();
    void startCall(digits, "manual");
  }

  const isError =
    status === "invalid" ||
    status === "failed" ||
    status === "unavailable" ||
    status === "limited";
  const message =
    status === "calling"
      ? assistantCall.calling
      : status === "success"
        ? assistantCall.success
        : status === "invalid"
          ? assistantCall.invalid
          : status === "limited"
            ? assistantCall.limited
            : status === "unavailable"
              ? assistantCall.unavailable
              : status === "failed"
                ? assistantCall.failed
                : note;
  const statusId = `${id}-status`;

  const field = (className?: string) => (
    <Field className={className}>
      <FieldLabel className="sr-only" htmlFor={id}>
        {phoneLabel}
      </FieldLabel>
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm text-muted-foreground">
          +48
        </span>
        <Input
          aria-describedby={statusId}
          aria-invalid={isError || undefined}
          autoCapitalize="off"
          autoComplete="tel-national"
          autoCorrect="off"
          className="h-11 rounded-lg border-border bg-white pr-4 pl-14 text-base text-foreground sm:h-12 sm:pr-5 md:text-base"
          disabled={status === "calling"}
          enterKeyHint="send"
          id={id}
          inputMode="numeric"
          name="phone"
          placeholder={phonePlaceholder}
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
            updateDigits(event.target.value, event.target.selectionStart ?? 0);
          }}
        />
      </div>
    </Field>
  );

  const statusText = (
    <p
      aria-live="polite"
      className={cn(
        "max-w-md text-xs leading-5 text-pretty sm:text-sm sm:leading-6",
        appearance === "hero"
          ? isError
            ? "text-[#ffd0d0]"
            : "text-white"
          : isError
            ? "text-destructive"
            : "text-muted-foreground",
      )}
      id={statusId}
      role="status"
    >
      {message}
    </p>
  );

  if (appearance === "hero") {
    return (
      <form
        className="flex w-full flex-col items-center gap-2 sm:gap-3"
        noValidate
        onSubmit={onSubmit}
      >
        <div className="flex w-full max-w-sm flex-col items-stretch justify-center gap-2.5 sm:max-w-3xl sm:flex-row sm:items-center sm:gap-3">
          <FieldGroup className="sm:max-w-72">{field()}</FieldGroup>
          <Button
            className="h-11 bg-black px-6 text-base text-white hover:bg-black/85 sm:h-12 sm:px-7"
            disabled={status === "calling"}
            size="lg"
            type="submit"
          >
            {status === "calling" ? assistantCall.pendingLabel : submitLabel}
          </Button>
        </div>
        {statusText}
      </form>
    );
  }

  return (
    <form className="flex flex-col gap-4" noValidate onSubmit={onSubmit}>
      <FieldGroup className="gap-2.5 sm:flex-row sm:items-center sm:gap-3">
        {field("min-w-0 flex-1")}
        <Button
          className="h-11 w-full shrink-0 px-6 text-base sm:h-12 sm:w-auto"
          disabled={status === "calling"}
          size="lg"
          type="submit"
        >
          {status === "calling" ? assistantCall.pendingLabel : submitLabel}
        </Button>
      </FieldGroup>
      {statusText}
    </form>
  );
}
