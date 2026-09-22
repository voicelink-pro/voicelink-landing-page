import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { homeContent } from "../_content/home";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "./reveal-motion";

const { eyebrow, heading, description, featured, items, more } =
  homeContent.integrations;

const glassCardClassName =
  "glass-surface overflow-visible bg-transparent ring-white/40 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-1";

const featuredLogo = {
  src: "/logo-osoz.png",
  width: 886,
  height: 260,
} as const;

const integrationCards = [
  { ...items[0], logo: { src: "/logo-mydr.png", width: 400, height: 400 } },
  { ...items[1], logo: { src: "/logo-cloudi.png", width: 280, height: 280 } },
  {
    ...items[2],
    logo: { src: "/logo-proassist.png", width: 447, height: 447 },
  },
  {
    ...items[3],
    logo: { src: "/logo-googlewebp.webp", width: 960, height: 960 },
  },
  {
    ...items[4],
    logo: { src: "/wlasny.png", width: 1254, height: 1254 },
  },
] as const;

export function IntegrationsSection() {
  return (
    <Section
      id="integracje"
      aria-labelledby="integrations-heading"
      className="relative isolate -mx-2 overflow-hidden border-t border-foreground/6 bg-[image:var(--integrations-background-image)] bg-cover bg-center py-[clamp(3.5rem,6vw,6rem)] sm:-mx-3 lg:-mx-4"
    >
      <Container className="max-w-[80rem] px-10 sm:px-16 lg:px-12">
        <div className="grid items-start gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-x-16">
          <RevealGroup className="flex max-w-xl flex-col gap-4 lg:gap-5">
            <RevealItem>
              <SectionEyebrow className="text-white [&_img]:brightness-0 [&_img]:invert">
                {eyebrow}
              </SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h2
                id="integrations-heading"
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
          </RevealGroup>

          <div className="flex flex-col gap-3 sm:gap-4">
            <RevealGroup>
              <RevealItem>
                <Card
                  className={cn(
                    glassCardClassName,
                    "min-h-[12rem] justify-center sm:min-h-[14rem]",
                  )}
                >
                  <CardHeader className="gap-5 sm:flex-row sm:items-center sm:gap-6">
                    <span className="flex h-16 w-[11.5rem] shrink-0 items-center justify-center rounded-xl bg-white px-3 sm:h-[4.5rem] sm:w-52">
                      <Image
                        src={featuredLogo.src}
                        alt=""
                        width={featuredLogo.width}
                        height={featuredLogo.height}
                        className="h-10 w-auto object-contain sm:h-11"
                        sizes="208px"
                        unoptimized
                      />
                    </span>
                    <div className="flex min-w-0 flex-col gap-3">
                      <CardTitle className="text-2xl font-semibold sm:text-3xl">
                        {featured.title}
                      </CardTitle>
                      <ul className="flex flex-wrap gap-2">
                        {featured.systems.map((system) => (
                          <li key={system}>
                            <span className="inline-flex rounded-lg bg-foreground/4 px-3 py-1.5 text-sm text-muted-foreground">
                              {system}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardHeader>
                </Card>
              </RevealItem>
            </RevealGroup>

            <RevealList className="grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
              {integrationCards.map((item) => (
                <RevealListItem key={item.title} className="h-full">
                  <Card
                    className={cn(
                      glassCardClassName,
                      "h-full min-h-[7.5rem] justify-center",
                    )}
                    size="sm"
                  >
                    <CardHeader className="items-center justify-center justify-items-center gap-3 text-center">
                      {item.logo ? (
                        <span className="mx-auto flex size-12 items-center justify-center rounded-lg bg-white p-1.5 sm:size-14">
                          <Image
                            src={item.logo.src}
                            alt=""
                            width={item.logo.width}
                            height={item.logo.height}
                            className="h-full w-full object-contain"
                            sizes="56px"
                            unoptimized
                          />
                        </span>
                      ) : null}
                      <CardTitle className="text-sm font-semibold text-balance sm:text-base">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </RevealListItem>
              ))}
            </RevealList>
            <RevealGroup>
              <RevealItem>
                <Button
                  className="h-auto justify-start px-0 text-base text-muted-foreground hover:text-muted-foreground"
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
