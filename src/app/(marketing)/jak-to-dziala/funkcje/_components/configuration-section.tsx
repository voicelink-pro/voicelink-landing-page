import { Container } from "@/components/layout/container";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";

import { functionsContent } from "../_content/functions";
import { FunctionIcon } from "./function-icon";

const { eyebrow, heading, items } = functionsContent.configuration;

const configurationItems = [
  { ...items[0], icon: "/kalendarz.webp" },
  { ...items[1], icon: "/brain.webp" },
  { ...items[2], icon: "/zasady.webp" },
] as const;

export function ConfigurationSection() {
  return (
    <Section
      aria-labelledby="configuration-heading"
      className="border-t border-border bg-background"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-3">
          <RevealItem>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="configuration-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealList
          as="ol"
          className="mt-10 flex flex-col divide-y divide-border"
        >
          {configurationItems.map((item, index) => (
            <RevealListItem
              key={item.title}
              className="grid items-start gap-4 py-6 first:pt-0 last:pb-0 sm:py-8 md:grid-cols-[4rem_minmax(0,0.78fr)_minmax(0,1.22fr)] md:gap-8 lg:gap-12"
            >
              <FunctionIcon icon={item.icon} />
              <div className="flex flex-col gap-2">
                <span
                  aria-hidden="true"
                  className="text-xs font-semibold tracking-[0.16em] text-eyebrow tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="subsection-title text-xl sm:text-2xl">
                  {item.title}
                </h3>
              </div>
              <p className="section-lede">{item.description}</p>
            </RevealListItem>
          ))}
        </RevealList>
      </Container>
    </Section>
  );
}
