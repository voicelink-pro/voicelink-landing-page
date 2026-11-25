import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { FaqSection } from "@/components/sections/faq-section";
import { siteConfig, siteUrl } from "@/config/site";
import { serializeJsonLd } from "@/lib/structured-data";

import { AudienceSection } from "./_components/audience-section";
import { BenefitsSection } from "./_components/benefits-section";
import { CapabilitiesSection } from "./_components/capabilities-section";
import { HeroSection } from "./_components/hero-section";
import { IntegrationsSection } from "./_components/integrations-section";
import { SecuritySection } from "./_components/security-section";
import { TryAssistantSection } from "./_components/try-assistant-section";
import { VoiceLinkCenterSection } from "./_components/voice-link-center-section";
import { homeContent } from "./_content/home";

const homeTitle = "VoiceLink — Asystent głosowy AI dla placówek medycznych";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: homeTitle,
    description: siteConfig.description,
    url: "/",
    images: [siteConfig.ogImage],
  },
};

const organizationId = new URL("/#organization", siteUrl).toString();
const websiteId = new URL("/#website", siteUrl).toString();

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      url: siteUrl.toString(),
      logo: new URL(siteConfig.logo.navy.src, siteUrl).toString(),
      email: siteConfig.email,
      telephone: siteConfig.phone,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        contactType: "customer service",
        areaServed: "PL",
        availableLanguage: ["pl"],
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteConfig.name,
      url: siteUrl.toString(),
      inLanguage: "pl-PL",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "FAQPage",
      mainEntity: homeContent.faq.items.map((item) => ({
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

export default function HomePage() {
  return (
    <PageMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(homeJsonLd),
        }}
      />
      <HeroSection />
      <CapabilitiesSection />
      <BenefitsSection />
      <AudienceSection />
      <IntegrationsSection />
      <VoiceLinkCenterSection />
      <SecuritySection />
      <TryAssistantSection />
      <FaqSection {...homeContent.faq} />
    </PageMotion>
  );
}
