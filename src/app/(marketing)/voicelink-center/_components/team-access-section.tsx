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
import { cn } from "@/lib/utils";

import { centerContent } from "../_content/center";

const { id, eyebrow, heading, paragraphs, roles, link } = centerContent.access;

export function TeamAccessSection() {
  return (
    <Section
      id={id}
      aria-labelledby="center-access-heading"
      className="scroll-mt-[var(--site-header-height)] bg-background"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <RevealGroup className="flex max-w-xl flex-col gap-4">
            <RevealItem>
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h2 id="center-access-heading" className="section-title">
                {heading}
              </h2>
            </RevealItem>
            {paragraphs.map((paragraph) => (
              <RevealItem key={paragraph}>
                <p className="section-lede">{paragraph}</p>
              </RevealItem>
            ))}
            <RevealItem>
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto justify-start px-0 text-base",
                )}
                href={link.href}
              >
                {link.label}
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </RevealItem>
          </RevealGroup>

          <RevealList className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {roles.map((role) => (
              <RevealListItem key={role.title}>
                <article className="flex h-full flex-col gap-2 rounded-3xl bg-muted px-5 py-5 sm:px-6">
                  <h3 className="subsection-title text-lg sm:text-xl">
                    {role.title}
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground">
                    {role.description}
                  </p>
                </article>
              </RevealListItem>
            ))}
          </RevealList>
        </div>
      </Container>
    </Section>
  );
}
