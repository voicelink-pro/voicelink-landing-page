import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { homeContent } from "../_content/home";

const { eyebrow, heading, description, image, stats, more } =
  homeContent.voiceLinkCenter;

export function VoiceLinkCenterSection() {
  return (
    <Section
      id="voicelink-center"
      aria-labelledby="voice-link-center-heading"
      className="border-t border-border bg-muted"
    >
      <Container>
        <RevealGroup className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          <RevealItem>
            <SectionEyebrow className="justify-center">
              {eyebrow}
            </SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="voice-link-center-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="section-lede max-w-2xl">{description}</p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup>
          <RevealItem className="mt-8 overflow-hidden rounded-2xl sm:mt-12 sm:rounded-3xl">
            <Image
              src={image.src}
              alt={image.alt}
              width={3420}
              height={1894}
              className="h-auto w-full"
              sizes="(min-width: 1280px) 1120px, (min-width: 640px) calc(100vw - 5rem), calc(100vw - 2.5rem)"
              unoptimized
            />
          </RevealItem>
        </RevealGroup>

        <RevealList className="mt-6 grid grid-cols-3 gap-2 border-t border-foreground/10 pt-5 text-center sm:mt-8 sm:gap-6 sm:pt-8">
          {stats.map((stat) => (
            <RevealListItem
              key={stat.label}
              className="text-sm leading-snug font-normal tracking-[-0.03em] text-balance sm:text-2xl lg:text-3xl"
            >
              {stat.label}
            </RevealListItem>
          ))}
        </RevealList>

        <RevealGroup className="mt-6 flex justify-center sm:mt-7">
          <RevealItem>
            <Link
              className={cn(
                buttonVariants({ variant: "link" }),
                "h-auto px-0 text-center text-sm text-eyebrow hover:text-eyebrow sm:text-base",
              )}
              href={more.href}
            >
              {more.label}
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
