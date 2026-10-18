import {
  getOutboundCallStatus,
  hasElevenLabsConfig,
  startOutboundCall,
} from "@/lib/elevenlabs-outbound";
import { polishNationalDigits, toPolishE164 } from "@/lib/polish-phone";

const IP_LIMIT = 5;
const IP_WINDOW_MS = 10 * 60 * 1000;
const NUMBER_LIMIT = 1;
const NUMBER_WINDOW_MS = 90 * 1000;
const POLL_LIMIT = 180;
const POLL_WINDOW_MS = 60 * 1000;
const MAX_WINDOW_MS = IP_WINDOW_MS;

type CallCode = "invalid" | "limited" | "unavailable" | "failed";

const hits = new Map<string, number[]>();

function prune(now: number) {
  if (hits.size <= 1000) {
    return;
  }

  for (const [key, times] of hits) {
    if (times.every((time) => now - time >= MAX_WINDOW_MS)) {
      hits.delete(key);
    }
  }
}

function countHits(key: string, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(
    (time) => now - time < MAX_WINDOW_MS,
  );
  hits.set(key, recent);
  prune(now);

  return recent.filter((time) => now - time < windowMs).length;
}

function takeHit(key: string) {
  const recent = hits.get(key) ?? [];
  recent.push(Date.now());
  hits.set(key, recent);
}

function releaseHit(key: string) {
  hits.get(key)?.pop();
}

function clientAddress(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const address = forwarded?.split(",")[0]?.trim();

  return address || request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isAllowedCaller(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return false;
  }

  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (!host) {
    return false;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function json(code: CallCode, status: number) {
  return Response.json(
    { ok: false, code },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

function readPhone(payload: unknown) {
  if (!payload || typeof payload !== "object" || !("phone" in payload)) {
    return null;
  }

  const phone = payload.phone;
  if (typeof phone !== "string" || phone.length > 32) {
    return null;
  }

  return toPolishE164(polishNationalDigits(phone));
}

export async function GET(request: Request) {
  if (!isAllowedCaller(request)) {
    return json("failed", 403);
  }

  const ticket = new URL(request.url).searchParams.get("ticket")?.trim() ?? "";
  if (!ticket) {
    return json("invalid", 400);
  }

  const address = clientAddress(request);
  if (countHits(`poll:${address}`, POLL_WINDOW_MS) >= POLL_LIMIT) {
    return json("limited", 429);
  }

  takeHit(`poll:${address}`);

  const result = await getOutboundCallStatus(ticket);

  if (result.ok) {
    return Response.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  if (result.reason === "invalid") {
    return json("invalid", 400);
  }

  return json("unavailable", 503);
}

export async function POST(request: Request) {
  if (!isAllowedCaller(request)) {
    return json("failed", 403);
  }

  const raw = await request.text();
  if (raw.length > 80) {
    return json("invalid", 400);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json("invalid", 400);
  }

  const toNumber = readPhone(payload);
  if (!toNumber) {
    return json("invalid", 400);
  }

  if (!hasElevenLabsConfig()) {
    console.error("[assistant-call] Brak lub błędna konfiguracja ElevenLabs.");
    return json("unavailable", 503);
  }

  const address = clientAddress(request);
  const numberKey = `number:${toNumber}`;

  if (
    countHits(`ip:${address}`, IP_WINDOW_MS) >= IP_LIMIT ||
    countHits(numberKey, NUMBER_WINDOW_MS) >= NUMBER_LIMIT
  ) {
    return json("limited", 429);
  }

  takeHit(`ip:${address}`);
  takeHit(numberKey);

  const result = await startOutboundCall(toNumber);

  if (!result.ok) {
    releaseHit(numberKey);
  }

  if (result.ok) {
    return Response.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  if (result.reason === "rejected") {
    return json("failed", 502);
  }

  return json("unavailable", 503);
}
