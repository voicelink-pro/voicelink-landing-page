import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, CalendarIcon, ClockIcon, UserIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

type ArticleHeroProps = {
  title: string;
  author: string;
  publishedAt: string;
  publishedDateLabel: string;
  readingTime: string;
  coverImage: string;
  coverPosition?: string;
};

export function ArticleHero({
  title,
  author,
  publishedAt,
  publishedDateLabel,
  readingTime,
  coverImage,
  coverPosition = "object-center",
}: ArticleHeroProps) {
  return (
    <Section
      aria-labelledby="article-hero-heading"
      className="-mt-[calc(var(--site-header-height)-0.75rem)] border-0 bg-background px-3 pt-0 pb-0 sm:px-4 lg:px-5"
      data-page-hero="compact"
    >
      <div className="overflow-hidden rounded-[clamp(1.15rem,1.6vw,1.6rem)] bg-background">
        <div className="relative h-[clamp(7.5rem,28vw,24.5rem)] w-full bg-[#071433]">
          <Image
            src={coverImage}
            alt=""
            fill
            priority
            unoptimized
            className={cn("object-cover", coverPosition)}
            sizes="100vw"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,11,36,0.42)_0%,rgba(2,11,36,0)_42%)]"
          />
        </div>

        <Container className="flex flex-col items-start gap-4 py-6 sm:py-8">
          <nav aria-label="Ścieżka nawigacji">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-white"
            >
              <ArrowLeftIcon aria-hidden="true" className="size-3.5" />
              <span>Wróć do bloga</span>
            </Link>
          </nav>

          <h1
            id="article-hero-heading"
            className="max-w-4xl text-[clamp(1.85rem,2.2vw+1rem,3.15rem)] leading-[1.08] font-normal tracking-[-0.04em] text-balance text-foreground"
          >
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-foreground/80 sm:gap-3 sm:text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
              <UserIcon aria-hidden="true" className="size-3.5" />
              <span>{author}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
              <CalendarIcon aria-hidden="true" className="size-3.5" />
              <time dateTime={publishedAt}>{publishedDateLabel}</time>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
              <ClockIcon aria-hidden="true" className="size-3.5" />
              <span>{readingTime}</span>
            </span>
          </div>
        </Container>
      </div>
    </Section>
  );
}
