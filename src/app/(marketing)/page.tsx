import type { Metadata } from "next";

import { siteConfig, siteUrl } from "@/config/site";

import { AudienceSection } from "./_components/audience-section";
import { BenefitsSection } from "./_components/benefits-section";
import { CapabilitiesSection } from "./_components/capabilities-section";
import { ContactSection } from "./_components/contact-section";
import { FaqSection } from "./_components/faq-section";
import { HeroSection } from "./_components/hero-section";
import { IntegrationsSection } from "./_components/integrations-section";
import { PageMotion } from "./_components/reveal-motion";
import { SecuritySection } from "./_components/security-section";
import { TryAssistantSection } from "./_components/try-assistant-section";
import { VoiceLinkCenterSection } from "./_components/voice-link-center-section";
import { WorkProcessSection } from "./_components/work-process-section";

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
      <WorkProcessSection />
      <TryAssistantSection />
      <ContactSection />
      <FaqSection />
    </PageMotion>
  );
}
