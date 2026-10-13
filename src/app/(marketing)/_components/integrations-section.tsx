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
  "h-full min-h-[7.5rem] justify-center motion-safe:transition-[translate,box-shadow] motion-safe:duration-300 motion-safe:ease-out motion-safe:will-change-[translate] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_14px_28px_-16px_rgba(15,55,132,0.32)]",
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
    logo: { src: "/wlasny.webp", width: 1254, height: 1254 },
  },
] as const;

export function IntegrationsSection() {
  return (
    <Section
      id="integracje"
      aria-labelledby="integrations-heading"
      className="relative isolate overflow-hidden border-t border-border bg-[image:var(--integrations-background-image)] bg-cover bg-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#020b24]/40"
      />
      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-x-16">
          <RevealGroup className="flex max-w-xl flex-col gap-4 lg:gap-5">
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
                      <CardTitle className="subsection-title text-2xl sm:text-3xl">
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
                  <Card className={systemTileClassName} size="sm">
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
