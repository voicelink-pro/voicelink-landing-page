import type { ReactNode } from "react";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type SectionEyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 text-xs font-medium tracking-[-0.01em] text-eyebrow",
        className,
      )}
    >
      <Image
        src={siteConfig.eyebrowIcon.src}
        alt=""
        width={siteConfig.eyebrowIcon.width}
        height={siteConfig.eyebrowIcon.height}
        className="h-3.5 w-auto"
        sizes="20px"
        unoptimized
      />
      <span>{children}</span>
    </p>
  );
}
