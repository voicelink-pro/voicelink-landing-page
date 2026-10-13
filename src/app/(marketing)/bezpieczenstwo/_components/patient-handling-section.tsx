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

import { securityContent } from "../_content/security";
import { SecurityIcon } from "./security-icon";

const { id, eyebrow, heading, paragraphs, items } = securityContent.handling;

const handlingItems = [
  { ...items[0], icon: "/baza-danych.webp" },
  { ...items[1], icon: "/wtyczka-ethernet.webp" },
  { ...items[2], icon: "/weryfikacja.webp" },
] as const;

export function PatientHandlingSection() {
  return (
    <Section
      id={id}
      aria-labelledby="patient-handling-heading"
      className="scroll-mt-[var(--site-header-height)] bg-background"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="patient-handling-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
          {paragraphs.map((paragraph) => (
            <RevealItem key={paragraph}>
              <p className="section-lede">{paragraph}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealList className="mt-10 grid gap-4 lg:grid-cols-3">
          {handlingItems.map((item) => (
            <RevealListItem key={item.title} className="h-full">
              <Card className="h-full bg-white shadow-none ring-foreground/6 [--card-spacing:--spacing(5)]">
                <CardHeader className="gap-3">
                  <SecurityIcon icon={item.icon} />
                  <CardTitle>
                    <h3 className="subsection-title text-lg sm:text-xl">
                      {item.title}
                    </h3>
                  </CardTitle>
                  <CardDescription className="flex flex-col gap-3 text-base leading-7 text-pretty">
                    {item.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
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
