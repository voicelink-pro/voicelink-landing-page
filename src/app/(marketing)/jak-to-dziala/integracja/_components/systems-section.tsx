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

import { integrationContent } from "../_content/integration";

const { eyebrow, heading, description, featured, items, missing } =
  integrationContent.systems;

const glassCardClassName = "h-full bg-white shadow-none";

const systemTileClassName = cn(
  glassCardClassName,
  "justify-center motion-safe:transition-[translate,box-shadow] motion-safe:duration-300 motion-safe:ease-out motion-safe:will-change-[translate] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_14px_28px_-16px_rgba(15,55,132,0.32)]",
);

const featuredLogo = {
  src: "/logo-osoz.png",
  width: 886,
  height: 260,
} as const;

const systemCards = [
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

export function SystemsSection() {
  return (
    <Section
      id="systemy"
      aria-labelledby="systems-heading"
      className="relative isolate scroll-mt-[var(--site-header-height)] overflow-hidden bg-muted"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="systems-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="section-lede max-w-2xl">{description}</p>
          </RevealItem>
        </RevealGroup>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:gap-4">
          <RevealGroup>
            <RevealItem>
              <Card className={cn(glassCardClassName, "justify-center")}>
                <CardHeader className="gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <span className="flex h-12 w-36 shrink-0 items-center justify-center rounded-xl bg-white px-2 sm:h-[4.25rem] sm:w-48 sm:px-3">
                    <Image
                      src={featuredLogo.src}
                      alt=""
                      width={featuredLogo.width}
                      height={featuredLogo.height}
                      className="h-8 w-auto object-contain sm:h-10"
                      sizes="192px"
                      unoptimized
                    />
                  </span>
                  <div className="flex min-w-0 flex-col gap-2.5 sm:gap-3">
                    <CardTitle>
                      <h3 className="subsection-title text-xl sm:text-2xl lg:text-3xl">
                        {featured.title}
                      </h3>
                    </CardTitle>
                    <ul className="flex flex-wrap gap-1.5 sm:gap-2">
                      {featured.systems.map((system) => (
                        <li key={system}>
                          <span className="inline-flex rounded-lg bg-foreground/4 px-2.5 py-1 text-xs text-muted-foreground sm:px-3 sm:py-1.5 sm:text-sm">
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

          <RevealList className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3.5 lg:grid-cols-5 lg:gap-4">
            {systemCards.map((item) => (
              <RevealListItem
                key={item.title}
                className="h-full max-sm:last:col-span-2"
              >
                <Card className={systemTileClassName} size="sm">
                  <CardHeader className="items-center justify-center justify-items-center gap-2.5 px-3 text-center">
                    <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-muted p-1.5 sm:size-14 sm:p-2">
                      <Image
                        src={item.logo.src}
                        alt=""
                        width={item.logo.width}
                        height={item.logo.height}
                        className="size-8 object-contain sm:size-10"
                        sizes="56px"
                        unoptimized
                      />
                    </span>
                    <CardTitle>
                      <h3 className="text-xs font-semibold text-balance sm:text-sm lg:text-base">
                        {item.title}
                      </h3>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </RevealListItem>
            ))}
          </RevealList>

          <RevealGroup>
            <RevealItem>
              <div
                id="brak-systemu"
                className="editorial-panel flex scroll-mt-[var(--site-header-height)] flex-col items-start gap-4 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:p-8"
              >
                <div className="flex max-w-2xl flex-col gap-2">
                  <h3 className="subsection-title text-xl sm:text-2xl">
                    {missing.heading}
                  </h3>
                  <p className="text-sm leading-6 text-pretty text-muted-foreground sm:text-base sm:leading-7">
                    {missing.description}
                  </p>
                </div>
                <Link
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 w-full shrink-0 px-6 text-base sm:w-auto",
                  )}
                  href={missing.cta.href}
                >
                  {missing.cta.label}
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
