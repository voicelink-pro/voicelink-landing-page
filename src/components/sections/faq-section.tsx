import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type FaqSectionProps = {
  eyebrow: string;
  heading: string;
  description: string;
  items: readonly FaqItem[];
};

export function FaqSection({
  eyebrow,
  heading,
  description,
  items,
}: FaqSectionProps) {
  return (
    <Section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-[var(--site-header-height)] border-t border-border bg-background"
    >
      <Container>
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-24 xl:gap-32">
          <RevealGroup className="flex max-w-md flex-col gap-3">
            <RevealItem>
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
            </RevealItem>
            <RevealItem>
              <h2 id="faq-heading" className="section-title">
                {heading}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="section-lede">{description}</p>
            </RevealItem>
          </RevealGroup>

          <Accordion className="gap-1.5" hiddenUntilFound>
            <RevealGroup className="flex flex-col gap-1.5" stagger={0.045}>
              {items.map((item) => (
                <RevealItem key={item.id}>
                  <AccordionItem
                    value={item.id}
                    className="overflow-hidden rounded-2xl border-0 bg-muted px-3.5 shadow-none sm:px-4"
                  >
                    <AccordionTrigger className="py-3.5 text-sm leading-6 font-normal tracking-[-0.02em] text-balance sm:py-4 sm:text-base">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pr-4 pb-2.5 text-sm leading-6 text-pretty text-muted-foreground sm:pr-6">
                      <p>{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </RevealItem>
              ))}
            </RevealGroup>
          </Accordion>
        </div>
      </Container>
    </Section>
  );
}
