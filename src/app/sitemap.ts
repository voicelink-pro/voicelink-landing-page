import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site";

const SITE_LAST_MODIFIED = new Date("2026-11-25");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl.toString(),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/kontakt", siteUrl).toString(),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/przetestuj", siteUrl).toString(),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/cennik", siteUrl).toString(),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/kalkulator-oszczednosci", siteUrl).toString(),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/blog", siteUrl).toString(),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: new URL(
        "/blog/ile-kosztuja-nieodebrane-telefony-w-placowce-medycznej",
        siteUrl,
      ).toString(),
      lastModified: new Date("2026-10-17"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL(
        "/blog/jak-odciazyc-rejestracje-medyczna",
        siteUrl,
      ).toString(),
      lastModified: new Date("2026-10-17"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL("/blog/voicebot-w-placowce-medycznej", siteUrl).toString(),
      lastModified: new Date("2026-10-17"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL(
        "/blog/jak-ograniczyc-nieobecnosci-pacjentow",
        siteUrl,
      ).toString(),
      lastModified: new Date("2026-10-17"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL("/blog/ile-kosztuje-voicebot-medyczny", siteUrl).toString(),
      lastModified: new Date("2026-10-17"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL(
        "/blog/wdrozenie-asystenta-glosowego-w-placowce-medycznej",
        siteUrl,
      ).toString(),
      lastModified: new Date("2026-10-17"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL("/voicelink-center", siteUrl).toString(),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/bezpieczenstwo", siteUrl).toString(),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/jak-to-dziala/funkcje", siteUrl).toString(),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/jak-to-dziala/integracja", siteUrl).toString(),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/jak-to-dziala/proces-wspolpracy", siteUrl).toString(),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
