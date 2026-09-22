import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { homeContent } from "../_content/home";
import { RevealGroup, RevealItem } from "./reveal-motion";

const {
  eyebrow,
  heading,
  description,
  phoneLabel,
  phonePlaceholder,
  submitLabel,
  note,
} = homeContent.trial;

export function TryAssistantSection() {
  return (
    <Section
      id="jak-to-dziala"
      aria-labelledby="trial-heading"
      className="relative isolate -mx-2 overflow-hidden border-t border-foreground/6 bg-background py-[clamp(1.75rem,3vw,3rem)] sm:-mx-3 lg:-mx-4"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Image
          src="/background-2.png"
          alt=""
          fill
          className="object-contain object-center"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-white/20" />
      </div>
      <Container className="relative z-10 max-w-[80rem]">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
          <RevealGroup className="flex max-w-xl flex-col gap-4">
            <RevealItem className="flex flex-col gap-3">
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
              <h2
                id="trial-heading"
                className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
              >
                {heading}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="text-base leading-7 text-pretty text-black sm:text-lg sm:leading-8">
                {description}
              </p>
            </RevealItem>
            <RevealItem>
              <FieldGroup className="gap-3 sm:flex-row sm:items-center">
                <Field className="min-w-0 flex-1">
                  <FieldLabel className="sr-only" htmlFor="trial-phone">
                    {phoneLabel}
                  </FieldLabel>
                  <Input
                    autoComplete="tel"
                    className="h-12 rounded-lg bg-card px-4 text-base md:text-base"
                    id="trial-phone"
                    inputMode="tel"
                    name="phone"
                    placeholder={phonePlaceholder}
                    type="tel"
                  />
                </Field>
                <Button
                  className="h-12 shrink-0 px-6 text-base motion-safe:hover:-translate-y-1"
                  size="lg"
                  type="button"
                >
                  {submitLabel}
                </Button>
              </FieldGroup>
            </RevealItem>
            <RevealItem>
              <p className="max-w-md text-sm leading-6 text-pretty text-muted-foreground">
                {note}
              </p>
            </RevealItem>
          </RevealGroup>
          <RevealGroup
            className="flex justify-center lg:justify-end"
            delay={0.12}
          >
            <RevealItem>
              <Image
                src="/telefon.png"
                alt="Podgląd rozmowy z Asystentem VoiceLink na telefonie"
                width={1000}
                height={2000}
                className="h-auto w-full max-w-[18rem] object-contain sm:max-w-[20rem] lg:max-w-[22rem]"
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 20rem, 18rem"
                unoptimized
              />
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
