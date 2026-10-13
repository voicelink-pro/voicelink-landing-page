import { Container } from "@/components/layout/container";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";

import { securityContent } from "../_content/security";
import { SecurityIcon } from "./security-icon";

const { id, eyebrow, heading, items } = securityContent.protection;

const protectionItems = [
  { ...items[0], icon: "/szyfrowanie.webp" },
  { ...items[1], icon: "/rodo.webp" },
  { ...items[2], icon: "/nagranie-rozmowy.webp" },
] as const;

export function ConversationProtectionSection() {
  return (
    <Section
      id={id}
      aria-labelledby="conversation-protection-heading"
      className="scroll-mt-[var(--site-header-height)] border-t-0 bg-[#062059]"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
              {eyebrow}
            </SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2
              id="conversation-protection-heading"
              className="section-title text-white"
            >
              {heading}
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealList
          as="ol"
          className="mt-10 flex flex-col divide-y divide-white/15"
        >
          {protectionItems.map((item, index) => (
            <RevealListItem
              key={item.title}
              className="grid items-start gap-5 py-8 first:pt-0 last:pb-0 sm:grid-cols-[4rem_minmax(0,0.78fr)_minmax(0,1.22fr)] sm:gap-8 lg:gap-12"
            >
              <SecurityIcon className="brightness-0 invert" icon={item.icon} />
              <div className="flex flex-col gap-2">
                <span
                  aria-hidden="true"
                  className="text-xs font-semibold tracking-[0.16em] text-white tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="subsection-title text-xl text-white sm:text-2xl">
                  {item.title}
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {item.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-7 text-pretty text-white sm:text-lg sm:leading-8"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </RevealListItem>
          ))}
        </RevealList>
      </Container>
    </Section>
  );
}
