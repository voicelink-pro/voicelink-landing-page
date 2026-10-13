import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { FaqSection } from "@/components/sections/faq-section";
import { siteConfig, siteUrl } from "@/config/site";

import { AudienceSection } from "./_components/audience-section";
import { BenefitsSection } from "./_components/benefits-section";
import { CapabilitiesSection } from "./_components/capabilities-section";
import { HeroSection } from "./_components/hero-section";
import { IntegrationsSection } from "./_components/integrations-section";
import { SecuritySection } from "./_components/security-section";
import { TryAssistantSection } from "./_components/try-assistant-section";
import { VoiceLinkCenterSection } from "./_components/voice-link-center-section";
import { homeContent } from "./_content/home";

export const metadata: Metadata = {
  title: { absolute: siteConfig.name },
  description: siteConfig.description,
  alternates: siteUrl ? { canonical: "/" } : undefined,
};

export default function HomePage() {
  return (
    <PageMotion>
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
