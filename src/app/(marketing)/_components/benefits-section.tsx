import type { CSSProperties } from "react";
import Image from "next/image";
import { CheckIcon, XIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { siteConfig } from "@/config/site";

import { homeContent } from "../_content/home";

const {
  eyebrow,
  heading,
  description,
  columns,
  areaHeading,
  beforeHeading,
  afterHeading,
  items,
} = homeContent.benefits;

const benefitIcons = [
  "/wiele.webp",
  "/informacja.webp",
  "/powiadomienia.webp",
  "/przekierowanie.webp",
  "/kalendarz.webp",
] as const;

const rows = items.map((item, index) => ({
  area: item.area,
  before: item.title,
  after: item.afterTitle,
  icon: benefitIcons[index],
}));

function AreaIcon({ icon }: { icon: string }) {
  const mask = {
    maskImage: `url("${icon}")`,
    WebkitMaskImage: `url("${icon}")`,
    maskRepeat: "no-repeat",
    maskPosition: "center",
    maskSize: "contain",
  } satisfies CSSProperties;

  return (
    <span
      aria-hidden="true"
      className="block size-5 shrink-0 bg-primary lg:size-6"
      style={mask}
    />
  );
}

export function BenefitsSection() {
  return (
    <Section
      id="korzysci"
      aria-labelledby="benefits-heading"
      className="border-t border-border bg-muted"
    >
      <Container>
        <RevealGroup className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <RevealItem>
            <SectionEyebrow className="justify-center">
              {eyebrow}
            </SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="benefits-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="section-lede max-w-xl">{description}</p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-10 lg:mt-14" delay={0.06}>
          <RevealItem>
            <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-foreground/8">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Porównanie obsługi telefonicznej w placówce przed wdrożeniem i
                  z VoiceLink
                </caption>
                <thead className="hidden md:table-header-group">
                  <tr>
                    <th
                      scope="col"
                      className="w-[27%] border-b border-border px-6 py-6 align-top lg:px-8 lg:py-7"
                    >
                      <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                        {columns.area}
                      </span>
                      <span className="mt-2.5 block text-base leading-snug font-medium tracking-[-0.02em] text-pretty text-foreground lg:text-lg">
                        {areaHeading}
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="w-[34%] border-b border-l border-border bg-benefit-before/[0.04] px-6 py-6 align-top lg:px-8 lg:py-7"
                    >
                      <span className="inline-flex items-center rounded-full bg-benefit-before/10 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-benefit-before uppercase">
                        {columns.before}
                      </span>
                      <span className="mt-2.5 block text-base leading-snug font-medium tracking-[-0.02em] text-pretty text-foreground/85 lg:text-lg">
                        {beforeHeading}
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="w-[39%] border-b border-white/15 bg-primary px-6 py-6 align-top lg:px-8 lg:py-7"
                    >
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-white uppercase ring-1 ring-white/25">
                        <Image
                          src={siteConfig.eyebrowIcon.src}
                          alt=""
                          width={16}
                          height={10}
                          className="h-2.5 w-4 shrink-0 object-contain brightness-0 invert"
                          sizes="16px"
                        />
                        {columns.after}
                      </span>
                      <span className="mt-2.5 block text-base leading-snug font-medium tracking-[-0.02em] text-pretty text-white lg:text-lg">
                        {afterHeading}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border md:divide-y-0">
                  {rows.map((row, index) => {
                    const isLast = index === rows.length - 1;

                    return (
                      <tr
                        key={row.area}
                        className="flex flex-col gap-3 p-5 md:table-row md:p-0"
                      >
                        <th
                          scope="row"
                          className={`text-left md:w-[27%] md:px-6 md:py-6 md:align-middle lg:px-8 lg:py-7 ${
                            isLast ? "" : "md:border-b md:border-border"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary lg:size-11">
                              <AreaIcon icon={row.icon} />
                            </span>
                            <span className="text-base leading-snug font-medium tracking-[-0.02em] text-foreground lg:text-[1.0625rem]">
                              {row.area}
                            </span>
                          </div>
                        </th>
                        <td
                          className={`rounded-2xl bg-benefit-before/[0.04] p-4 ring-1 ring-benefit-before/12 md:w-[34%] md:rounded-none md:border-l md:border-border md:px-6 md:py-6 md:align-middle md:ring-0 lg:px-8 lg:py-7 ${
                            isLast ? "" : "md:border-b md:border-border"
                          }`}
                        >
                          <span className="mb-1.5 block text-[0.6875rem] font-semibold tracking-[0.14em] text-benefit-before uppercase md:hidden">
                            {columns.before}
                          </span>
                          <div className="flex items-start gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-benefit-before/12 text-benefit-before"
                            >
                              <XIcon className="size-3.5 stroke-[2.5]" />
                            </span>
                            <p className="text-sm leading-6 text-pretty text-foreground/80 sm:text-base lg:text-[1.0625rem] lg:leading-7">
                              {row.before}
                            </p>
                          </div>
                        </td>
                        <td
                          className={`rounded-2xl bg-primary p-4 md:w-[39%] md:rounded-none md:px-6 md:py-6 md:align-middle lg:px-8 lg:py-7 ${
                            isLast ? "" : "md:border-b md:border-white/15"
                          }`}
                        >
                          <span className="mb-1.5 inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold tracking-[0.14em] text-white/90 uppercase md:hidden">
                            <Image
                              src={siteConfig.eyebrowIcon.src}
                              alt=""
                              width={14}
                              height={9}
                              className="h-2.5 w-3.5 shrink-0 object-contain brightness-0 invert"
                              sizes="14px"
                            />
                            {columns.after}
                          </span>
                          <div className="flex items-start gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-primary"
                            >
                              <CheckIcon className="size-3.5 stroke-[2.75]" />
                            </span>
                            <p className="text-sm leading-6 font-medium text-pretty text-white sm:text-base lg:text-[1.0625rem] lg:leading-7">
                              {row.after}
                            </p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
