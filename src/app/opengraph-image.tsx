import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "VoiceLink — wirtualny asystent głosowy AI dla placówek medycznych";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const logoPromise = readFile(
  join(process.cwd(), "public/logo-white.png"),
  "base64",
);

export default async function OpenGraphImage() {
  const logoBase64 = await logoPromise;
  const logoSrc = `data:image/png;base64,${logoBase64}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background:
          "linear-gradient(135deg, #040d24 0%, #0a2458 55%, #0f3784 100%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logoSrc}
          alt="VoiceLink"
          width={285}
          height={49}
          style={{ objectFit: "contain" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "960px",
        }}
      >
        <div
          style={{
            fontSize: 56,
            lineHeight: 1.1,
            fontWeight: 600,
            letterSpacing: "-0.03em",
          }}
        >
          Wirtualny asystent głosowy AI dla placówek medycznych
        </div>
        <div
          style={{
            fontSize: 26,
            lineHeight: 1.4,
            color: "rgba(255, 255, 255, 0.82)",
          }}
        >
          Odbiera wiele połączeń naraz, umawia wizyty i odciąża rejestrację
          także poza godzinami pracy.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
          fontSize: 20,
          color: "rgba(255, 255, 255, 0.72)",
        }}
      >
        <span>{"< 2 s do odebrania połączenia"}</span>
        <span>•</span>
        <span>Do 20 rozmów jednocześnie</span>
        <span>•</span>
        <span>Ochrona danych medycznych RODO</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
