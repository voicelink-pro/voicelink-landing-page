import { Container } from "@/components/layout/container";
import {
  RevealCluster,
  RevealGroup,
  RevealItem,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";

import { processContent } from "../_content/process";

const { eyebrow, heading, stat, emphasis, paragraphs } =
  processContent.duration;

function EmphasizedText({
  emphasis,
  text,
}: {
  emphasis: string;
  text: string;
}) {
  const start = text.indexOf(emphasis);

  if (start === -1) {
    return text;
  }

  return (
    <>
      {text.slice(0, start)}
      <strong className="font-medium text-white">{emphasis}</strong>
      {text.slice(start + emphasis.length)}
    </>
  );
}

export function DurationSection() {
  return (
    <Section
      id="czas-uruchomienia"
      aria-labelledby="duration-heading"
      className="relative isolate scroll-mt-[var(--site-header-height)] overflow-hidden bg-[image:var(--duration-background-image)] bg-cover bg-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#020b24]/50"
      />
      <Container className="relative z-10">
        <RevealGroup className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
          <RevealCluster className="flex max-w-xl flex-col gap-4">
            <RevealItem>
              <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
                {eyebrow}
              </SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h2 id="duration-heading" className="section-title text-white">
                {heading}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-2 flex flex-col gap-1 border-t border-white/25 pt-5">
                <span className="subsection-title text-5xl text-white sm:text-6xl">
                  {stat.value}
                </span>
                <span className="text-sm font-medium tracking-[0.14em] text-white uppercase">
                  {stat.unit}
                </span>
                <span className="mt-1 max-w-xs text-sm leading-6 text-pretty text-white">
                  {stat.caption}
                </span>
              </p>
            </RevealItem>
          </RevealCluster>
          <RevealCluster className="flex flex-col gap-4">
            {paragraphs.map((paragraph) => (
              <RevealItem key={paragraph}>
                <p className="text-base leading-7 text-pretty text-white sm:text-lg sm:leading-8">
                  <EmphasizedText emphasis={emphasis} text={paragraph} />
                </p>
              </RevealItem>
            ))}
          </RevealCluster>
        </RevealGroup>
      </Container>
    </Section>
  );
}
