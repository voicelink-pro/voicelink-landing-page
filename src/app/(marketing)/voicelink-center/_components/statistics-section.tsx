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

const { id, eyebrow, heading, description, items } = centerContent.statistics;

const statisticItems = [
  { ...items[0], icon: "/wiele.webp" },
  { ...items[1], icon: "/skutecznosc.webp" },
  { ...items[2], icon: "/odznaka.webp" },
  { ...items[3], icon: "/konwersacja.webp" },
] as const;

export function StatisticsSection() {
  return (
    <Section
      id={id}
      aria-labelledby="center-statistics-heading"
      className="scroll-mt-[var(--site-header-height)] bg-muted"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="center-statistics-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="section-lede">{description}</p>
          </RevealItem>
        </RevealGroup>

        <RevealList className="mt-10 grid gap-4 md:grid-cols-2">
          {statisticItems.map((item) => (
            <RevealListItem key={item.title} className="h-full">
              <article className="flex h-full flex-col gap-3 rounded-3xl border border-border bg-white p-5 ring-foreground/6 sm:p-6">
                <CenterIcon icon={item.icon} />
                <h3 className="subsection-title text-lg sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-base leading-7 text-pretty text-muted-foreground">
                  {item.description}
                </p>
              </article>
            </RevealListItem>
          ))}
        </RevealList>
      </Container>
    </Section>
  );
}
