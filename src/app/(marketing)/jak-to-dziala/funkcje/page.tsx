import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { FaqSection } from "@/components/sections/faq-section";
import { siteConfig, siteUrl } from "@/config/site";

import { ConfigurationSection } from "./_components/configuration-section";
import { ConversationDemoSection } from "./_components/conversation-demo-section";
import { ConversationFlowSection } from "./_components/conversation-flow-section";
import { FunctionsHeroSection } from "./_components/functions-hero-section";
import { PatientCasesSection } from "./_components/patient-cases-section";
import { functionsContent } from "./_content/functions";

const { title, description, path } = functionsContent.metadata;

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
  mainEntity: functionsContent.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FunctionsPage() {
  return (
    <PageMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <FunctionsHeroSection />
      <ConversationFlowSection />
      <PatientCasesSection />
      <ConfigurationSection />
      <ConversationDemoSection />
      <FaqSection {...functionsContent.faq} />
    </PageMotion>
  );
}
