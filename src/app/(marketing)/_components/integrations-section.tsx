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
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { homeContent } from "../_content/home";

const { eyebrow, heading, description, featured, items, more } =
  homeContent.integrations;

const glassCardClassName = "overflow-visible bg-white shadow-none";

const systemTileClassName = cn(
  glassCardClassName,
  "h-full min-h-[6.25rem] justify-center motion-safe:transition-[translate,box-shadow] motion-safe:duration-300 motion-safe:ease-out motion-safe:will-change-[translate] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_14px_28px_-16px_rgba(15,55,132,0.32)] sm:min-h-[7rem]",
);

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
    logo: { src: "/wlasny.webp", width: 192, height: 192 },
  },
] as const;

export function IntegrationsSection() {
  return (
    <Section
      id="integracje"
      aria-labelledby="integrations-heading"
      className="relative isolate overflow-hidden border-t border-border bg-[#020b24]"
    >
      <Image
        src="/background-3.webp"
        alt=""
        fill
        className="pointer-events-none object-cover object-center"
        sizes="100vw"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#020b24]/40"
      />
      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:grid-rows-[auto_auto_auto] lg:gap-x-16 lg:gap-y-5">
          <RevealGroup className="flex max-w-xl flex-col gap-4 lg:col-start-1 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:gap-5">
            <RevealItem>
              <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
                {eyebrow}
              </SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h2
                id="integrations-heading"
                className="section-title text-white"
              >
                {heading}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="section-lede text-[#d5d5d5]">{description}</p>
            </RevealItem>
          </RevealGroup>

          <div className="flex flex-col gap-3 sm:gap-4 lg:col-start-2 lg:row-span-2 lg:row-start-2">
            <RevealGroup>
              <RevealItem>
                <Card
                  className={cn(
                    glassCardClassName,
                    "justify-center lg:-mt-[calc(var(--card-spacing)+1px)]",
                  )}
                >
                  <CardHeader className="grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-2.5 sm:gap-x-6 sm:gap-y-3">
                    <CardTitle className="subsection-title col-start-1 row-start-1 self-start text-xl sm:text-2xl lg:text-3xl">
                      {featured.title}
                    </CardTitle>
                    <span className="col-start-2 row-span-2 row-start-1 flex shrink-0 items-center justify-end self-center">
                      <Image
                        src={featuredLogo.src}
                        alt=""
                        width={featuredLogo.width}
                        height={featuredLogo.height}
                        className="h-8 w-auto object-contain sm:h-10"
                        sizes="192px"
                      />
                    </span>
                    <ul className="col-start-1 row-start-2 flex flex-wrap gap-1.5 sm:gap-2">
                      {featured.systems.map((system) => (
                        <li key={system}>
                          <span className="inline-flex rounded-lg bg-foreground/4 px-2.5 py-1 text-xs text-muted-foreground sm:px-3 sm:py-1.5 sm:text-sm">
                            {system}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardHeader>
                </Card>
              </RevealItem>
            </RevealGroup>

            <RevealList className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5 xl:gap-3.5">
              {integrationCards.map((item) => (
                <RevealListItem
                  key={item.title}
                  className="h-full max-sm:last:col-span-2"
                >
                  <Card className={systemTileClassName} size="sm">
                    <CardHeader className="items-center justify-center justify-items-center gap-2.5 px-3 text-center">
                      {item.logo ? (
                        <span className="mx-auto flex size-10 items-center justify-center rounded-lg bg-white p-1 sm:size-12">
                          <Image
                            src={item.logo.src}
                            alt=""
                            width={item.logo.width}
                            height={item.logo.height}
                            className="h-full w-full object-contain"
                            sizes="48px"
                          />
                        </span>
                      ) : null}
                      <CardTitle className="text-xs font-semibold text-balance sm:text-sm">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </RevealListItem>
              ))}
            </RevealList>
            <RevealGroup>
              <RevealItem>
                <Link
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "h-auto justify-start px-0 text-base text-white hover:text-white",
                  )}
                  href={more.href}
                >
                  {more.label}
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Section>
  );
}
