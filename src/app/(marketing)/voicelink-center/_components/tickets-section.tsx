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

const { id, eyebrow, heading, description, items } = centerContent.tickets;

const ticketItems = [
  { ...items[0], icon: "/zasady.webp" },
  { ...items[1], icon: "/nagranie-rozmowy.webp" },
] as const;

export function TicketsSection() {
  return (
    <Section
      id={id}
      aria-labelledby="center-tickets-heading"
      className="scroll-mt-[var(--site-header-height)] bg-background"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="center-tickets-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="section-lede">{description}</p>
          </RevealItem>
        </RevealGroup>

        <RevealList
          as="ol"
          className="mt-10 flex flex-col divide-y divide-border"
        >
          {ticketItems.map((item, index) => (
            <RevealListItem
              key={item.title}
              className="grid items-start gap-5 py-8 first:pt-0 last:pb-0 sm:grid-cols-[4rem_minmax(0,0.78fr)_minmax(0,1.22fr)] sm:gap-8 lg:gap-12"
            >
              <CenterIcon icon={item.icon} />
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
