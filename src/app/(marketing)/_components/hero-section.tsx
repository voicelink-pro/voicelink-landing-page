import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

import { homeContent } from "../_content/home";
import { RevealGroup, RevealItem } from "./reveal-motion";

export function HeroSection() {
  const { heading, description, demo, stats } = homeContent.hero;

  return (
    <Section
      aria-labelledby="hero-heading"
      className="flex min-h-[calc(100svh-var(--page-shell-inset)-var(--site-header-height))] flex-col py-[clamp(1rem,4svh,2.5rem)]"
    >
      <Container className="flex flex-1 flex-col">
        <RevealGroup
          className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center gap-[clamp(1rem,2.5svh,1.75rem)] text-center"
          delay={0.08}
          stagger={0.09}
          trigger="load"
        >
          <RevealItem>
            <h1
              id="hero-heading"
              className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              {heading}
            </h1>
          </RevealItem>
          <RevealItem className="flex justify-center">
            <p className="max-w-2xl text-sm leading-6 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
              {description}
            </p>
          </RevealItem>
          <RevealItem className="flex w-full justify-center">
            <div className="flex w-full flex-col items-center gap-2 sm:gap-3">
              <div className="flex w-full max-w-3xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <FieldGroup className="sm:max-w-56">
                  <Field>
                    <FieldLabel className="sr-only" htmlFor="hero-phone">
                      {demo.phoneLabel}
                    </FieldLabel>
                    <Input
                      autoComplete="tel"
                      className="h-11 rounded-lg bg-card px-3 text-base md:text-base"
                      id="hero-phone"
                      inputMode="tel"
                      name="phone"
                      placeholder={demo.phonePlaceholder}
                      type="tel"
                    />
                  </Field>
                </FieldGroup>
                <Button className="h-11 px-6 text-base" size="lg" type="button">
                  {demo.submitLabel}
                </Button>
              </div>
              <p className="max-w-md text-xs leading-5 text-pretty text-muted-foreground sm:text-sm sm:leading-6">
                {demo.note}
              </p>
            </div>
          </RevealItem>
        </RevealGroup>
        <RevealGroup
          className="mt-[clamp(2.75rem,9svh,6.5rem)] grid grid-cols-3 gap-2 border-t border-foreground/10 pt-[clamp(1rem,2.5svh,2.5rem)] text-center sm:gap-6"
          delay={0.36}
          stagger={0.07}
          trigger="load"
        >
          {stats.map((stat) => (
            <RevealItem key={stat.label} className="flex flex-col gap-2">
              <dl>
                <dt className="text-lg font-semibold tracking-tight text-balance sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="text-[0.6875rem] leading-4 text-pretty text-muted-foreground sm:text-sm sm:leading-6">
                  {stat.label}
                </dd>
              </dl>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
