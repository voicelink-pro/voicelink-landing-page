import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { FaqSection } from "@/components/sections/faq-section";
import { siteConfig, siteUrl } from "@/config/site";

import { ControlledAccessSection } from "./_components/controlled-access-section";
import { FamiliarSystemSection } from "./_components/familiar-system-section";
import { IntegrationHeroSection } from "./_components/integration-hero-section";
import { LaunchSection } from "./_components/launch-section";
import { SharedCalendarSection } from "./_components/shared-calendar-section";
import { SystemsSection } from "./_components/systems-section";
import { VisitOperationsSection } from "./_components/visit-operations-section";
import { integrationContent } from "./_content/integration";

const { title, description, path } = integrationContent.metadata;

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
  mainEntity: integrationContent.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function IntegrationPage() {
  return (
    <PageMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <IntegrationHeroSection />
      <SharedCalendarSection />
      <SystemsSection />
      <VisitOperationsSection />
      <LaunchSection />
      <FamiliarSystemSection />
      <ControlledAccessSection />
      <FaqSection {...integrationContent.faq} />
    </PageMotion>
  );
}
