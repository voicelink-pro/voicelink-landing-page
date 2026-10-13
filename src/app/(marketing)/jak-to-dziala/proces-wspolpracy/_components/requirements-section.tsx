import { Container } from "@/components/layout/container";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { processContent } from "../_content/process";
import { ProcessIcon } from "./process-icon";

const { eyebrow, heading, items } = processContent.requirements;

const requirementItems = [
  { ...items[0], icon: "/informacja.webp" },
  { ...items[1], icon: "/kontrola.webp" },
  { ...items[2], icon: "/przekierowanie.webp" },
] as const;

export function RequirementsSection() {
  return (
    <Section
      id="wymagania"
      aria-labelledby="requirements-heading"
      className="scroll-mt-[var(--site-header-height)] bg-background"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="requirements-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealList className="mt-10 grid gap-4 lg:grid-cols-3">
          {requirementItems.map((item) => (
            <RevealListItem key={item.title} className="h-full">
              <Card className="h-full bg-white shadow-none ring-foreground/6 [--card-spacing:--spacing(5)]">
                <CardHeader className="gap-3">
                  <ProcessIcon icon={item.icon} />
                  <CardTitle>
                    <h3 className="subsection-title text-lg sm:text-xl">
                      {item.title}
                    </h3>
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-pretty">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </RevealListItem>
          ))}
        </RevealList>
      </Container>
    </Section>
  );
}
