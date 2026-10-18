import { createHmac, timingSafeEqual } from "node:crypto";

const DEFAULT_API_BASE_URL = "https://api.elevenlabs.io";
const PROVIDER_CACHE_MS = 10 * 60 * 1000;
const CALL_TICKET_TTL_MS = 35 * 60 * 1000;

type TelephonyProvider = "twilio" | "sip_trunk" | "exotel";

type ElevenLabsConfig = {
  apiKey: string;
  agentId: string;
  phoneNumberId: string;
  baseUrl: string;
  provider: TelephonyProvider | null;
};

export type OutboundCallFailure =
  "unconfigured" | "unauthorized" | "rejected" | "unavailable";

export type OutboundCallStart = {
  conversationId: string;
  callSid: string | null;
  callTicket: string;
};

export type ConversationStatus =
  "initiated" | "in-progress" | "processing" | "done" | "failed";

export type OutboundCallStatus = {
  conversationId: string;
  callSid: string | null;
  status: ConversationStatus;
  acceptedAtUnixSecs: number | null;
  startedAtUnixSecs: number | null;
  durationSecs: number;
  answered: boolean;
};

type CallTicketPayload = {
  cid: string;
  sid: string | null;
  exp: number;
};

const outboundPaths: Record<TelephonyProvider, string> = {
  twilio: "/v1/convai/twilio/outbound-call",
  sip_trunk: "/v1/convai/sip-trunk/outbound-call",
  exotel: "/v1/convai/exotel/outbound-call",
};

const providerCache = new Map<
  string,
  { provider: TelephonyProvider; expiresAt: number }
>();

function isElevenLabsBaseUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      (url.hostname === "api.elevenlabs.io" ||
        url.hostname.endsWith(".elevenlabs.io"))
    );
  } catch {
    return false;
  }
}

function readProvider(value: string | undefined): TelephonyProvider | null {
  const provider = value?.trim().toLowerCase();

  if (!provider) {
    return null;
  }

  if (provider === "twilio" || provider === "exotel") {
    return provider;
  }

  if (provider === "sip" || provider === "sip_trunk") {
    return "sip_trunk";
  }

  return null;
}

export function hasElevenLabsConfig() {
  return readConfig() !== null;
}

function readConfig(): ElevenLabsConfig | null {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
  const agentId = process.env.ELEVENLABS_AGENT_ID?.trim();
  const phoneNumberId = process.env.ELEVENLABS_AGENT_PHONE_NUMBER_ID?.trim();
  const baseUrl = (
    process.env.ELEVENLABS_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL
  ).replace(/\/$/, "");
  const provider = readProvider(process.env.ELEVENLABS_TELEPHONY_PROVIDER);

  if (
    !apiKey ||
    !agentId ||
    !phoneNumberId ||
    !isElevenLabsBaseUrl(baseUrl) ||
    (process.env.ELEVENLABS_TELEPHONY_PROVIDER?.trim() && !provider)
  ) {
    return null;
  }

  return { apiKey, agentId, phoneNumberId, baseUrl, provider };
}

function isSafeId(value: unknown, maxLength: number): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value.length <= maxLength &&
    /^[a-zA-Z0-9_-]+$/.test(value)
  );
}

function signTicketBody(body: string, config: ElevenLabsConfig) {
  return createHmac("sha256", `${config.apiKey}:${config.agentId}`)
    .update(body)
    .digest("base64url");
}

function createCallTicket(
  conversationId: string,
  callSid: string | null,
  config: ElevenLabsConfig,
) {
  const payload: CallTicketPayload = {
    cid: conversationId,
    sid: callSid,
    exp: Date.now() + CALL_TICKET_TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signTicketBody(body, config);

  return `${body}.${signature}`;
}

function readCallTicket(ticket: string, config: ElevenLabsConfig) {
  if (ticket.length > 512) {
    return null;
  }

  const parts = ticket.split(".");
  if (parts.length !== 2) {
    return null;
  }

  const [body, signature] = parts;
  if (!body || !signature) {
    return null;
  }

  const expected = signTicketBody(body, config);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    );

    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    const cid = "cid" in parsed ? parsed.cid : null;
    const sid = "sid" in parsed ? parsed.sid : null;
    const exp = "exp" in parsed ? parsed.exp : null;

    if (
      !isSafeId(cid, 96) ||
      (sid !== null && !isSafeId(sid, 96)) ||
      typeof exp !== "number" ||
      exp <= Date.now()
    ) {
      return null;
    }

    return { cid, sid, exp };
  } catch {
    return null;
  }
}

