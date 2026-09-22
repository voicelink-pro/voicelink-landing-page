import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type MarketingLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-dvh bg-background p-2 sm:p-3 lg:p-4">
      <a
        className="fixed top-3 left-3 z-50 -translate-y-20 rounded-md bg-background px-4 py-2 font-medium text-foreground focus:translate-y-0"
        href="#main-content"
      >
        Przejdź do treści
      </a>
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-0 h-[calc(100svh-var(--page-shell-inset))] overflow-hidden rounded-[var(--page-shell-radius)] bg-[image:var(--page-background-image)] bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-background/40" />
        </div>
        <div className="relative z-10 flex min-h-[calc(100svh-var(--page-shell-inset))] flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            {children}
          </main>
        </div>
        <SiteFooter />
      </div>
    </div>
  );
}
