import type { Metadata } from "next";

import { PageMotion } from "@/components/layout/reveal-motion";
import { siteConfig, siteUrl } from "@/config/site";

import { BlogArticlesSection } from "./_components/blog-articles-section";
import { BlogHeroSection } from "./_components/blog-hero-section";
import { blogContent } from "./_content/blog";

const { title, description, path } = blogContent.metadata;

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

export default function BlogPage() {
  return (
    <PageMotion>
      <BlogHeroSection />
      <BlogArticlesSection />
    </PageMotion>
  );
}
