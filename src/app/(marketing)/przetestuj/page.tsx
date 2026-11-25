import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { siteConfig, siteUrl } from "@/config/site";
import { buildBreadcrumbList, serializeJsonLd } from "@/lib/structured-data";

import { TestAssistantSection } from "./_components/test-assistant-section";
import { testAssistantContent } from "./_content/test-assistant";

const { title, description, path } = testAssistantContent.metadata;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${title} | ${siteConfig.name}`,
    description,
    url: path,
    images: [siteConfig.ogImage],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  ...buildBreadcrumbList(
    [
      { name: "Strona główna", path: "/" },
      { name: "Przetestuj asystenta", path },
    ],
    siteUrl,
  ),
};

export default function TestAssistantPage() {
  return (
    <PageMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />
      <TestAssistantSection />
    </PageMotion>
  );
}
