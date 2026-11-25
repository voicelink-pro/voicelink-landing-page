import { Children, type ReactNode } from "react";

import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";

export function ArticleSidebar({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const card = items.at(-1);
  const toc = items.slice(0, -1);

  return (
    <aside className="order-2 flex min-w-0 flex-col gap-5 lg:sticky lg:top-[calc(var(--site-header-height)+1.5rem)] lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:max-h-[calc(100svh-var(--site-header-height)-3rem)] lg:overflow-hidden">
      <RevealGroup
        className="flex min-h-0 flex-1 flex-col gap-5"
        delay={0.14}
        stagger={0.08}
        trigger="load"
      >
        <RevealItem className="min-h-0 lg:[scrollbar-width:thin] lg:overflow-y-auto lg:overscroll-contain">
          {toc}
        </RevealItem>
        <RevealItem className="shrink-0">{card}</RevealItem>
      </RevealGroup>
    </aside>
  );
}
