import Link from "next/link";
import { ArrowDownIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { processContent } from "../_content/process";

const { eyebrow, heading, description, cta, stepsLink } = processContent.hero;

export function ProcessHeroSection() {
  return (
    <Section
      aria-labelledby="process-hero-heading"
      className="-mt-[calc(var(--site-header-height)-0.75rem)] border-0 bg-background px-3 pt-0 pb-3 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5"
      data-page-hero="compact"
    >
      <div className="relative flex min-h-[calc(var(--page-hero-height)-1.5rem)] flex-col overflow-hidden rounded-[clamp(1.15rem,1.6vw,1.6rem)] bg-[image:var(--process-hero-background-image)] bg-cover bg-center pt-[calc(var(--site-header-height)+1.25rem)] pb-8 sm:min-h-[calc(var(--page-hero-height)-1.75rem)] sm:pt-[calc(var(--site-header-height)+2rem)] sm:pb-12 lg:min-h-[calc(var(--page-hero-height)-2rem)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#020b24]/30"
        />
        <Container className="relative z-10 flex flex-1 items-center">
          <RevealGroup
            className="flex max-w-3xl flex-col items-start gap-[clamp(0.875rem,2svh,1.5rem)]"
            delay={0.08}
            stagger={0.09}
            trigger="load"
          >
            <RevealItem>
              <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
                {eyebrow}
              </SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h1
                id="process-hero-heading"
                className="display-title text-white"
              >
                {heading}
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="section-lede max-w-3xl text-white">{description}</p>
            </RevealItem>
            <RevealItem className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
              <Link
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 bg-black px-5 text-sm text-white hover:bg-black/85 sm:h-12 sm:px-7 sm:text-base",
                )}
                href={cta.href}
              >
                {cta.label}
              </Link>
              <Link
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 bg-black px-5 text-sm text-white hover:bg-black/85 sm:h-12 sm:px-7 sm:text-base",
                )}
                href={stepsLink.href}
              >
                {stepsLink.label}
                <ArrowDownIcon data-icon="inline-end" />
              </Link>
            </RevealItem>
          </RevealGroup>
        </Container>
      </div>
    </Section>
  );
}
