import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { FaqSection } from "@/components/sections/faq-section";
import { siteConfig, siteUrl } from "@/config/site";

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
  alternates: siteUrl ? { canonical: path } : undefined,
  openGraph: siteUrl
    ? {
        type: "website",
        locale: siteConfig.locale,
        siteName: siteConfig.name,
        title: `${title} | ${siteConfig.name}`,
        description,
        url: path,
      }
    : undefined,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: processContent.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function ProcessPage() {
  return (
    <PageMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
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
