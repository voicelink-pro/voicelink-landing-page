import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { mainNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

type SiteHeaderNavProps = {
  className?: string;
};

export function SiteHeaderNav({ className }: SiteHeaderNavProps) {
  return (
    <nav
      aria-label="Główna"
      className={cn("flex items-center gap-1", className)}
    >
      {mainNavigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={buttonVariants({ variant: "ghost" })}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
