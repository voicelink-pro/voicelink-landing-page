import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import {
  SiteHeader,
  SiteHeaderRouteSync,
} from "@/components/layout/site-header";

type MarketingLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-dvh bg-background">
      <a
        className="fixed top-3 left-3 z-50 -translate-y-20 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground focus:translate-y-0"
        href="#main-content"
      >
        Przejdź do treści
      </a>
      <div className="marketing-shell relative has-data-[page-hero=compact]:[--page-hero-height:var(--page-hero-compact-height)]">
        <div className="flex min-h-[var(--page-hero-height)] flex-col">
          <SiteHeader />
          <main
            id="main-content"
            className="w-full min-w-0 flex-1"
            tabIndex={-1}
          >
            {children}
          </main>
          <SiteHeaderRouteSync />
        </div>
        <SiteFooter />
      </div>
    </div>
  );
}
