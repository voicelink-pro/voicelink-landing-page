"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type ArticleTocItem = {
  id: string;
  label: string;
};

export function ArticleToc({ items }: { items: readonly ArticleTocItem[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="rounded-3xl border border-border bg-muted p-5 sm:p-6">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 rounded-xl text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
      >
        <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 text-xs font-medium tracking-[-0.01em] text-eyebrow">
          <Image
            src={siteConfig.eyebrowIcon.src}
            alt=""
            width={siteConfig.eyebrowIcon.width}
            height={siteConfig.eyebrowIcon.height}
            className="h-3.5 w-auto"
            sizes="20px"
            unoptimized
          />
          <span>Spis treści</span>
        </span>
        <ChevronDownIcon
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-300 motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden" inert={open ? undefined : true}>
          <nav aria-label="Spis treści artykułu" className="mt-4">
            <ol className="flex flex-col gap-1.5 border-t border-border pt-4">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block rounded-xl px-3 py-2 text-sm leading-5 text-foreground/85 transition-colors hover:bg-white hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}