function isProvider(value: unknown): value is TelephonyProvider {
  return value === "twilio" || value === "sip_trunk" || value === "exotel";
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

function readPositiveSeconds(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return null;
  }

  return Math.floor(value);
}

function readDurationSeconds(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return 0;
  }

  return Math.max(0, Math.round(value));
}

async function resolveProvider(config: ElevenLabsConfig) {
  if (config.provider) {
    return config.provider;
  }

  const cached = providerCache.get(config.phoneNumberId);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.provider;
  }

  const response = await fetch(`${config.baseUrl}/v1/convai/phone-numbers`, {
    headers: { "xi-api-key": config.apiKey },
    cache: "no-store",
    signal: AbortSignal.timeout(12_000),
  });

  if (!response.ok) {
    throw new Error(`phone-numbers:${response.status}`);
  }

  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error("phone-numbers:invalid");
  }

  const match = payload.find((item: unknown) => {
    return (
      !!item &&
      typeof item === "object" &&
      "phone_number_id" in item &&
      item.phone_number_id === config.phoneNumberId
    );
  });

  if (!match || typeof match !== "object") {
    throw new Error("phone-numbers:missing");
  }

  if ("supports_outbound" in match && match.supports_outbound === false) {
    throw new Error("phone-numbers:outbound-disabled");
  }

  if (!("provider" in match) || !isProvider(match.provider)) {
    throw new Error("phone-numbers:provider");
  }

  providerCache.set(config.phoneNumberId, {
    provider: match.provider,
    expiresAt: Date.now() + PROVIDER_CACHE_MS,
  });

  return match.provider;
}

export async function startOutboundCall(
  toNumber: string,
): Promise<
  | ({ ok: true } & OutboundCallStart)
  | { ok: false; reason: OutboundCallFailure }
