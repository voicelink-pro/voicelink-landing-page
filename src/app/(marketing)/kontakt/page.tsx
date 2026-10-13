import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { siteConfig, siteUrl } from "@/config/site";

import { ContactSection } from "./_components/contact-section";
import { contactContent } from "./_content/contact";

const { title, description, path } = contactContent.metadata;

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

export default function ContactPage() {
  return (
    <PageMotion>
      <ContactSection />
    </PageMotion>
  );
}
