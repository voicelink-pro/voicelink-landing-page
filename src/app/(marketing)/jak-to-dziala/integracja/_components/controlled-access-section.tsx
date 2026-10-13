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

import { integrationContent } from "../_content/integration";
import { IntegrationIcon } from "./integration-icon";

const { eyebrow, heading, items } = integrationContent.access;

const accessItems = [
  { ...items[0], icon: "/szyfrowanie.webp" },
  { ...items[1], icon: "/kontrola.webp" },
  { ...items[2], icon: "/cofniecie-dostepu.webp" },
] as const;

export function ControlledAccessSection() {
  return (
    <Section
      aria-labelledby="controlled-access-heading"
      className="bg-background"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="controlled-access-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealList className="mt-10 grid gap-4 lg:grid-cols-3">
          {accessItems.map((item) => (
            <RevealListItem key={item.title} className="h-full">
              <Card className="h-full bg-white shadow-none ring-foreground/6 [--card-spacing:--spacing(5)]">
                <CardHeader className="gap-3">
                  <IntegrationIcon icon={item.icon} />
                  <CardTitle>
                    <h3 className="subsection-title text-lg">{item.title}</h3>
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
