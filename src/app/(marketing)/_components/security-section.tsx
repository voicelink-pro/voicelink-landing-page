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

          <div className="relative overflow-hidden rounded-[1.125rem] border border-white/20 bg-[image:var(--security-background-image)] bg-cover bg-center p-3 sm:p-3.5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[#020b24]/50"
            />
            <RevealList className="relative grid gap-2" delay={0.04}>
              {securityItems.map((item) => (
                <RevealListItem key={item.title}>
                  <Card className="border-0 bg-transparent text-white shadow-none [--card-spacing:--spacing(3.5)]">
                    <CardHeader className="flex flex-row items-start gap-3.5">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/25">
                        <Image
                          src={item.icon}
                          alt=""
                          width={20}
                          height={20}
                          className="size-5 object-contain brightness-0 invert"
                          sizes="20px"
                          unoptimized
                        />
                      </span>
                      <div className="flex min-w-0 flex-col gap-1.5">
                        <CardTitle className="text-base font-normal text-white">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="leading-6 text-pretty text-white">
                          {item.description}
                        </CardDescription>
                      </div>
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
