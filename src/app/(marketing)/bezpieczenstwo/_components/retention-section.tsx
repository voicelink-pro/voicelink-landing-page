import { Container } from "@/components/layout/container";
import {
  RevealGroup,
  RevealItem,
  RevealTableBody,
  RevealTableRow,
} from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";

import { securityContent } from "../_content/security";

const { id, eyebrow, heading, columns, rows, paragraphs } =
  securityContent.retention;

export function RetentionSection() {
  return (
    <Section
      id={id}
      aria-labelledby="retention-heading"
      className="scroll-mt-[var(--site-header-height)] bg-background"
    >
      <Container>
        <RevealGroup className="flex max-w-3xl flex-col gap-4">
          <RevealItem>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="retention-heading" className="section-title">
              {heading}
            </h2>
          </RevealItem>
        </RevealGroup>

        <div className="mt-10 overflow-hidden rounded-[1.125rem] bg-white ring-1 ring-foreground/8">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Zasady przechowywania danych w VoiceLink Center
            </caption>
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-border">
                <th
                  scope="col"
                  className="w-[42%] px-6 py-4 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
                >
                  {columns.kind}
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
                >
                  {columns.rule}
                </th>
              </tr>
            </thead>
            <RevealTableBody className="divide-y divide-border">
              {rows.map((row) => (
                <RevealTableRow
                  key={row.kind}
                  className="flex w-full flex-col gap-2 px-5 py-5 md:table-row md:px-0 md:py-0"
                >
                  <th
                    scope="row"
                    className="text-left text-base font-medium md:w-[42%] md:px-6 md:py-6 md:align-top"
                  >
                    {row.kind}
                  </th>
                  <td className="text-base leading-7 text-pretty text-muted-foreground md:px-6 md:py-6 md:align-top">
                    {row.rule}
                  </td>
                </RevealTableRow>
              ))}
            </RevealTableBody>
          </table>
        </div>

        <RevealGroup className="mt-8 flex max-w-3xl flex-col gap-4">
          {paragraphs.map((paragraph) => (
            <RevealItem key={paragraph}>
              <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                {paragraph}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
