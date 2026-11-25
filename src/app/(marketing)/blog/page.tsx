import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { siteConfig, siteUrl } from "@/config/site";
import { buildBreadcrumbList, serializeJsonLd } from "@/lib/structured-data";

import { BlogArticlesSection } from "./_components/blog-articles-section";
import { BlogHeroSection } from "./_components/blog-hero-section";
import { blogContent } from "./_content/blog";

const { title, description, path } = blogContent.metadata;

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
      { name: "Blog", path },
    ],
    siteUrl,
  ),
};

export default function BlogPage() {
  return (
    <PageMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />
      <BlogHeroSection />
      <BlogArticlesSection />
    </PageMotion>
  );
}
