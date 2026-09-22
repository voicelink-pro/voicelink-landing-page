import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { homeContent } from "../_content/home";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "./reveal-motion";

const { eyebrow, heading, description, beforeLabel, afterLabel, items } =
  homeContent.benefits;

export function BenefitsSection() {
  return (
    <Section
      id="korzysci"
      aria-labelledby="benefits-heading"
      className="relative isolate -mx-2 overflow-hidden border-t border-foreground/6 bg-[image:var(--benefits-background-image)] bg-cover bg-center py-[clamp(3.25rem,5vw,5rem)] sm:-mx-3 lg:-mx-4"
    >
      <Container className="relative z-10 max-w-[80rem]">
        <RevealGroup className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <RevealItem>
            <SectionEyebrow className="justify-center">
              {eyebrow}
            </SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2
              id="benefits-heading"
              className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              {heading}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="max-w-xl text-sm leading-6 text-pretty text-muted-foreground sm:text-base sm:leading-7">
              {description}
            </p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup
          aria-hidden="true"
          className="mt-8 hidden grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] gap-3 sm:grid"
        >
          <RevealItem>
            <p className="px-4 text-center text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase sm:text-base">
              {beforeLabel}
            </p>
          </RevealItem>
          <RevealItem>
            <p className="px-4 text-center text-sm font-semibold tracking-[0.14em] text-eyebrow uppercase sm:text-base">
              {afterLabel}
            </p>
          </RevealItem>
        </RevealGroup>

        <RevealList as="ol" className="mt-8 grid gap-3 sm:mt-3">
          {items.map((item, index) => (
            <RevealListItem key={item.title}>
              <article className="grid items-center gap-3 sm:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
                <Card
                  className="self-center bg-foreground/12 shadow-none ring-foreground/12 [--card-spacing:--spacing(2.5)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-1"
                  size="sm"
                >
                  <CardHeader className="gap-2">
                    <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase sm:hidden">
                      {beforeLabel}
                    </p>
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[0.625rem] font-medium tracking-widest text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <CardTitle className="text-sm font-semibold sm:text-base">
                        {item.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                </Card>

                <Card
                  className="bg-white/72 shadow-none ring-white/70 backdrop-blur-md motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-1"
                  size="sm"
                >
                  <CardHeader className="gap-2">
                    <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-eyebrow uppercase sm:hidden">
                      {afterLabel}
                    </p>
                    <CardTitle className="text-base font-semibold sm:text-lg">
                      {item.afterTitle}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </article>
            </RevealListItem>
          ))}
        </RevealList>
      </Container>
    </Section>
  );
}
