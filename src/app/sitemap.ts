import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) {
    return [];
  }

  return [
    {
      url: siteUrl.toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/kontakt", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/cennik", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/voicelink-center", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/bezpieczenstwo", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/jak-to-dziala/funkcje", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/jak-to-dziala/integracja", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/jak-to-dziala/proces-wspolpracy", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
