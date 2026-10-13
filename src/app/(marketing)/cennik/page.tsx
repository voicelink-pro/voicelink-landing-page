import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { FaqSection } from "@/components/sections/faq-section";
import { siteConfig, siteUrl } from "@/config/site";

import { PricingFactorsSection } from "./_components/pricing-factors-section";
import { PricingHeroSection } from "./_components/pricing-hero-section";
import { PricingIncludedSection } from "./_components/pricing-included-section";
import { PricingPlansSection } from "./_components/pricing-plans-section";
import { pricingContent } from "./_content/pricing";

const { title, description, path } = pricingContent.metadata;

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
  mainEntity: pricingContent.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function PricingPage() {
  return (
    <PageMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PricingHeroSection />
      <PricingPlansSection />
      <PricingIncludedSection />
      <PricingFactorsSection />
      <FaqSection {...pricingContent.faq} />
    </PageMotion>
  );
}
