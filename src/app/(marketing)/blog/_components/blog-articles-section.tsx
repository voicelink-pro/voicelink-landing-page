import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";

import { blogContent } from "../_content/blog";

const { id, eyebrow, heading } = blogContent.catalog;
const { articles } = blogContent;

export function BlogArticlesSection() {
  return (
    <Section
      id={id}
      aria-labelledby="blog-articles-heading"
      className="scroll-mt-[var(--site-header-height)] bg-background"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="blog-articles-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealList className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <RevealListItem key={article.slug} className="h-full">
              <Link
                href={`/blog/${article.slug}`}
                className="group/card relative flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-2xl bg-[#071433] p-5 text-white shadow-none transition-transform duration-300 motion-safe:hover:-translate-y-0.5 sm:min-h-[16.5rem] sm:rounded-3xl sm:p-6"
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
                  <Image
                    src={article.coverImage}
                    alt=""
                    fill
                    className="object-cover brightness-90 transition-transform duration-500 ease-out motion-safe:group-hover/card:scale-[1.03]"
                    sizes="(min-width: 1024px) 23rem, (min-width: 640px) 50vw, 100vw"
                    unoptimized
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.82)_0%,rgb(0_0_0/0.62)_34%,rgb(0_0_0/0.32)_68%,rgb(0_0_0/0.18)_100%)]"
                  />
                </div>

                <div className="relative z-10 flex items-center justify-between gap-3">
                  <time
                    dateTime={article.publishedAt}
                    className="rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
                  >
                    {article.publishedDateLabel}
                  </time>
                  <span
                    aria-hidden="true"
                    className="inline-flex size-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors duration-200 group-hover/card:bg-white group-hover/card:text-[#071433]"
                  >
                    <ArrowUpRightIcon className="size-4 transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                  </span>
                </div>

                <div className="relative z-10 mt-12 flex flex-col gap-2">
                  <h3 className="subsection-title text-xl leading-snug text-white [text-shadow:0_1px_10px_rgb(0_0_0/0.45)] sm:text-2xl">
                    {article.title}
                  </h3>
                </div>
              </Link>
            </RevealListItem>
          ))}
        </RevealList>
      </Container>
    </Section>
  );
}
