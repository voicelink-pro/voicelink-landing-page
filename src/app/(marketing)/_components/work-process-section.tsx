import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { Button } from "@/components/ui/button";

import { homeContent } from "../_content/home";
import { RevealGroup, RevealItem } from "./reveal-motion";
import { WorkProcessPipeline } from "./work-process-pipeline";

const { eyebrow, heading, description, steps, cta } = homeContent.workProcess;

export function WorkProcessSection() {
  return (
    <Section
      id="jak-pracujemy"
      aria-labelledby="work-process-heading"
      className="relative isolate overflow-hidden border-t border-foreground/6 bg-[image:var(--benefits-background-image)] bg-cover bg-center py-[clamp(3.5rem,6vw,6rem)]"
    >
      <Container className="relative z-10 max-w-[80rem]">
        <RevealGroup className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          <RevealItem>
            <SectionEyebrow className="justify-center">
              {eyebrow}
            </SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2
              id="work-process-heading"
              className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              {heading}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="max-w-2xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
              {description}
            </p>
          </RevealItem>
        </RevealGroup>

        <div className="mx-auto mt-10 max-w-[72rem] sm:mt-12">
          <WorkProcessPipeline steps={steps} />
        </div>

        <RevealGroup className="mt-10 flex justify-center sm:mt-12">
          <RevealItem>
            <Button className="motion-safe:hover:-translate-y-1" type="button">
              {cta.label}
            </Button>
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
