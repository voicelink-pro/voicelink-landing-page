import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";

import { calculatorContent } from "../_content/calculator";
import { SavingsCalculator } from "./savings-calculator";

const { eyebrow, heading, description } = calculatorContent.hero;

export function CalculatorSection() {
  return (
    <Section
      aria-labelledby="calculator-hero-heading"
      className="-mt-[calc(var(--site-header-height)-0.75rem)] border-0 bg-background px-3 pt-0 pb-3 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5"
      data-page-hero="compact"
    >
      <div className="relative overflow-hidden rounded-[clamp(1.15rem,1.6vw,1.6rem)] bg-[#071433] bg-[image:var(--calculator-background-image)] bg-cover bg-center pt-[calc(var(--site-header-height)+1.25rem)] pb-10 sm:pt-[calc(var(--site-header-height)+2rem)] sm:pb-14 lg:pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#020b24]/30"
        />
        <Container className="relative z-10">
          <RevealGroup
            className="flex max-w-3xl flex-col items-start gap-[clamp(0.875rem,2svh,1.35rem)]"
            delay={0.06}
            stagger={0.08}
            trigger="load"
          >
            <RevealItem>
              <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
                {eyebrow}
              </SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h1
                className="display-title text-white"
                id="calculator-hero-heading"
              >
                {heading}
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="section-lede max-w-2xl text-white">{description}</p>
            </RevealItem>
          </RevealGroup>

          <RevealGroup
            className="mt-8 sm:mt-10 lg:mt-12"
            delay={0.18}
            trigger="load"
          >
            <RevealItem>
              <SavingsCalculator />
            </RevealItem>
          </RevealGroup>
        </Container>
      </div>
    </Section>
  );
}
