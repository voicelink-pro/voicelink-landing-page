import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { FaqSection } from "@/components/sections/faq-section";
import { siteConfig, siteUrl } from "@/config/site";
import { buildBreadcrumbList, serializeJsonLd } from "@/lib/structured-data";

import { DurationSection } from "./_components/duration-section";
import { OngoingCareSection } from "./_components/ongoing-care-section";
import { PilotSection } from "./_components/pilot-section";
import { ProcessHeroSection } from "./_components/process-hero-section";
import { ProcessStepsSection } from "./_components/process-steps-section";
import { RequirementsSection } from "./_components/requirements-section";
import { processContent } from "./_content/process";

const { title, description, path } = processContent.metadata;

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
  "@graph": [
    buildBreadcrumbList(
      [
        { name: "Strona główna", path: "/" },
        { name: "Proces współpracy", path },
      ],
      siteUrl,
    ),
    {
      "@type": "FAQPage",
      mainEntity: processContent.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function ProcessPage() {
  return (
    <PageMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />
      <ProcessHeroSection />
      <ProcessStepsSection />
      <DurationSection />
      <RequirementsSection />
      <PilotSection />
      <OngoingCareSection />
      <FaqSection {...processContent.faq} />
    </PageMotion>
  );
}
