import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageMotion } from "@/components/layout/reveal-motion";
import { siteConfig, siteUrl } from "@/config/site";

import { MissedCallsArticleView } from "../_components/missed-calls-article-view";
import { ReceptionReliefArticleView } from "../_components/reception-relief-article-view";
import { NoShowArticleView } from "../_components/no-show-article-view";
import { PricingArticleView } from "../_components/pricing-article-view";
import { RolloutArticleView } from "../_components/rollout-article-view";
import { VoicebotArticleView } from "../_components/voicebot-article-view";
import {
  blogContent,
  missedCallsArticle,
  noShowArticle,
  pricingArticle,
  receptionReliefArticle,
  rolloutArticle,
  voicebotArticle,
} from "../_content/blog";

const articlePages = {
  [missedCallsArticle.slug]: {
    View: MissedCallsArticleView,
    details: missedCallsArticle,
  },
  [receptionReliefArticle.slug]: {
    View: ReceptionReliefArticleView,
    details: receptionReliefArticle,
  },
  [voicebotArticle.slug]: {
    View: VoicebotArticleView,
    details: voicebotArticle,
  },
  [noShowArticle.slug]: {
    View: NoShowArticleView,
    details: noShowArticle,
  },
  [pricingArticle.slug]: {
    View: PricingArticleView,
    details: pricingArticle,
  },
  [rolloutArticle.slug]: {
    View: RolloutArticleView,
    details: rolloutArticle,
  },
} as const;

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

function findArticle(slug: string) {
  return blogContent.articles.find((article) => article.slug === slug);
}

export function generateStaticParams() {
  return blogContent.articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);

  if (!article) {
    return {};
  }

  const path = `/blog/${article.slug}`;

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    authors: [{ name: article.author }],
    alternates: siteUrl ? { canonical: path } : undefined,
    openGraph: siteUrl
      ? {
          type: "article",
          locale: siteConfig.locale,
          siteName: siteConfig.name,
          title: `${article.seoTitle} | ${siteConfig.name}`,
          description: article.metaDescription,
          url: path,
          publishedTime: article.publishedAt,
          authors: [article.author],
          images: [{ url: article.coverImage }],
        }
      : undefined,
  };
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug } = await params;
  const article = findArticle(slug);

  const articlePage =
    article && article.slug in articlePages
      ? articlePages[article.slug]
      : undefined;

  if (!article || !articlePage) {
    notFound();
  }

  const { View, details } = articlePage;
  const articleUrl = siteUrl
    ? new URL(`/blog/${article.slug}`, siteUrl).toString()
    : `/blog/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: article.seoTitle,
        description: article.metaDescription,
        datePublished: article.publishedAt,
        dateModified: article.publishedAt,
        inLanguage: "pl-PL",
        url: articleUrl,
        image: siteUrl
          ? new URL(article.coverImage, siteUrl).toString()
          : article.coverImage,
        author: {
          "@type": "Organization",
          name: article.author,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
        },
        citation: details.sources.flatMap((source) =>
          ("links" in source && source.links ? source.links : [source]).map(
            (link) => ({
              "@type": "CreativeWork",
              name: source.text,
              url: link.href,
            }),
          ),
        ),
      },
      {
        "@type": "FAQPage",
        mainEntity: details.faq.map((item) => ({
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

  return (
    <PageMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <View />
    </PageMotion>
  );
}
