import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { integrationContent } from "../_content/integration";

const { eyebrow, heading, paragraphs, securityCta } =
  integrationContent.calendar;

export function SharedCalendarSection() {
  return (
    <Section
      aria-labelledby="shared-calendar-heading"
      className="bg-background"
    >
      <Container>
        <RevealGroup className="mb-4 lg:mb-5">
          <RevealItem>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </RevealItem>
        </RevealGroup>

        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
          <RevealGroup className="flex max-w-xl flex-col gap-3">
            <RevealItem>
              <h2 id="shared-calendar-heading" className="section-title">
                {heading}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="section-lede text-[#4f4f4d]">{paragraphs[0]}</p>
            </RevealItem>
          </RevealGroup>
          <RevealGroup>
            <RevealItem className="relative overflow-hidden rounded-[1.125rem] bg-[url('/terminarz.webp')] bg-cover bg-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[#020b24]/45"
              />
              <div className="relative flex flex-col items-start gap-5 p-5 sm:gap-6 sm:p-6">
                <p className="text-base leading-7 text-pretty text-white sm:text-lg sm:leading-8">
                  {paragraphs[1]}
                </p>
                <Link
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "h-auto px-0 text-base text-white hover:text-white",
                  )}
                  href={securityCta.href}
                >
                  {securityCta.label}
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
