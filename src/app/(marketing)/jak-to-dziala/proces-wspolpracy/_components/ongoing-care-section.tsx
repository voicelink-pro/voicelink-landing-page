import { Container } from "@/components/layout/container";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";

import { processContent } from "../_content/process";
import { ProcessIcon } from "./process-icon";

const { eyebrow, heading, description, items } = processContent.care;

const careItems = [
  { ...items[0], icon: "/wsparcie.webp" },
  { ...items[1], icon: "/brain.webp" },
  { ...items[2], icon: "/zasady.webp" },
] as const;

export function OngoingCareSection() {
  return (
    <Section
      id="opieka"
      aria-labelledby="care-heading"
      className="scroll-mt-[var(--site-header-height)] bg-[#062059]"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
              {eyebrow}
            </SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="care-heading" className="section-title text-white">
              {heading}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="section-lede text-white">{description}</p>
          </RevealItem>
        </RevealGroup>

        <RevealList className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/30">
          {careItems.map((item) => (
            <RevealListItem
              key={item.title}
              className="flex flex-col gap-4 md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <ProcessIcon className="brightness-0 invert" icon={item.icon} />
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
