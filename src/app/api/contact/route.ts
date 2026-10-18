import { parseContactPhone } from "@/lib/contact-phone";
import { sendContactLead, type ContactLead } from "@/lib/resend-contact";
import { sendLeadNotificationSms } from "@/lib/supervoip-sms";

const IP_LIMIT = 5;
const IP_WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY = 4_000;

type ContactCode = "invalid" | "limited" | "unavailable" | "failed";

const hits = new Map<string, number[]>();

function prune(now: number) {
  if (hits.size <= 1000) {
    return;
  }

  for (const [key, times] of hits) {
    if (times.every((time) => now - time >= IP_WINDOW_MS)) {
      hits.delete(key);
    }
  }
}

function countHits(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(
    (time) => now - time < IP_WINDOW_MS,
  );
  hits.set(key, recent);
  prune(now);

  return recent.length;
}

function takeHit(key: string) {
  const recent = hits.get(key) ?? [];
  recent.push(Date.now());
  hits.set(key, recent);
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

function json(code: ContactCode, status: number, field?: "phone" | "email") {
  return Response.json(
    { ok: false, code, field },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

function singleLine(value: unknown, max: number) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim().replace(/\s+/g, " ");

  if (
    !trimmed ||
    trimmed.length > max ||
    /[\u0000-\u001F\u007F]/.test(trimmed)
  ) {
    return null;
  }

  return trimmed;
}

function optionalMessage(value: unknown) {
  if (value == null) {
    return "";
  }

  if (typeof value !== "string" || value.length > 1500) {
    return null;
  }

  const trimmed = value.trim();

  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(trimmed)) {
    return null;
  }

  return trimmed;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function readLead(payload: unknown): ContactLead | "phone" | "email" | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const data = payload as Record<string, unknown>;
  const firstName = singleLine(data.firstName, 80);
  const lastName = singleLine(data.lastName, 80);
  const facility = singleLine(data.facility, 120);
  const message = optionalMessage(data.message);
  const phone =
    typeof data.phone === "string" ? parseContactPhone(data.phone) : null;

  if (!firstName || !lastName || !facility || message == null) {
    return null;
  }

  if (!phone) {
    return "phone";
  }

  const emailRaw = data.email;

  if (emailRaw == null || emailRaw === "") {
    return { firstName, lastName, facility, phone, email: "", message };
  }

  if (typeof emailRaw !== "string") {
    return "email";
  }

  const email = emailRaw.trim();

  if (!email) {
    return { firstName, lastName, facility, phone, email: "", message };
  }

  if (email.length > 120 || !isEmail(email)) {
    return "email";
  }

  return { firstName, lastName, facility, phone, email, message };
}

export async function POST(request: Request) {
  if (!isAllowedCaller(request)) {
    return json("failed", 403);
  }

  const raw = await request.text();

  if (raw.length > MAX_BODY) {
    return json("invalid", 400);
  }

  let payload: unknown;

  try {
    payload = JSON.parse(raw);
  } catch {
    return json("invalid", 400);
  }

  const lead = readLead(payload);

  if (lead === "phone" || lead === "email") {
    return json("invalid", 400, lead);
  }

  if (!lead) {
    return json("invalid", 400);
  }

  const address = clientAddress(request);

  if (countHits(`ip:${address}`) >= IP_LIMIT) {
    return json("limited", 429);
  }

  takeHit(`ip:${address}`);

  const result = await sendContactLead(lead);

  if (result.ok) {
    const sms = await sendLeadNotificationSms();

    if (!sms.ok && sms.reason === "failed") {
      console.error("[contact] Powiadomienie SMS nie zostało wysłane.");
    }

    return Response.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  if (result.reason === "unavailable") {
    return json("unavailable", 503);
  }

  return json("failed", 502);
}
