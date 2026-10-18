import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { siteConfig, siteUrl } from "@/config/site";

import { CalculatorSection } from "./_components/calculator-section";
import { calculatorContent } from "./_content/calculator";

const { title, description, path } = calculatorContent.metadata;

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

export default function SavingsCalculatorPage() {
  return (
    <PageMotion>
      <CalculatorSection />
    </PageMotion>
  );
}
