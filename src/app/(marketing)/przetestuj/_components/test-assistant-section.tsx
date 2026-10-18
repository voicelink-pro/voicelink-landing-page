import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";

import { TestAssistantBox } from "./test-assistant-box";

export function TestAssistantSection() {
  return (
    <Section
      aria-labelledby="test-assistant-heading"
      className="-mt-[var(--site-header-height)] border-0 bg-transparent p-0"
      data-contact-page=""
    >
      <div className="relative flex min-h-dvh flex-col bg-[image:var(--contact-background-image)] bg-cover bg-center pt-[var(--site-header-height)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#020b24]/45"
        />
        <Container className="relative z-10 flex flex-1 flex-col">
          <div className="my-auto flex w-full max-w-xl flex-col items-center py-8 sm:py-14 lg:mx-auto">
            <RevealGroup className="w-full" delay={0.1} trigger="load">
              <RevealItem>
                <TestAssistantBox />
              </RevealItem>
            </RevealGroup>
          </div>
        </Container>
        <div
          aria-hidden="true"
          className="relative z-10 h-44 bg-[linear-gradient(to_bottom,transparent_0%,rgb(6_32_89/0.18)_20%,rgb(6_32_89/0.45)_45%,rgb(6_32_89/0.75)_72%,#062059_100%)] sm:h-64"
        />
      </div>
    </Section>
  );
}
