import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type SectionProps = ComponentProps<"section">;

export function Section({ className, ...props }: SectionProps) {
  return (
    <section
      className={cn("py-[var(--section-spacing)]", className)}
      {...props}
    />
  );
}
