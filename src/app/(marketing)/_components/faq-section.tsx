import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { homeContent } from "../_content/home";
import { RevealGroup, RevealItem } from "./reveal-motion";

const { eyebrow, heading, description, items } = homeContent.faq;

export function FaqSection() {
  return (
    <Section
      id="faq"
      aria-labelledby="faq-heading"
      className="-mx-2 bg-[image:var(--faq-background-image)] py-[clamp(3.5rem,6vw,6rem)] sm:-mx-3 lg:-mx-4"
    >
      <Container className="max-w-[80rem]">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <RevealGroup className="flex max-w-md flex-col gap-3">
            <RevealItem>
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h2
                id="faq-heading"
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

          <RevealGroup>
            <RevealItem>
              <Accordion className="gap-1.5" hiddenUntilFound>
                {items.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="overflow-hidden rounded-lg border-0 bg-white px-3.5 shadow-none ring-1 ring-foreground/8"
                  >
                    <AccordionTrigger className="py-2.5 text-sm leading-5 font-medium text-balance">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pr-6 pb-2.5 text-sm leading-6 text-pretty text-muted-foreground">
                      <p>{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
