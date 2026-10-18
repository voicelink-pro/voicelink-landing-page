const SUPERVOIP_BASE_URL = "https://restapi.supervoip.pl";
const POLAND_COUNTRY = "/api/countries/96";
const NOTIFICATION = "VoiceLink Nowy lead - formularz.";

function apiToken() {
  return process.env.SUPERVOIP_API_TOKEN?.trim() || "";
}

function voipNumberIri() {
  const raw = process.env.SUPERVOIP_VOIP_NUMBER_ID?.trim() || "";

  if (!raw) {
    return "";
  }

  if (raw.startsWith("/api/voip_numbers/")) {
    return raw;
  }

  return `/api/voip_numbers/${raw}`;
}

function toMsisdn(value: string) {
  const compact = value.replace(/[\s().-]/g, "");
  const digits = compact.replace(/\D/g, "");

  if (compact.startsWith("+") || compact.startsWith("00")) {
    return digits.replace(/^00/, "");
  }

  if (digits.length === 9) {
    return `48${digits}`;
  }

  return digits;
}

function recipients() {
  return (process.env.SUPERVOIP_SMS_TO ?? "")
    .split(/[,;]/)
    .map((value) => toMsisdn(value.trim()))
    .filter((value) => /^[1-9]\d{7,14}$/.test(value));
}

export async function sendLeadNotificationSms() {
  const token = apiToken();
  const voipNumber = voipNumberIri();
  const to = recipients();

  if (!token || !voipNumber || to.length === 0) {
    console.warn(
      "[contact] Pominięto SMS. Wymagane: SUPERVOIP_API_TOKEN, SUPERVOIP_VOIP_NUMBER_ID, SUPERVOIP_SMS_TO.",
    );
    return { ok: false as const, reason: "skipped" as const };
  }

  let response: Response;

  try {
    response = await fetch(`${SUPERVOIP_BASE_URL}/api/sms_messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/ld+json, application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: "voipNumber",
        recipients: to,
        voipNumber,
        text: NOTIFICATION,
        country: POLAND_COUNTRY,
      }),
    });
  } catch (error) {
    console.error("[contact] Nie udało się połączyć z SuperVoIP.", error);
    return { ok: false as const, reason: "failed" as const };
  }

  const detail = await response.text();

  if (!response.ok) {
    console.error(
      "[contact] SuperVoIP odrzucił SMS.",
      response.status,
      detail.slice(0, 300),
    );
    return { ok: false as const, reason: "failed" as const };
  }

  return { ok: true as const };
}
