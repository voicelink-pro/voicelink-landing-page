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
      className="border-t border-foreground/6 bg-background py-[clamp(3.5rem,6vw,6rem)]"
    >
      <Container className="max-w-[80rem]">
        <RevealGroup className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <RevealItem>
            <SectionEyebrow className="justify-center">
              {eyebrow}
            </SectionEyebrow>
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
            <p className="max-w-xl text-sm leading-6 text-pretty text-muted-foreground sm:text-base sm:leading-7">
              {description}
            </p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mx-auto mt-10 max-w-3xl sm:mt-12">
          <RevealItem>
            <Card className="bg-white py-5 shadow-none ring-foreground/8 sm:py-6">
              <CardContent className="px-4 sm:px-6">
                <ContactForm />
              </CardContent>
            </Card>
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
