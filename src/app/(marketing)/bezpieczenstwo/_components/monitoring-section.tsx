import { Container } from "@/components/layout/container";
import {
  RevealCluster,
  RevealGroup,
  RevealItem,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";

import { securityContent } from "../_content/security";

const { id, eyebrow, heading, paragraphs } = securityContent.monitoring;

export function MonitoringSection() {
  return (
    <Section
      id={id}
      aria-labelledby="monitoring-heading"
      className="relative isolate scroll-mt-[var(--site-header-height)] overflow-hidden bg-[image:var(--monitoring-background-image)] bg-cover bg-center py-[calc(var(--section-spacing)+1.5rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#020b24]/80"
      />
      <Container className="relative z-10">
        <RevealGroup className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
          <RevealCluster className="flex max-w-xl flex-col gap-4">
            <RevealItem>
              <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
                {eyebrow}
              </SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h2 id="monitoring-heading" className="section-title text-white">
                {heading}
              </h2>
            </RevealItem>
          </RevealCluster>
          <RevealCluster className="flex flex-col gap-4">
            {paragraphs.map((paragraph) => (
              <RevealItem key={paragraph}>
                <p className="text-base leading-7 text-pretty text-white sm:text-lg sm:leading-8">
                  {paragraph}
                </p>
              </RevealItem>
            ))}
          </RevealCluster>
        </RevealGroup>
      </Container>
    </Section>
  );
}
