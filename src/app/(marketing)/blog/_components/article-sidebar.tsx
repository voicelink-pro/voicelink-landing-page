import { Children, type ReactNode } from "react";

export function ArticleSidebar({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const card = items.at(-1);
  const toc = items.slice(0, -1);

  return (
    <aside className="order-2 flex min-w-0 flex-col gap-5 lg:sticky lg:top-[calc(var(--site-header-height)+1.5rem)] lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:max-h-[calc(100svh-var(--site-header-height)-3rem)] lg:overflow-hidden">
      <div className="min-h-0 lg:[scrollbar-width:thin] lg:overflow-y-auto lg:overscroll-contain">
        {toc}
      </div>
      <div className="shrink-0">{card}</div>
    </aside>
  );
}
