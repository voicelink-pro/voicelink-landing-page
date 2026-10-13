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

import { functionsContent } from "../_content/functions";
import { FunctionIcon } from "./function-icon";

const { eyebrow, heading, items } = functionsContent.flow;

const steps = [
  { ...items[0], icon: "/pacjent-rozmowa.webp" },
  { ...items[1], icon: "/kalendarz.webp" },
  { ...items[2], icon: "/powiadomienia.webp" },
] as const;

export function ConversationFlowSection() {
  return (
    <Section
      aria-labelledby="conversation-flow-heading"
      className="bg-background"
    >
      <Container>
        <RevealGroup className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          <RevealItem>
            <SectionEyebrow className="justify-center">
              {eyebrow}
            </SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="conversation-flow-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealList
          as="ol"
          className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-5"
        >
          {steps.map((step, index) => (
            <RevealListItem key={step.title} className="h-full">
              <Card className="h-full bg-white shadow-none ring-foreground/6 [--card-spacing:--spacing(5)]">
                <CardHeader className="gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <FunctionIcon icon={step.icon} />
                    <span
                      aria-hidden="true"
                      className="text-sm font-semibold tracking-[0.16em] text-eyebrow tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <CardTitle>
                    <h3 className="subsection-title text-xl">{step.title}</h3>
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-pretty">
                    {step.description}
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
