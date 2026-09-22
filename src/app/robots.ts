import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const allowIndexing =
    Boolean(siteUrl) && process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

  return {
    rules: {
      userAgent: "*",
      ...(allowIndexing ? { allow: "/" } : { disallow: "/" }),
    },
    ...(siteUrl
      ? { sitemap: new URL("/sitemap.xml", siteUrl).toString() }
      : {}),
  };
}
