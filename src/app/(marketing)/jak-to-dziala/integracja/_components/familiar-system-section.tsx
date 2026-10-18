import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";

import { integrationContent } from "../_content/integration";

const { eyebrow, heading, paragraphs } = integrationContent.familiarSystem;

export function FamiliarSystemSection() {
  return (
    <Section aria-labelledby="familiar-system-heading" className="bg-muted">
      <Container>
        <RevealGroup>
          <RevealItem className="relative grid items-start gap-6 overflow-hidden rounded-[1.125rem] bg-[url('/rejestracja.webp')] bg-cover bg-center px-6 py-12 sm:min-h-[26rem] sm:px-10 sm:py-16 lg:min-h-[30rem] lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-16 lg:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[#020b24]/60"
            />
            <div className="relative flex max-w-xl flex-col gap-4">
              <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
                {eyebrow}
              </SectionEyebrow>
              <h2
                id="familiar-system-heading"
                className="section-title text-white"
              >
                {heading}
              </h2>
            </div>
            <div className="relative flex flex-col gap-4">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-7 text-pretty text-white sm:text-lg sm:leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
