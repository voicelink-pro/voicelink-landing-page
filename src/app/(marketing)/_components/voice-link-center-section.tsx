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
          <RevealItem className="mt-10 overflow-hidden rounded-3xl sm:mt-12">
            <Image
              src={image.src}
              alt={image.alt}
              width={1687}
              height={932}
              className="h-auto w-full"
              sizes="(min-width: 1280px) 1120px, (min-width: 640px) calc(100vw - 5rem), calc(100vw - 3rem)"
              unoptimized
            />
          </RevealItem>
        </RevealGroup>

        <RevealList className="mt-6 grid grid-cols-3 gap-2 border-t border-foreground/10 pt-6 text-center sm:mt-8 sm:gap-6 sm:pt-8">
          {stats.map((stat) => (
            <RevealListItem
              key={stat.label}
              className="text-lg font-normal tracking-[-0.03em] text-balance sm:text-3xl"
            >
              {stat.label}
            </RevealListItem>
          ))}
        </RevealList>

        <RevealGroup className="mt-7 flex justify-center">
          <RevealItem>
            <Link
              className={cn(
                buttonVariants({ variant: "link" }),
                "h-auto px-0 text-base text-eyebrow hover:text-eyebrow",
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
