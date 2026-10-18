import { Container } from "@/components/layout/container";
import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";

import { integrationContent } from "../_content/integration";
import { IntegrationIcon } from "./integration-icon";

const { eyebrow, heading, steps } = integrationContent.launch;

const launchSteps = [
  { ...steps[0], icon: "/placowka.webp" },
  { ...steps[1], icon: "/wtyczka-ethernet.webp" },
  { ...steps[2], icon: "/kontrola.webp" },
  { ...steps[3], icon: "/rakieta.webp" },
] as const;

export function LaunchSection() {
  return (
    <Section
      aria-labelledby="launch-heading"
      className="border-t-0 bg-[#062059]"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
              {eyebrow}
            </SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="launch-heading" className="section-title text-white">
              {heading}
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealList
          as="ol"
          className="mt-10 flex flex-col divide-y divide-white/15"
        >
          {launchSteps.map((step, index) => (
            <RevealListItem
              key={step.title}
              className="grid items-start gap-4 py-6 first:pt-0 last:pb-0 sm:py-8 md:grid-cols-[4rem_minmax(0,0.78fr)_minmax(0,1.22fr)] md:gap-8 lg:gap-12"
            >
              <IntegrationIcon
                className="brightness-0 invert"
                icon={step.icon}
              />
              <div className="flex flex-col gap-2">
                <span
                  aria-hidden="true"
                  className="text-xs font-semibold tracking-[0.16em] text-white tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="subsection-title text-xl text-white sm:text-2xl">
                  {step.title}
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {step.paragraphs.map((paragraph) => (
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
