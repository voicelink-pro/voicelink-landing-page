import Link from "next/link";
import { ArrowDownIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { pricingContent } from "../_content/pricing";

const { eyebrow, heading, description, cta, costsLink } = pricingContent.hero;

const heroButtonClassName = cn(
  buttonVariants({ size: "lg" }),
  "h-12 bg-black px-7 text-base text-white hover:bg-black/85",
);

export function PricingHeroSection() {
  return (
    <Section
      aria-labelledby="pricing-hero-heading"
      className="-mt-[calc(var(--site-header-height)-0.75rem)] border-0 bg-background px-3 pt-0 pb-3 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5"
      data-page-hero="compact"
    >
      <div className="relative flex min-h-[calc(var(--page-hero-height)-1.5rem)] flex-col overflow-hidden rounded-[clamp(1.15rem,1.6vw,1.6rem)] bg-[image:var(--pricing-hero-background-image)] bg-cover bg-center pt-[calc(var(--site-header-height)-0.75rem)] sm:min-h-[calc(var(--page-hero-height)-1.75rem)] lg:min-h-[calc(var(--page-hero-height)-2rem)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#020b24]/30"
        />
        <Container className="relative z-10 flex min-w-0 flex-1 items-center">
          <RevealGroup
            className="flex w-full max-w-3xl min-w-0 flex-col items-start gap-[clamp(0.875rem,2svh,1.5rem)]"
            delay={0.08}
            stagger={0.09}
            trigger="load"
          >
            <RevealItem>
              <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
                {eyebrow}
              </SectionEyebrow>
            </RevealItem>
            <RevealItem className="w-full">
              <h1
                id="pricing-hero-heading"
                className="display-title max-w-full text-white"
              >
                {heading}
              </h1>
            </RevealItem>
            <RevealItem className="w-full">
              <p className="section-lede max-w-full text-white">
                {description}
              </p>
            </RevealItem>
            <RevealItem className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
              <Link className={heroButtonClassName} href={cta.href}>
                {cta.label}
              </Link>
              <Link className={heroButtonClassName} href={costsLink.href}>
                {costsLink.label}
                <ArrowDownIcon data-icon="inline-end" />
              </Link>
            </RevealItem>
          </RevealGroup>
        </Container>
      </div>
    </Section>
  );
}
