import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

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

const { eyebrow, heading, description, items, quote, more } =
  homeContent.capabilities;

const capabilityTiles = [
  { ...items[0], icon: "/kalendarz.png" },
  { ...items[1], icon: "/powiadomienia.png" },
  { ...items[2], icon: "/recepta.png" },
  { ...items[3], icon: "/informacja.png" },
  { ...items[4], icon: "/triaz.png" },
  { ...items[5], icon: "/przekierowanie.png" },
] as const;

export function CapabilitiesSection() {
  return (
    <Section
      id="rozwiazania"
      aria-labelledby="capabilities-heading"
      className="mt-[var(--page-shell-inset)] bg-background pt-[clamp(1.75rem,3.5vw,2.75rem)] pb-[clamp(2rem,4vw,3.25rem)]"
    >
      <Container className="max-w-[80rem]">
        <div className="grid items-start gap-x-10 gap-y-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-x-20 lg:gap-y-3">
          <RevealGroup>
            <RevealItem>
              <SectionEyebrow className="lg:-translate-x-2">
                {eyebrow}
              </SectionEyebrow>
            </RevealItem>
          </RevealGroup>
          <RevealGroup
            className="flex max-w-xl flex-col gap-5 lg:col-start-1 lg:-translate-x-2 lg:gap-6"
            delay={0.05}
          >
            <RevealItem>
              <h2
                id="capabilities-heading"
                className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
              >
                {heading}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                {description}
              </p>
            </RevealItem>
            <RevealItem>
              <Button
                className="self-start motion-safe:hover:-translate-y-1"
                type="button"
                variant="default"
              >
                {quote.label}
              </Button>
            </RevealItem>
          </RevealGroup>
          <div className="flex flex-col gap-5 lg:col-start-2 lg:row-start-2">
            <RevealList className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {capabilityTiles.map((tile) => (
                <RevealListItem key={tile.title} className="h-full">
                  <CapabilityTile
                    description={tile.description}
                    icon={tile.icon}
                    title={tile.title}
                  />
                </RevealListItem>
              ))}
            </RevealList>
            <RevealGroup>
              <RevealItem>
                <Button
                  className="h-auto justify-start px-0 text-base text-eyebrow hover:text-eyebrow"
                  type="button"
                  variant="link"
                >
                  {more.label}
                  <ArrowRightIcon data-icon="inline-end" />
                </Button>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function CapabilityTile({
  description,
  icon,
  title,
}: {
  description: string;
  icon: string;
  title: string;
}) {
  return (
    <Card
      className="h-full bg-[color:var(--glass)] bg-[image:var(--glass-image)] shadow-sm ring-foreground/6 backdrop-blur-xl motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-1"
      size="sm"
    >
      <CardHeader>
        <Image
          src={icon}
          alt=""
          width={40}
          height={40}
          className="size-10 object-contain"
          sizes="40px"
          unoptimized
        />
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-pretty">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
