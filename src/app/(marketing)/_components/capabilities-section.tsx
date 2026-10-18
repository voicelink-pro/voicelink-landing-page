import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { Button } from "@/components/ui/button";

import { homeContent } from "../_content/home";
import { CapabilitiesPlayer } from "./capabilities-player";

const { eyebrow, heading, description, listen, quote, more } =
  homeContent.capabilities;

export function CapabilitiesSection() {
  return (
    <Section
      id="rozwiazania"
      aria-labelledby="capabilities-heading"
      className="border-t border-border bg-background py-[clamp(2.75rem,5vw,4.5rem)]"
    >
      <Container>
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-x-16 lg:gap-y-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] xl:gap-x-24">
          <RevealGroup
            className="flex max-w-xl flex-col gap-4 sm:gap-5 lg:col-start-1 lg:row-start-1"
            delay={0.05}
          >
            <RevealItem>
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h2 id="capabilities-heading" className="section-title">
                {heading}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="section-lede">{description}</p>
            </RevealItem>
            <RevealItem>
              <Button
                className="self-start"
                nativeButton={false}
                render={<Link href={quote.href} />}
              >
                {quote.label}
              </Button>
            </RevealItem>
          </RevealGroup>
          <div className="w-full max-w-md min-w-0 lg:col-start-2 lg:row-start-1 lg:max-w-none">
            <RevealGroup>
              <RevealItem>
                <CapabilitiesPlayer
                  imageSrc={listen.imageSrc}
                  pauseLabel={listen.pauseLabel}
                  playLabel={listen.playLabel}
                  src={listen.audioSrc}
                  subtitle={listen.subtitle}
                  title={listen.title}
                  unavailableMessage={listen.unavailableMessage}
                />
              </RevealItem>
            </RevealGroup>
          </div>
          <RevealGroup className="lg:col-start-2 lg:row-start-2">
            <RevealItem>
              <Button
                className="h-auto justify-start px-0 text-sm text-eyebrow hover:text-eyebrow sm:text-base"
                type="button"
                variant="link"
              >
                {more.label}
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
