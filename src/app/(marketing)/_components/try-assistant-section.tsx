import Image from "next/image";

import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { homeContent } from "../_content/home";

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
      className="border-t border-border bg-muted py-[clamp(2.75rem,5vw,4.5rem)]"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-32">
          <RevealGroup className="flex max-w-xl flex-col gap-4">
            <RevealItem>
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h2 id="trial-heading" className="section-title">
                {heading}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="section-lede">{description}</p>
            </RevealItem>
            <RevealItem>
              <FieldGroup className="gap-3 sm:flex-row sm:items-center">
                <Field className="min-w-0 flex-1">
                  <FieldLabel className="sr-only" htmlFor="trial-phone">
                    {phoneLabel}
                  </FieldLabel>
                  <Input
                    autoComplete="tel"
                    className="h-12 rounded-lg border-border bg-white px-5 text-base md:text-base"
                    id="trial-phone"
                    inputMode="tel"
                    name="phone"
                    placeholder={phonePlaceholder}
                    type="tel"
                  />
                </Field>
                <Button
                  className="h-12 shrink-0 px-6 text-base"
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
                className="h-auto max-h-[28rem] w-auto max-w-full object-contain sm:max-h-[32rem] lg:max-h-[34rem]"
                sizes="(min-width: 1024px) 17rem, (min-width: 640px) 16rem, 14rem"
                unoptimized
              />
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
