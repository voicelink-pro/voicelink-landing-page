import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { FaqSection } from "@/components/sections/faq-section";
import { siteConfig, siteUrl } from "@/config/site";
import { buildBreadcrumbList, serializeJsonLd } from "@/lib/structured-data";

import { AnalyticsSection } from "./_components/analytics-section";
import { CenterHeroSection } from "./_components/center-hero-section";
import { FacilityValueSection } from "./_components/facility-value-section";
import { StatisticsSection } from "./_components/statistics-section";
import { TeamAccessSection } from "./_components/team-access-section";
import { TicketsSection } from "./_components/tickets-section";
import { centerContent } from "./_content/center";

const { title, description, path } = centerContent.metadata;

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
        { name: "VoiceLink Center", path },
      ],
      siteUrl,
    ),
    {
      "@type": "FAQPage",
      mainEntity: centerContent.faq.items.map((item) => ({
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

export default function VoiceLinkCenterPage() {
  return (
    <PageMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />
      <CenterHeroSection />
      <StatisticsSection />
      <TicketsSection />
      <AnalyticsSection />
      <FacilityValueSection />
      <TeamAccessSection />
      <FaqSection {...centerContent.faq} />
    </PageMotion>
  );
}
