import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { homeContent } from "../_content/home";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "./reveal-motion";

const { eyebrow, heading, description, items, cta } = homeContent.audience;

const audienceCards = [
  { ...items[0], image: "/poz.png" },
  { ...items[1], image: "/specjalistyczne.png" },
  { ...items[2], image: "/szpital.png" },
] as const;

export function AudienceSection() {
  return (
    <Section
      id="dla-kogo"
      aria-labelledby="audience-heading"
      className="border-t border-foreground/6 bg-background py-[clamp(3.5rem,6vw,6rem)]"
    >
      <Container className="max-w-[80rem]">
        <RevealGroup className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <RevealItem>
            <SectionEyebrow className="justify-center">
              {eyebrow}
            </SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2
              id="audience-heading"
              className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              {heading}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="max-w-xl text-sm leading-6 text-pretty text-muted-foreground sm:text-base sm:leading-7">
              {description}
            </p>
          </RevealItem>
        </RevealGroup>

        <RevealList className="mx-auto mt-10 grid w-full max-w-[18.5rem] gap-4 sm:max-w-sm lg:max-w-[66rem] lg:grid-cols-3">
          {audienceCards.map((card) => (
            <RevealListItem key={card.title} className="h-full">
              <Card className="h-full gap-0 overflow-hidden bg-white py-0 shadow-none ring-foreground/8 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-1">
                <Image
                  src={card.image}
                  alt=""
                  width={1224}
                  height={1285}
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 1024px) 21rem, 24rem"
                  unoptimized
                />
                <CardHeader className="gap-3 bg-white px-5 py-5">
                  <CardTitle className="text-xl font-semibold">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-7 text-pretty">
                    {card.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </RevealListItem>
          ))}
        </RevealList>

        <RevealGroup className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-2 text-center">
          <RevealItem>
            <h3 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
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
              className="mt-3 motion-safe:hover:-translate-y-1"
              type="button"
            >
              {cta.label}
            </Button>
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
