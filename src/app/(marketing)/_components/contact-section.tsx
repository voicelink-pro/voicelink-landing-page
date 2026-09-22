import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { Card, CardContent } from "@/components/ui/card";

import { homeContent } from "../_content/home";
import { ContactForm } from "./contact-form";
import { RevealGroup, RevealItem } from "./reveal-motion";

const { eyebrow, heading, description } = homeContent.contact;

export function ContactSection() {
  return (
    <Section
      id="kontakt"
      aria-labelledby="contact-heading"
      className="relative isolate -mx-2 -mt-16 bg-[image:var(--contact-background-image)] pt-[calc(clamp(3.5rem,6vw,6rem)+4rem)] pb-[clamp(3.5rem,6vw,6rem)] sm:-mx-3 lg:-mx-4"
    >
      <Container className="max-w-[80rem]">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.28fr)_minmax(0,0.72fr)] lg:gap-16">
          <RevealGroup className="flex max-w-md flex-col gap-3 lg:order-2 lg:justify-self-end">
            <RevealItem>
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h2
                id="contact-heading"
                className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
              >
                {heading}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="text-sm leading-6 text-pretty text-muted-foreground sm:text-base sm:leading-7">
                {description}
              </p>
            </RevealItem>
          </RevealGroup>

          <RevealGroup className="lg:order-1">
            <RevealItem>
              <Card className="bg-white py-5 shadow-md shadow-eyebrow/10 ring-foreground/8 sm:py-6">
                <CardContent className="px-4 sm:px-6">
                  <ContactForm />
                </CardContent>
              </Card>
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
