import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";

import { processContent } from "../_content/process";
import { ProcessStepsTimeline } from "./process-steps-timeline";

const { eyebrow, heading, items } = processContent.steps;

const processSteps = [
  { ...items[0], icon: "/informacja.webp" },
  { ...items[1], icon: "/zasady.webp" },
  { ...items[2], icon: "/brain.webp" },
  { ...items[3], icon: "/wtyczka-ethernet.webp" },
  { ...items[4], icon: "/laboratorium.webp" },
  { ...items[5], icon: "/rakieta.webp" },
  { ...items[6], icon: "/statystyki.webp" },
] as const;

export function ProcessStepsSection() {
  return (
    <Section
      id="etapy"
      aria-labelledby="process-steps-heading"
      className="scroll-mt-[var(--site-header-height)] bg-background"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="process-steps-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
        </RevealGroup>

        <ProcessStepsTimeline steps={processSteps} />
      </Container>
    </Section>
  );
}
