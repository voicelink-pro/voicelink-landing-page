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

const { eyebrow, heading, items } = homeContent.faq;

export function FaqSection() {
  return (
    <Section
      id="faq"
      aria-labelledby="faq-heading"
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
              id="faq-heading"
              className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              {heading}
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealGroup>
          <RevealItem>
            <Accordion
              className="mx-auto mt-10 max-w-3xl gap-2 sm:mt-12"
              defaultValue={[items[0].id]}
              hiddenUntilFound
            >
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="overflow-hidden rounded-xl border-0 bg-white px-4 shadow-none ring-1 ring-foreground/8 sm:px-5"
                >
                  <AccordionTrigger className="py-3.5 text-sm leading-6 font-medium text-balance">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pr-6 pb-3.5 text-sm leading-6 text-pretty text-muted-foreground sm:pr-8">
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
