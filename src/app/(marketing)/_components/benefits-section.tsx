import type { CSSProperties } from "react";

import { Container } from "@/components/layout/container";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { homeContent } from "../_content/home";

const {
  eyebrow,
  heading,
  description,
  beforeLabel,
  beforeHeading,
  afterLabel,
  afterHeading,
  items,
} = homeContent.benefits;

const benefitIcons = [
  "/wiele.webp",
  "/informacja.webp",
  "/powiadomienia.webp",
  "/przekierowanie.webp",
  "/kalendarz.webp",
] as const;

const rows = items.map((item, index) => ({
  before: item.title,
  after: item.afterTitle,
  icon: benefitIcons[index],
}));

export function BenefitsSection() {
  return (
    <Section
      id="korzysci"
      aria-labelledby="benefits-heading"
      className="border-t border-border bg-muted"
    >
      <Container>
        <RevealGroup className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <RevealItem>
            <SectionEyebrow className="justify-center">
              {eyebrow}
            </SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="benefits-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="section-lede max-w-xl">{description}</p>
          </RevealItem>
        </RevealGroup>

        <div className="mt-10 grid items-stretch gap-4 lg:mt-14 lg:grid-cols-2 lg:gap-5">
          <ComparisonBox
            items={rows.map((row) => ({
              title: row.before,
              icon: row.icon,
            }))}
            label={beforeLabel}
            title={beforeHeading}
            tone="before"
          />
          <ComparisonBox
            items={rows.map((row) => ({ title: row.after, icon: row.icon }))}
            label={afterLabel}
            title={afterHeading}
            tone="after"
          />
        </div>
      </Container>
    </Section>
  );
}

function ComparisonBox({
  items,
  label,
  title,
  tone,
}: {
  items: { title: string; icon: string }[];
  label: string;
  title: string;
  tone: "before" | "after";
}) {
  const isAfter = tone === "after";
  const [featured, ...rest] = items;

  if (!featured) {
    return null;
  }

  return (
    <RevealGroup className="h-full">
      <RevealItem className="h-full">
        <Card className="h-full bg-white shadow-none [--card-spacing:--spacing(7)]">
          <CardHeader className="gap-6">
            <div className="flex flex-col gap-3">
              <p
                className={cn(
                  "text-xs font-medium tracking-[0.14em] uppercase",
                  isAfter ? "text-primary" : "text-benefit-before",
                )}
              >
                {label}
              </p>
              <p className="min-h-[2.3em] text-[1.65rem] leading-[1.15] font-medium tracking-[-0.03em] text-pretty text-foreground sm:text-[1.85rem]">
                {title}
              </p>
            </div>
            <div className="rounded-2xl bg-[#ededed] p-4">
              <div className="flex min-h-20 items-center gap-3 rounded-xl bg-white px-4 py-4 ring-1 ring-foreground/8">
                <BenefitIcon icon={featured.icon} tone={tone} />
                <p className="text-sm leading-6 font-medium text-pretty text-foreground sm:text-base">
                  {featured.title}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RevealList className="flex flex-col">
              {rest.map((item) => (
                <RevealListItem
                  key={item.title}
                  className="flex items-center gap-2.5 border-t border-border py-3.5 first:border-t-0 first:pt-1"
                >
                  <BenefitIcon icon={item.icon} size="sm" tone={tone} />
                  <p className="text-sm leading-5 font-medium text-pretty text-foreground">
                    {item.title}
                  </p>
                </RevealListItem>
              ))}
            </RevealList>
          </CardContent>
        </Card>
      </RevealItem>
    </RevealGroup>
  );
}

function BenefitIcon({
  icon,
  size = "md",
  tone,
}: {
  icon: string;
  size?: "sm" | "md";
  tone: "before" | "after";
}) {
  const mask = {
    maskImage: `url("${icon}")`,
    WebkitMaskImage: `url("${icon}")`,
    maskRepeat: "no-repeat",
    maskPosition: "center",
    maskSize: "contain",
  } satisfies CSSProperties;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full text-white",
        size === "sm" ? "size-8" : "size-10",
        tone === "after" ? "bg-primary" : "bg-benefit-before",
      )}
    >
      <span
        className={cn("block bg-current", size === "sm" ? "size-5" : "size-6")}
        style={mask}
      />
    </span>
  );
}
