import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { siteConfig, siteUrl } from "@/config/site";

import { TestAssistantSection } from "./_components/test-assistant-section";
import { testAssistantContent } from "./_content/test-assistant";

const { title, description, path } = testAssistantContent.metadata;

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

export default function TestAssistantPage() {
  return (
    <PageMotion>
      <TestAssistantSection />
    </PageMotion>
  );
}
