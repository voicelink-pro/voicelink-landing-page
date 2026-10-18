import Image from "next/image";

import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";

import { homeContent } from "../_content/home";
import { AssistantCallForm } from "./assistant-call-form";

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
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-20 xl:gap-32">
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
              <AssistantCallForm
                appearance="panel"
                id="trial-phone"
                note={note}
                phoneLabel={phoneLabel}
                phonePlaceholder={phonePlaceholder}
                submitLabel={submitLabel}
              />
            </RevealItem>
          </RevealGroup>
          <RevealGroup
            className="flex justify-center lg:justify-end"
            delay={0.12}
          >
            <RevealItem>
              <Image
                src="/zadzwon.webp"
                alt="Podgląd rozmowy z Asystentem VoiceLink na telefonie"
                width={1000}
                height={2000}
                className="h-auto max-h-[21rem] w-auto max-w-full object-contain sm:max-h-[26rem] lg:max-h-[32rem]"
                sizes="(min-width: 1024px) 17rem, (min-width: 640px) 14rem, 12rem"
                unoptimized
              />
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
