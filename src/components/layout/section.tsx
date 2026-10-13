import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type SectionProps = ComponentProps<"section">;

export function Section({ className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "border-t border-border bg-background py-[var(--section-spacing)]",
        className,
      )}
      {...props}
    />
  );
}
