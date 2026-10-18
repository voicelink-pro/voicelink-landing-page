import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";

import { homeContent } from "../_content/home";
import { AssistantCallForm } from "./assistant-call-form";

export function HeroSection() {
  const { heading, description, demo, stats } = homeContent.hero;

  return (
    <Section
      aria-labelledby="hero-heading"
      className="-mt-[calc(var(--site-header-height)-0.75rem)] border-0 bg-background px-3 pt-0 pb-3 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5"
    >
      <div className="relative flex min-h-[calc(100svh-1.5rem)] flex-col overflow-hidden rounded-[clamp(1.15rem,1.6vw,1.6rem)] bg-[image:var(--page-background-image)] bg-cover bg-center pt-[calc(var(--site-header-height)+clamp(1.75rem,5svh,5rem))] pb-[clamp(2rem,6svh,5rem)] sm:min-h-[calc(100svh-1.75rem)] lg:min-h-[calc(100svh-2rem)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#020b24]/40"
        />
        <Container className="relative z-10 flex flex-1 flex-col text-[#d5d5d5]">
          <RevealGroup
            className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center gap-5 text-center sm:gap-7 lg:gap-8"
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
              <AssistantCallForm
                appearance="hero"
                id="hero-phone"
                note={demo.note}
                phoneLabel={demo.phoneLabel}
                phonePlaceholder={demo.phonePlaceholder}
                submitLabel={demo.submitLabel}
              />
            </RevealItem>
          </RevealGroup>
          <RevealGroup
            className="mt-[clamp(2rem,6svh,6rem)] grid grid-cols-3 gap-2 border-t border-white/25 pt-5 text-center sm:gap-8 sm:pt-8"
            delay={0.36}
            stagger={0.07}
            trigger="load"
          >
            {stats.map((stat) => (
              <RevealItem
                key={stat.label}
                className="flex flex-col gap-1.5 sm:gap-2"
              >
                <dl>
                  <dt className="text-[clamp(1.25rem,4vw,3.5rem)] leading-none font-normal tracking-[-0.04em] text-balance text-white">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-[0.6875rem] leading-4 text-pretty text-[#d5d5d5] sm:mt-1.5 sm:text-sm sm:leading-6">
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
