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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { homeContent } from "../_content/home";

const { eyebrow, heading, description, items, more } = homeContent.security;

const securityItems = [
  { ...items[0], icon: "/rodo.webp" },
  { ...items[1], icon: "/szyfrowanie.webp" },
  { ...items[2], icon: "/kontrola.webp" },
  { ...items[3], icon: "/audyt.webp" },
] as const;

export function SecuritySection() {
  return (
    <Section
      id="bezpieczenstwo"
      aria-labelledby="security-heading"
      className="border-t border-border bg-background"
    >
      <Container>
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-20 xl:gap-32">
          <RevealGroup className="flex max-w-xl flex-col gap-4 lg:gap-5">
            <RevealItem>
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h2 id="security-heading" className="section-title">
                {heading}
              </h2>
            </RevealItem>
            {description.map((paragraph) => (
              <RevealItem key={paragraph}>
                <p className="section-lede">{paragraph}</p>
              </RevealItem>
            ))}
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

          <div className="relative overflow-hidden rounded-[1.125rem] border border-white/20 bg-[#020b24] p-2.5 sm:p-3">
            <Image
              src="/security-b.webp"
              alt=""
              fill
              className="pointer-events-none object-cover object-center"
              sizes="(min-width: 1024px) 36rem, calc(100vw - 2.5rem)"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[#020b24]/50"
            />
            <RevealList className="relative grid gap-1.5" delay={0.04}>
              {securityItems.map((item) => (
                <RevealListItem key={item.title}>
                  <Card className="border-0 bg-transparent text-white shadow-none [--card-spacing:--spacing(2.5)]">
                    <CardHeader className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3.5 gap-y-1 sm:gap-x-4">
                      <span className="col-start-1 row-start-1 flex size-10 shrink-0 items-center justify-center self-center rounded-lg bg-white/10 ring-1 ring-white/25">
                        <Image
                          src={item.icon}
                          alt=""
                          width={20}
                          height={20}
                          className="size-5 object-contain brightness-0 invert"
                          sizes="20px"
                        />
                      </span>
                      <CardTitle className="col-start-2 row-start-1 self-center text-lg font-normal text-white sm:text-xl">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="col-start-2 row-start-2 text-base leading-6 text-pretty text-white">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </RevealListItem>
              ))}
            </RevealList>
          </div>
        </div>
      </Container>
    </Section>
  );
}
