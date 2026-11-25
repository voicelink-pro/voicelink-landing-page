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
      className="border-t border-border bg-muted pt-[var(--section-spacing)] pb-0"
    >
      <Container>
        <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-20 xl:gap-32">
          <RevealGroup className="flex max-w-xl flex-col gap-4 self-start pb-2 lg:pb-[clamp(3rem,6vw,6rem)]">
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
            className="-mt-6 flex justify-center self-end sm:-mt-8 lg:-mt-14 lg:justify-end"
            delay={0.12}
          >
            <RevealItem>
              <Image
                src="/zadzwon.webp"
                alt="Podgląd rozmowy z Asystentem VoiceLink na telefonie"
                width={900}
                height={1201}
                className="block h-auto w-[18rem] max-w-full sm:w-[21rem] lg:w-[24rem]"
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 21rem, 18rem"
              />
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
