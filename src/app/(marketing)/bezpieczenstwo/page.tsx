import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { FaqSection } from "@/components/sections/faq-section";
import { siteConfig, siteUrl } from "@/config/site";
import { buildBreadcrumbList, serializeJsonLd } from "@/lib/structured-data";

import { CenterAccessSection } from "./_components/center-access-section";
import { ConversationProtectionSection } from "./_components/conversation-protection-section";
import { MonitoringSection } from "./_components/monitoring-section";
import { PatientHandlingSection } from "./_components/patient-handling-section";
import { RetentionSection } from "./_components/retention-section";
import { SecurityHeroSection } from "./_components/security-hero-section";
import { securityContent } from "./_content/security";

const { title, description, path } = securityContent.metadata;

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
        { name: "Bezpieczeństwo", path },
      ],
      siteUrl,
    ),
    {
      "@type": "FAQPage",
      mainEntity: securityContent.faq.items.map((item) => ({
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

export default function SecurityPage() {
  return (
    <PageMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />
      <SecurityHeroSection />
      <PatientHandlingSection />
      <CenterAccessSection />
      <ConversationProtectionSection />
      <RetentionSection />
      <MonitoringSection />
      <FaqSection {...securityContent.faq} />
    </PageMotion>
  );
}
