import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { siteConfig, siteUrl } from "@/config/site";
import { buildBreadcrumbList, serializeJsonLd } from "@/lib/structured-data";

import { ContactSection } from "./_components/contact-section";
import { contactContent } from "./_content/contact";

const { title, description, path } = contactContent.metadata;

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
      { name: "Kontakt", path },
    ],
    siteUrl,
  ),
};

export default function ContactPage() {
  return (
    <PageMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />
      <ContactSection />
    </PageMotion>
  );
}
