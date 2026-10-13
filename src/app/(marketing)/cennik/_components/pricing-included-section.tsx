import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { pricingContent } from "../_content/pricing";
import { PricingIcon } from "./pricing-icon";

const { id, eyebrow, heading, items } = pricingContent.included;

const includedItems = [
  { ...items[0], icon: "/placowka.webp" },
  { ...items[1], icon: "/wtyczka-ethernet.webp" },
  { ...items[2], icon: "/voicelinkcenter.webp" },
  { ...items[3], icon: "/wsparcie-techniczne.webp" },
  { ...items[4], icon: "/statystyki.webp" },
  { ...items[5], icon: "/szyfrowanie.webp" },
] as const;

export function PricingIncludedSection() {
  return (
    <Section
      id={id}
      aria-labelledby="pricing-included-heading"
      className="scroll-mt-[var(--site-header-height)] bg-background"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="pricing-included-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealList className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {includedItems.map((item) => (
            <RevealListItem key={item.title} className="h-full">
              <article className="flex h-full flex-col gap-3 rounded-3xl border border-border bg-white p-5 ring-foreground/6 sm:p-6">
                <PricingIcon icon={item.icon} />
                <h3 className="subsection-title text-lg sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-base leading-7 text-pretty text-muted-foreground">
                  {item.description}
                </p>
                {"link" in item ? (
                  <Link
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "mt-auto h-auto justify-start px-0 text-base",
                    )}
                    href={item.link.href}
                  >
                    {item.link.label}
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                ) : null}
              </article>
            </RevealListItem>
          ))}
        </RevealList>
      </Container>
    </Section>
  );
}
