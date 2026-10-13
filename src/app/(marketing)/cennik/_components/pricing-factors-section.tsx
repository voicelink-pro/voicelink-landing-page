import { Container } from "@/components/layout/container";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";

import { pricingContent } from "../_content/pricing";

const { id, eyebrow, heading, points, closing } = pricingContent.factors;

export function PricingFactorsSection() {
  return (
    <Section
      id={id}
      aria-labelledby="pricing-factors-heading"
      className="relative isolate scroll-mt-[var(--site-header-height)] overflow-hidden bg-[#020b24] bg-[image:var(--pricing-factors-background-image)] bg-cover bg-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#020b24]/80"
      />
      <Container className="relative z-10">
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
              {eyebrow}
            </SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2
              id="pricing-factors-heading"
              className="section-title text-white"
            >
              {heading}
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealList className="mt-12 grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-white/30">
          {points.map((point) => (
            <RevealListItem
              key={point}
              className="md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <p className="text-lg leading-8 text-pretty text-white sm:text-xl sm:leading-9">
                {point}
              </p>
            </RevealListItem>
          ))}
        </RevealList>

        <RevealGroup className="mt-10 border-t border-white/25 pt-8">
          <RevealItem>
            <p className="max-w-3xl text-base leading-7 text-pretty text-white sm:text-lg sm:leading-8">
              {closing}
            </p>
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
