import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { homeContent } from "../_content/home";

const { eyebrow, heading, description, items, cta } = homeContent.audience;

const audienceRows = [
  [
    { ...items[0], image: "/poz.png" },
    { ...items[1], image: "/specjalistyczne.png" },
    { ...items[2], image: "/szpital.png" },
  ],
  [
    { ...items[3], image: "/stomatologia.png" },
    { ...items[4], image: "/psychoterapia.png" },
  ],
] as const;

const audienceRowClassName =
  "grid w-full gap-4 lg:grid-rows-[minmax(16rem,1fr)_auto_auto]";

function AudienceCard({
  card,
}: {
  card: { title: string; description: string; image: string };
}) {
  return (
    <RevealListItem className="h-full lg:row-span-3 lg:grid lg:grid-rows-subgrid">
      <Card className="relative h-full gap-0 overflow-visible border-0 bg-neutral-950 py-0 text-white shadow-none max-lg:min-h-[34rem] max-lg:justify-end lg:row-span-3 lg:grid lg:grid-rows-subgrid">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <Image
            src={card.image}
            alt=""
            fill
            className="object-cover brightness-75"
            sizes="(min-width: 1024px) 21rem, 24rem"
            unoptimized
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.78)_0%,rgb(0_0_0/0.64)_24%,rgb(0_0_0/0.52)_42%,rgb(0_0_0/0.28)_70%,rgb(0_0_0/0.14)_88%,rgb(0_0_0/0.06)_100%)]"
          />
        </div>
        <div className="relative z-10 flex flex-col gap-3 px-6 pt-24 pb-6 lg:contents">
          <CardTitle className="subsection-title relative z-10 text-2xl text-white [text-shadow:0_1px_10px_rgb(0_0_0/0.45)] lg:col-start-1 lg:row-start-2 lg:self-start lg:px-6 lg:pb-3">
            {card.title.split("\n").map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </CardTitle>
          <CardDescription className="relative z-10 text-[0.9375rem] leading-7 text-pretty text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.4)] lg:col-start-1 lg:row-start-3 lg:self-start lg:px-6 lg:pb-6">
            {card.description}
          </CardDescription>
        </div>
      </Card>
    </RevealListItem>
  );
}

export function AudienceSection() {
  return (
    <Section
      id="dla-kogo"
      aria-labelledby="audience-heading"
      className="border-t border-border bg-background"
    >
      <Container>
        <RevealGroup className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <RevealItem>
            <SectionEyebrow className="justify-center">
              {eyebrow}
            </SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="audience-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="section-lede max-w-xl">{description}</p>
          </RevealItem>
        </RevealGroup>

        <div className="mx-auto mt-10 w-full max-w-[18.5rem] sm:max-w-sm lg:max-w-[66rem]">
          <RevealList className={cn(audienceRowClassName, "lg:grid-cols-3")}>
            {audienceRows[0].map((card) => (
              <AudienceCard key={card.title} card={card} />
            ))}
          </RevealList>
          <RevealList
            className={cn(
              audienceRowClassName,
              "mx-auto mt-4 lg:w-[calc((100%-2rem)/3*2+1rem)] lg:grid-cols-2",
            )}
          >
            {audienceRows[1].map((card) => (
              <AudienceCard key={card.title} card={card} />
            ))}
          </RevealList>
        </div>

        <RevealGroup className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-2 text-center">
          <RevealItem>
            <h3 className="subsection-title text-xl sm:text-2xl">
              {cta.heading}
            </h3>
          </RevealItem>
          <RevealItem>
            <p className="text-sm leading-6 text-muted-foreground sm:text-base">
              {cta.description}
            </p>
          </RevealItem>
          <RevealItem>
            <Button
              className="mt-3"
              nativeButton={false}
              render={<Link href={cta.href} />}
            >
              {cta.label}
            </Button>
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
