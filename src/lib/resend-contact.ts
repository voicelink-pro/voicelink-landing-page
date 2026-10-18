import { formatPolishNational } from "@/lib/polish-phone";

const RECIPIENTS = [
  "karol.kulis@voicelink.pl",
  "jan.zielinski@voicelink.pl",
] as const;

const SUBJECT = "Nowy lead formularz Voicelink";
const FROM = "VoiceLink <kontakt@voicelink.pl>";

export type ContactLead = {
  firstName: string;
  lastName: string;
  facility: string;
  phone: string;
  email: string;
  message: string;
};

function displayPhone(phone: string) {
  if (/^[1-9]\d{8}$/.test(phone)) {
    return formatPolishNational(phone);
  }

  if (/^\+48[1-9]\d{8}$/.test(phone)) {
    return `+48 ${formatPolishNational(phone.slice(3))}`;
  }

  return phone;
}

function leadLines(lead: ContactLead) {
  return [
    `Imię: ${lead.firstName}`,
    `Nazwisko: ${lead.lastName}`,
    `Nazwa placówki: ${lead.facility}`,
    `Numer telefonu: ${displayPhone(lead.phone)}`,
    `E-mail: ${lead.email || "—"}`,
    "",
    "Wiadomość:",
    lead.message || "—",
  ];
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function sendContactLead(lead: ContactLead) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    console.error("[contact] Brak klucza RESEND_API_KEY.");
    return { ok: false as const, reason: "unavailable" as const };
  }

  const lines = leadLines(lead);
  const text = lines.join("\n");
  const html = `<div style="font-family:sans-serif;font-size:16px;line-height:1.5;color:#0f172a">${lines
    .map(
      (line) => `<p style="margin:0 0 8px">${escapeHtml(line) || "&nbsp;"}</p>`,
    )
    .join("")}</div>`;

  let response: Response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: RECIPIENTS,
        reply_to: lead.email || undefined,
        subject: SUBJECT,
        text,
        html,
      }),
    });
  } catch (error) {
    console.error("[contact] Nie udało się połączyć z Resend.", error);
    return { ok: false as const, reason: "failed" as const };
  }

  if (!response.ok) {
    const detail = await response.text();
    console.error(
      "[contact] Resend odrzucił wiadomość.",
      response.status,
      detail.slice(0, 300),
    );
    return { ok: false as const, reason: "failed" as const };
  }

  return { ok: true as const };
}
