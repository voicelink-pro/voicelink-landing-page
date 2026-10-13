import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";

import { contactContent } from "../_content/contact";
import { ContactForm } from "./contact-form";

const { heading, description } = contactContent;

export function ContactSection() {
  return (
    <Section
      aria-labelledby="contact-heading"
      className="-mt-[var(--site-header-height)] border-0 bg-transparent p-0"
      data-contact-page=""
    >
      <div className="relative flex min-h-dvh flex-col bg-[image:var(--contact-background-image)] bg-cover bg-center pt-[var(--site-header-height)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#020b24]/40"
        />
        <Container className="relative z-10 flex flex-1 flex-col">
          <div className="my-auto flex w-full max-w-2xl flex-col items-center gap-6 py-10 sm:gap-7 sm:py-14 lg:mx-auto">
            <RevealGroup
              className="flex w-full flex-col items-center gap-4 text-center"
              delay={0.08}
              stagger={0.09}
              trigger="load"
            >
              <RevealItem>
                <h1 className="display-title text-white" id="contact-heading">
                  {heading}
                </h1>
              </RevealItem>
              <RevealItem>
                <p className="section-lede max-w-xl text-white">
                  {description}
                </p>
              </RevealItem>
            </RevealGroup>
            <RevealGroup className="w-full" delay={0.24} trigger="load">
              <RevealItem>
                <ContactForm />
              </RevealItem>
            </RevealGroup>
          </div>
        </Container>
        <div
          aria-hidden="true"
          className="relative z-10 h-72 bg-[linear-gradient(to_bottom,transparent_0%,rgb(6_32_89/0.16)_18%,rgb(6_32_89/0.4)_40%,rgb(6_32_89/0.68)_62%,rgb(6_32_89/0.88)_82%,#062059_100%)] sm:h-96"
        />
      </div>
    </Section>
  );
}
