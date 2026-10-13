import Link from "next/link";
import { ArrowDownIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { centerContent } from "../_content/center";
import { CenterPanel } from "./center-panel";

const { eyebrow, heading, description, cta } = centerContent.hero;

export function CenterHeroSection() {
  return (
    <Section
      aria-labelledby="center-hero-heading"
      className="-mt-[calc(var(--site-header-height)-0.75rem)] border-0 bg-background px-3 pt-0 pb-3 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5"
      data-page-hero="compact"
    >
      <div className="relative overflow-hidden rounded-[clamp(1.15rem,1.6vw,1.6rem)] bg-[#071433] bg-[radial-gradient(ellipse_at_top,rgba(62,104,186,0.42),transparent_54%),linear-gradient(180deg,#0c2456_0%,#071433_46%,#040d22_100%)] pt-[calc(var(--site-header-height)-0.75rem)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_72%)] [background-size:4.75rem_4.75rem] opacity-30"
        />
        <Container className="relative z-10 pt-8 sm:pt-10 lg:pt-14">
          <RevealGroup
            className="flex max-w-4xl flex-col items-start gap-[clamp(0.875rem,2svh,1.5rem)]"
            delay={0.08}
            stagger={0.09}
            trigger="load"
          >
            <RevealItem>
              <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
                {eyebrow}
              </SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h1 id="center-hero-heading" className="display-title text-white">
                {heading}
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="section-lede max-w-3xl text-white">{description}</p>
            </RevealItem>
            <RevealItem>
              <Link
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 bg-black px-7 text-base text-white hover:bg-black/85",
                )}
                href={cta.href}
              >
                {cta.label}
                <ArrowDownIcon data-icon="inline-end" />
              </Link>
            </RevealItem>
          </RevealGroup>
        </Container>
        <div className="relative z-10 mx-auto mt-10 w-full max-w-[90rem] px-4 pb-5 sm:mt-12 sm:px-6 sm:pb-7 lg:mt-14 lg:px-8 lg:pb-8">
          <RevealGroup delay={0.16} trigger="load">
            <RevealItem>
              <CenterPanel />
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
