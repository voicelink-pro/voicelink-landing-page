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

        <div className="mt-10 flex flex-col gap-3 sm:gap-4">
          <RevealGroup>
            <RevealItem>
              <Card className={cn(glassCardClassName, "justify-center")}>
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
                    <CardTitle>
                      <h3 className="subsection-title text-2xl sm:text-3xl">
                        {featured.title}
                      </h3>
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

          <RevealList className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
            {systemCards.map((item) => (
              <RevealListItem key={item.title} className="h-full">
                <Card className={systemTileClassName} size="sm">
                  <CardHeader className="items-center justify-center justify-items-center gap-3 text-center">
                    <span className="mx-auto flex size-14 items-center justify-center rounded-xl bg-muted p-2 sm:size-16">
                      <Image
                        src={item.logo.src}
                        alt=""
                        width={item.logo.width}
                        height={item.logo.height}
                        className="size-10 object-contain sm:size-12"
                        sizes="64px"
                        unoptimized
                      />
                    </span>
                    <CardTitle>
                      <h3 className="text-sm font-semibold text-balance sm:text-base">
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
                className="editorial-panel flex scroll-mt-[var(--site-header-height)] flex-col items-start gap-5 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
              >
                <div className="flex max-w-2xl flex-col gap-2">
                  <h3 className="subsection-title text-xl sm:text-2xl">
                    {missing.heading}
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground">
                    {missing.description}
                  </p>
                </div>
                <Link
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 shrink-0 px-6 text-base",
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
