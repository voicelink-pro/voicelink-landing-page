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
        "flex items-center gap-1 text-[0.6875rem] font-medium tracking-[0.18em] text-eyebrow uppercase",
        className,
      )}
    >
      <Image
        src={siteConfig.eyebrowIcon.src}
        alt=""
        width={siteConfig.eyebrowIcon.width}
        height={siteConfig.eyebrowIcon.height}
        className="-mr-1 h-4 w-auto"
        sizes="20px"
        unoptimized
      />
      <span>{children}</span>
    </p>
  );
}
