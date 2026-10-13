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

const { eyebrow, heading, description, items } = processContent.pilot;

const pilotItems = [
  { ...items[0], icon: "/TAK.webp" },
  { ...items[1], icon: "/odznaka.webp" },
  { ...items[2], icon: "/abonament.webp" },
] as const;

export function PilotSection() {
  return (
    <Section
      id="pilotaz"
      aria-labelledby="pilot-heading"
      className="scroll-mt-[var(--site-header-height)] bg-muted"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
          <RevealGroup className="flex max-w-xl flex-col gap-4">
            <RevealItem>
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h2 id="pilot-heading" className="section-title">
                {heading}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="section-lede">{description}</p>
            </RevealItem>
          </RevealGroup>

          <RevealList className="flex flex-col gap-2">
            {pilotItems.map((item) => (
              <RevealListItem
                key={item.title}
                className="flex flex-col gap-2 rounded-xl bg-white p-3.5 ring-1 ring-foreground/8 sm:p-4"
              >
                <ProcessIcon className="size-8" icon={item.icon} />
                <h3 className="subsection-title text-base sm:text-lg">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-pretty text-muted-foreground">
                  {item.description}
                </p>
              </RevealListItem>
            ))}
          </RevealList>
        </div>
      </Container>
    </Section>
  );
}
