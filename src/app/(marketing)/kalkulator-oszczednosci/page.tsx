import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { siteConfig, siteUrl } from "@/config/site";
import { buildBreadcrumbList, serializeJsonLd } from "@/lib/structured-data";

import { CalculatorSection } from "./_components/calculator-section";
import { calculatorContent } from "./_content/calculator";

const { title, description, path } = calculatorContent.metadata;

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
  ...buildBreadcrumbList(
    [
      { name: "Strona główna", path: "/" },
      { name: "Kalkulator oszczędności", path },
    ],
    siteUrl,
  ),
};

export default function SavingsCalculatorPage() {
  return (
    <PageMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />
      <CalculatorSection />
    </PageMotion>
  );
}
