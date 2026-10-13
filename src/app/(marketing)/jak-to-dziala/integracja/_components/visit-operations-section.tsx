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
import { cn } from "@/lib/utils";

import { integrationContent } from "../_content/integration";
import { IntegrationIcon } from "./integration-icon";

const { eyebrow, heading, items } = integrationContent.operations;

const operationItems = [
  { ...items[0], icon: "/triaz.webp" },
  { ...items[1], icon: "/kalendarz.webp" },
  { ...items[2], icon: "/informacja.webp" },
  { ...items[3], icon: "/zmiana-terminu.webp" },
  { ...items[4], icon: "/anulowanie-wizyty.webp" },
] as const;

export function VisitOperationsSection() {
  return (
    <Section
      aria-labelledby="visit-operations-heading"
      className="bg-background"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="visit-operations-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealList className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          {operationItems.map((item, index) => (
            <RevealListItem
              key={item.title}
              className={cn(
                "h-full",
                index < 3 ? "xl:col-span-2" : "xl:col-span-3",
                index === operationItems.length - 1 && "sm:col-span-2",
              )}
            >
              <Card className="h-full bg-white shadow-none ring-foreground/6 [--card-spacing:--spacing(5)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out">
                <CardHeader className="gap-3">
                  <div className="flex items-center justify-between gap-4">
                    <IntegrationIcon icon={item.icon} />
                    <span
                      aria-hidden="true"
                      className="text-xs font-semibold tracking-[0.16em] text-eyebrow tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
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