> {
  const config = readConfig();

  if (!config) {
    console.error("[assistant-call] Brak lub błędna konfiguracja ElevenLabs.");
    return { ok: false, reason: "unconfigured" };
  }

  let provider: TelephonyProvider;

  try {
    provider = await resolveProvider(config);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown";
    console.error(`[assistant-call] Nie udało się ustalić numeru: ${detail}`);
    return {
      ok: false,
      reason: detail.startsWith("phone-numbers:")
        ? "unconfigured"
        : "unavailable",
    };
  }

  try {
    const response = await fetch(
      `${config.baseUrl}${outboundPaths[provider]}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": config.apiKey,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(20_000),
        body: JSON.stringify({
          agent_id: config.agentId,
          agent_phone_number_id: config.phoneNumberId,
          to_number: toNumber,
        }),
      },
    );

    const payload: unknown = await response.json().catch(() => null);
    const accepted =
      response.ok &&
      !!payload &&
      typeof payload === "object" &&
      "success" in payload &&
      payload.success === true;

    if (accepted) {
      const conversationId =
        "conversation_id" in payload && isSafeId(payload.conversation_id, 96)
          ? payload.conversation_id
          : null;
      const rawSid =
        "callSid" in payload
          ? payload.callSid
          : "sip_call_id" in payload
            ? payload.sip_call_id
            : null;
      const callSid = isSafeId(rawSid, 96) ? rawSid : null;

      if (!conversationId) {
        console.error(
          "[assistant-call] ElevenLabs nie zwrócił conversation_id.",
        );
        return { ok: false, reason: "rejected" };
      }

      return {
        ok: true,
        conversationId,
        callSid,
        callTicket: createCallTicket(conversationId, callSid, config),
      };
    }

    console.error(
      `[assistant-call] ElevenLabs odrzucił połączenie: ${response.status}`,
    );

    if (response.status === 401 || response.status === 403) {
      return { ok: false, reason: "unauthorized" };
    }

    return { ok: false, reason: "rejected" };
  } catch (error) {
    const detail = error instanceof Error ? error.name : "unknown";
    console.error(`[assistant-call] Błąd połączenia z ElevenLabs: ${detail}`);
    return { ok: false, reason: "unavailable" };
  }
}

export async function getOutboundCallStatus(
  ticket: string,
): Promise<
  | ({ ok: true } & OutboundCallStatus)
  | { ok: false; reason: "invalid" | "unavailable" }
> {
  const config = readConfig();
  if (!config) {
    return { ok: false, reason: "unavailable" };
  }

  const parsedTicket = readCallTicket(ticket, config);
  if (!parsedTicket) {
    return { ok: false, reason: "invalid" };
  }

  try {
    const response = await fetch(
      `${config.baseUrl}/v1/convai/conversations/${encodeURIComponent(parsedTicket.cid)}`,
      {
        headers: { "xi-api-key": config.apiKey },
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      },
    );

    if (response.status === 404) {
      return {
        ok: true,
        conversationId: parsedTicket.cid,
        callSid: parsedTicket.sid,
        status: "initiated",
        acceptedAtUnixSecs: null,
        startedAtUnixSecs: null,
        durationSecs: 0,
        answered: false,
      };
    }

    if (!response.ok) {
      return { ok: false, reason: "unavailable" };
    }

    const payload: unknown = await response.json().catch(() => null);
    if (!payload || typeof payload !== "object") {
      return { ok: false, reason: "unavailable" };
    }

    const agentId = "agent_id" in payload ? payload.agent_id : null;
    if (typeof agentId === "string" && agentId !== config.agentId) {
      return { ok: false, reason: "invalid" };
    }

    const status =
      "status" in payload && isConversationStatus(payload.status)
        ? payload.status
        : "initiated";
    const metadata =
      "metadata" in payload &&
      payload.metadata &&
      typeof payload.metadata === "object"
        ? payload.metadata
        : null;
    const acceptedAtUnixSecs =
      metadata && "accepted_time_unix_secs" in metadata
        ? readPositiveSeconds(metadata.accepted_time_unix_secs)
        : null;
    const startedAtUnixSecs =
      metadata && "start_time_unix_secs" in metadata
        ? readPositiveSeconds(metadata.start_time_unix_secs)
        : null;
    const durationSecs =
      metadata && "call_duration_secs" in metadata
        ? readDurationSeconds(metadata.call_duration_secs)
        : 0;
    const hasAudio =
      ("has_audio" in payload && payload.has_audio === true) ||
      ("has_user_audio" in payload && payload.has_user_audio === true);
    const hasTranscript =
      "transcript" in payload &&
      Array.isArray(payload.transcript) &&
      payload.transcript.length > 0;
    const answered =
      status === "in-progress" ||
      acceptedAtUnixSecs !== null ||
      durationSecs > 0 ||
      hasAudio ||
      hasTranscript;

    let callSid = parsedTicket.sid;
    if (
      !callSid &&
      metadata &&
      "phone_call" in metadata &&
      metadata.phone_call &&
      typeof metadata.phone_call === "object"
    ) {
      const phoneCall = metadata.phone_call;
      const metaSid =
        "call_sid" in phoneCall
          ? phoneCall.call_sid
          : "call_id" in phoneCall
            ? phoneCall.call_id
            : null;
      if (isSafeId(metaSid, 96)) {
        callSid = metaSid;
      }
    }

    return {
      ok: true,
      conversationId: parsedTicket.cid,
      callSid,
      status,
      acceptedAtUnixSecs,
      startedAtUnixSecs,
      durationSecs,
      answered,
    };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}
