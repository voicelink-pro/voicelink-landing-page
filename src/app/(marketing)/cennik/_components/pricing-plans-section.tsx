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

import { pricingContent } from "../_content/pricing";

const { id, eyebrow, heading, note, savingsCta, items } = pricingContent.plans;

type PlanPriceData = (typeof items)[number]["price"];

function PlanPrice({ price }: { price: PlanPriceData }) {
  if (price.kind === "amount") {
    return (
      <p className="flex flex-col gap-1 border-t border-border pt-6">
        <span className="text-sm leading-6 text-muted-foreground">
          {price.prefix}
        </span>
        <span className="subsection-title text-3xl tracking-[-0.05em] text-foreground sm:text-4xl lg:text-5xl">
          {price.value}
        </span>
        <span className="text-sm leading-6 text-muted-foreground">
          {price.suffix}
        </span>
      </p>
    );
  }

  return (
    <p className="subsection-title flex items-center border-t border-border pt-6 text-lg leading-snug text-foreground sm:text-xl">
      {price.value}
    </p>
  );
}

export function PricingPlansSection() {
  return (
    <Section
      id={id}
      aria-labelledby="pricing-plans-heading"
      className="scroll-mt-[var(--site-header-height)] bg-muted"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="pricing-plans-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealList
          as="ol"
          className="mt-10 grid gap-4 lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr]"
        >
          {items.map((item, index) => (
            <RevealListItem
              key={item.title}
              className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-5 ring-foreground/6 sm:gap-6 sm:rounded-3xl sm:p-7 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:p-8"
            >
              <div className="flex flex-col gap-3">
                <span
                  aria-hidden="true"
                  className="text-xs font-semibold tracking-[0.16em] text-eyebrow tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="subsection-title text-xl sm:text-2xl">
                  {item.title}
                </h3>
              </div>
              <PlanPrice price={item.price} />
              <p className="text-base leading-7 text-pretty text-muted-foreground">
                {item.description}
              </p>
            </RevealListItem>
          ))}
        </RevealList>

        <RevealGroup className="mt-6">
          <RevealItem>
            <p className="text-sm leading-6 text-muted-foreground">{note}</p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-12 sm:mt-16">
          <RevealItem>
            <Link
              className="group/savings section-title inline-block max-w-4xl cursor-pointer text-left text-primary"
              href={savingsCta.href}
            >
              <span className="underline decoration-transparent decoration-[0.06em] underline-offset-[0.16em] transition-colors duration-200 group-hover/savings:decoration-primary group-focus-visible/savings:decoration-primary">
                {savingsCta.label}
              </span>
              <ArrowRightIcon
                aria-hidden="true"
                className="ml-3 inline-block size-[0.78em] align-[-0.08em] motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/savings:translate-x-1"
              />
            </Link>
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
