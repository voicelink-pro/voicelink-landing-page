import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
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

const { eyebrow, heading, description, items } = homeContent.security;

const securityItems = [
  { ...items[0], icon: "/rodo.png" },
  { ...items[1], icon: "/szyfrowanie.png" },
  { ...items[2], icon: "/kontrola.png" },
  { ...items[3], icon: "/audyt.png" },
] as const;

export function SecuritySection() {
  return (
    <Section
      id="bezpieczenstwo"
      aria-labelledby="security-heading"
      className="border-t border-foreground/6 bg-background py-[clamp(3.5rem,6vw,6rem)]"
    >
      <Container className="max-w-[80rem]">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
          <RevealGroup className="flex max-w-xl flex-col gap-4 lg:gap-5">
            <RevealItem>
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h2
                id="security-heading"
                className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
              >
                {heading}
              </h2>
            </RevealItem>
            {description.map((paragraph) => (
              <RevealItem key={paragraph}>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  {paragraph}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup>
            <RevealItem className="overflow-hidden rounded-2xl bg-[image:var(--security-background-image)] bg-cover bg-center p-3 ring-1 ring-foreground/8 sm:p-4 lg:p-5">
              <RevealList className="grid gap-3 sm:gap-4" delay={0.04}>
                {securityItems.map((item) => (
                  <RevealListItem key={item.title}>
                    <Card className="glass-surface bg-transparent ring-white/40">
                      <CardHeader className="flex flex-row items-start gap-4">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/40 ring-1 ring-white/60 backdrop-blur-xl">
                          <Image
                            src={item.icon}
                            alt=""
                            width={40}
                            height={40}
                            className="size-10 object-contain"
                            sizes="40px"
                            unoptimized
                          />
                        </span>
                        <div className="flex min-w-0 flex-col gap-2">
                          <CardTitle className="text-base font-semibold sm:text-lg">
                            {item.title}
                          </CardTitle>
                          <CardDescription className="leading-6 text-pretty sm:leading-7">
                            {item.description}
                          </CardDescription>
                        </div>
                      </CardHeader>
                    </Card>
                  </RevealListItem>
                ))}
              </RevealList>
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
