import Image from "next/image";
import { PhoneIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { siteConfig } from "@/config/site";

import { functionsContent } from "../_content/functions";
import { ConversationPlayer } from "./conversation-player";

const {
  eyebrow,
  heading,
  description,
  boxTitle,
  audioSrc,
  playLabel,
  pauseLabel,
  unavailableMessage,
  callPrompt,
  phone,
  phoneHref,
} = functionsContent.demo;

export function ConversationDemoSection() {
  return (
    <Section
      aria-labelledby="conversation-demo-heading"
      className="overflow-hidden"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
          <RevealGroup className="flex max-w-xl flex-col gap-4">
            <RevealItem>
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h2 id="conversation-demo-heading" className="section-title">
                {heading}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="section-lede">{description}</p>
            </RevealItem>
          </RevealGroup>

          <RevealGroup delay={0.08}>
            <RevealItem className="editorial-panel relative overflow-hidden bg-[#163056] bg-[image:var(--conversation-demo-background-image)] bg-cover bg-center px-6 py-10 text-center text-white sm:px-10 sm:py-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-black/55"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[#0f3784]/50 mix-blend-soft-light"
              />
              <div className="relative z-10 flex flex-col items-center gap-6">
                <Image
                  src={siteConfig.logo.white.src}
                  alt={siteConfig.name}
                  width={siteConfig.logo.white.width}
                  height={siteConfig.logo.white.height}
                  className="h-8 w-auto sm:h-9"
                  sizes="200px"
                  unoptimized
                />
                <p className="subsection-title max-w-md text-xl text-white sm:text-2xl">
                  {boxTitle}
                </p>
                <ConversationPlayer
                  pauseLabel={pauseLabel}
                  playLabel={playLabel}
                  src={audioSrc}
                  unavailableMessage={unavailableMessage}
                />
                <div className="flex w-full flex-col items-center gap-3 border-t border-white/25 pt-5">
                  <p className="max-w-sm text-sm leading-6 text-pretty text-white">
                    {callPrompt}
                  </p>
                  <a
                    className="inline-flex items-center gap-2 text-xl font-semibold whitespace-nowrap text-white transition-colors hover:text-white/80"
                    href={phoneHref}
                  >
                    <PhoneIcon aria-hidden="true" className="size-5" />
                    {phone}
                  </a>
                </div>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
