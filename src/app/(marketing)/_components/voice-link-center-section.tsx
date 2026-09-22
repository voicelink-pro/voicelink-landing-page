import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { Button } from "@/components/ui/button";

import { homeContent } from "../_content/home";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "./reveal-motion";

const { eyebrow, heading, description, image, stats, more } =
  homeContent.voiceLinkCenter;

export function VoiceLinkCenterSection() {
  return (
    <Section
      id="voicelink-center"
      aria-labelledby="voice-link-center-heading"
      className="border-t border-foreground/6 bg-background py-[clamp(3.5rem,6vw,6rem)]"
    >
      <Container className="max-w-[80rem]">
        <RevealGroup className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          <RevealItem>
            <SectionEyebrow className="justify-center">
              {eyebrow}
            </SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2
              id="voice-link-center-heading"
              className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              {heading}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="max-w-2xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
              {description}
            </p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup>
          <RevealItem className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-[color:var(--glass)] sm:mt-12">
            <div className="absolute -inset-x-1 -top-1 bottom-0">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-top"
                sizes="(min-width: 1280px) 1280px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
                unoptimized
              />
            </div>
          </RevealItem>
        </RevealGroup>

        <RevealList className="mt-6 grid grid-cols-3 gap-2 border-t border-foreground/10 pt-6 text-center sm:mt-8 sm:gap-6 sm:pt-8">
          {stats.map((stat) => (
            <RevealListItem
              key={stat.label}
              className="text-lg font-semibold tracking-tight text-balance sm:text-3xl"
            >
              {stat.label}
            </RevealListItem>
          ))}
        </RevealList>

        <RevealGroup className="mt-7 flex justify-center">
          <RevealItem>
            <Button
              className="h-auto px-0 text-base text-eyebrow hover:text-eyebrow"
              type="button"
              variant="link"
            >
              {more.label}
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
