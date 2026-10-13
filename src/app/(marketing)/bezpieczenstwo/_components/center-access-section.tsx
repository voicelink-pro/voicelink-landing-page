import { Container } from "@/components/layout/container";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";

import { securityContent } from "../_content/security";
import { SecurityIcon } from "./security-icon";

const { id, eyebrow, heading, description, items } = securityContent.access;

const accessItems = [
  { ...items[0], icon: "/kontrola.webp" },
  { ...items[1], icon: "/baza-danych.webp" },
  { ...items[2], icon: "/zasady.webp" },
] as const;

export function CenterAccessSection() {
  return (
    <Section
      id={id}
      aria-labelledby="center-access-heading"
      className="scroll-mt-[var(--site-header-height)] bg-muted py-[clamp(2.5rem,4.5vw,4rem)]"
    >
      <Container>
        <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-10">
          <RevealGroup className="flex flex-col justify-center gap-4">
            <RevealItem>
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h2 id="center-access-heading" className="section-title">
                {heading}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="section-lede">{description}</p>
            </RevealItem>
          </RevealGroup>

          <RevealList className="grid gap-2.5 lg:h-full lg:grid-rows-3">
            {accessItems.map((item) => (
              <RevealListItem key={item.title} className="min-h-0">
                <article className="flex h-full flex-col justify-center gap-2 rounded-[1.125rem] bg-white px-4 py-3.5 ring-1 ring-foreground/8 sm:px-5">
                  <div className="flex items-center gap-3">
                    <SecurityIcon className="size-9" icon={item.icon} />
                    <h3 className="subsection-title text-lg leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {item.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-6 text-pretty text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              </RevealListItem>
            ))}
          </RevealList>
        </div>
      </Container>
    </Section>
  );
}
