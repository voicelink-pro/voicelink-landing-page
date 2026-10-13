import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { homeContent } from "../_content/home";

export function HeroSection() {
  const { heading, description, demo, stats } = homeContent.hero;

  return (
    <Section
      aria-labelledby="hero-heading"
      className="-mt-[calc(var(--site-header-height)-0.75rem)] border-0 bg-background px-3 pt-0 pb-3 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5"
    >
      <div className="relative flex min-h-[calc(100svh-1.5rem)] flex-col overflow-hidden rounded-[clamp(1.15rem,1.6vw,1.6rem)] bg-[image:var(--page-background-image)] bg-cover bg-center pt-[calc(var(--site-header-height)-0.75rem+clamp(3rem,7svh,6rem))] pb-[clamp(3rem,7svh,6rem)] sm:min-h-[calc(100svh-1.75rem)] lg:min-h-[calc(100svh-2rem)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#020b24]/40"
        />
        <Container className="relative z-10 flex flex-1 flex-col text-[#d5d5d5]">
          <RevealGroup
            className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center gap-8 text-center"
            delay={0.08}
            stagger={0.09}
            trigger="load"
          >
            <RevealItem>
              <h1 id="hero-heading" className="display-title text-white">
                {heading}
              </h1>
            </RevealItem>
            <RevealItem className="flex justify-center">
              <p className="section-lede max-w-2xl text-[#d5d5d5]">
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
                        className="h-12 rounded-lg border-border bg-white px-5 text-base text-foreground md:text-base"
                        id="hero-phone"
                        inputMode="tel"
                        name="phone"
                        placeholder={demo.phonePlaceholder}
                        type="tel"
                      />
                    </Field>
                  </FieldGroup>
                  <Button
                    className="h-12 bg-black px-7 text-base text-white hover:bg-black/85"
                    size="lg"
                    type="button"
                  >
                    {demo.submitLabel}
                  </Button>
                </div>
                <p className="max-w-md text-xs leading-5 text-pretty text-white sm:text-sm sm:leading-6">
                  {demo.note}
                </p>
              </div>
            </RevealItem>
          </RevealGroup>
          <RevealGroup
            className="mt-[clamp(3rem,9svh,7rem)] grid grid-cols-3 gap-3 border-t border-white/25 pt-6 text-center sm:gap-8 sm:pt-8"
            delay={0.36}
            stagger={0.07}
            trigger="load"
          >
            {stats.map((stat) => (
              <RevealItem key={stat.label} className="flex flex-col gap-2">
                <dl>
                  <dt className="text-[clamp(1.5rem,4vw,3.5rem)] leading-none font-normal tracking-[-0.04em] text-balance text-white">
                    {stat.value}
                  </dt>
                  <dd className="text-[0.6875rem] leading-4 text-pretty text-[#d5d5d5] sm:text-sm sm:leading-6">
                    {stat.label}
                  </dd>
                </dl>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </div>
    </Section>
  );
}
