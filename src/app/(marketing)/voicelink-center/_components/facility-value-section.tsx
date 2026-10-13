import { Container } from "@/components/layout/container";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";

import { centerContent } from "../_content/center";
import { CenterIcon } from "./center-icon";

const { id, eyebrow, heading, description, items } = centerContent.value;

const valueItems = [
  { ...items[0], icon: "/zegar.webp" },
  { ...items[1], icon: "/banknot.webp" },
] as const;

export function FacilityValueSection() {
  return (
    <Section
      id={id}
      aria-labelledby="center-value-heading"
      className="relative isolate scroll-mt-[var(--site-header-height)] overflow-hidden border-white/10 bg-[#020b24] bg-[image:var(--center-value-background-image)] bg-cover bg-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,11,36,0.88)_0%,rgba(2,11,36,0.8)_48%,rgba(2,11,36,0.86)_100%)]"
      />
      <Container className="relative z-10">
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
              {eyebrow}
            </SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="center-value-heading" className="section-title text-white">
              {heading}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="section-lede text-white">{description}</p>
          </RevealItem>
        </RevealGroup>

        <RevealList className="mt-12 grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-white/30">
          {valueItems.map((item) => (
            <RevealListItem
              key={item.title}
              className="flex flex-col gap-4 md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <CenterIcon className="brightness-0 invert" icon={item.icon} />
              <h3 className="subsection-title text-xl text-white">
                {item.title}
              </h3>
              <p className="text-base leading-7 text-pretty text-white">
                {item.description}
              </p>
            </RevealListItem>
          ))}
        </RevealList>
      </Container>
    </Section>
  );
}
