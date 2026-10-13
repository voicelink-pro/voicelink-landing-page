import Image from "next/image";

import { cn } from "@/lib/utils";

const brandIcons = new Set([
  "/abonament.webp",
  "/anulowanie-wizyty.webp",
  "/banknot.webp",
  "/baza-danych.webp",
  "/cofniecie-dostepu.webp",
  "/jezyki.webp",
  "/kontrola.webp",
  "/konwersacja.webp",
  "/nagranie-rozmowy.webp",
  "/pacjent-rozmowa-kopia.webp",
  "/placowka.webp",
  "/skutecznosc.webp",
  "/suwaki.webp",
  "/szyfrowanie.webp",
  "/telefon.webp",
  "/voicelinkcenter.webp",
  "/weryfikacja.webp",
  "/wsparcie-techniczne.webp",
  "/wtyczka-ethernet.webp",
  "/zegar.webp",
  "/zmiana-terminu.webp",
]);

// Glyphs that don't fill the frame the way the older navy icons do.
const iconScale: Record<string, number> = {
  "/banknot.webp": 1.32,
  "/nagranie-rozmowy.webp": 1.18,
  "/odznaka.webp": 0.84,
  "/pacjent-rozmowa.webp": 1.12,
  "/rakieta.webp": 1.14,
  "/weryfikacja.webp": 0.88,
  "/wtyczka-ethernet.webp": 1.28,
};

type BrandIconProps = {
  icon: string;
  className?: string;
  tone?: "image" | "brand";
  scale?: number;
};

export function BrandIcon({ icon, className, tone, scale }: BrandIconProps) {
  const resolvedTone = tone ?? (brandIcons.has(icon) ? "brand" : "image");
  const resolvedScale = scale ?? iconScale[icon] ?? 1;
  const scaled =
    resolvedScale === 1 ? undefined : { transform: `scale(${resolvedScale})` };

  if (resolvedTone === "brand") {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "block size-10 shrink-0 bg-primary [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]",
          className,
        )}
        style={{
          maskImage: `url("${icon}")`,
          WebkitMaskImage: `url("${icon}")`,
          ...scaled,
        }}
      />
    );
  }

  return (
    <Image
      src={icon}
      alt=""
      width={40}
      height={40}
      className={cn("block size-10 shrink-0 object-contain", className)}
      style={scaled}
      sizes="40px"
      unoptimized
    />
  );
}
