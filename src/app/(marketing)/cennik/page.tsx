import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { FaqSection } from "@/components/sections/faq-section";
import { siteConfig, siteUrl } from "@/config/site";
import { buildBreadcrumbList, serializeJsonLd } from "@/lib/structured-data";

import { PricingFactorsSection } from "./_components/pricing-factors-section";
import { PricingHeroSection } from "./_components/pricing-hero-section";
import { PricingIncludedSection } from "./_components/pricing-included-section";
import { PricingPlansSection } from "./_components/pricing-plans-section";
import { pricingContent } from "./_content/pricing";

const { title, description, path } = pricingContent.metadata;

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
        { name: "Cennik", path },
      ],
      siteUrl,
    ),
    {
      "@type": "FAQPage",
      mainEntity: pricingContent.faq.items.map((item) => ({
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

export default function PricingPage() {
  return (
    <PageMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
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
