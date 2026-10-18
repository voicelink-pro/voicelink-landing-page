"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LanguagesIcon } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import { FunctionIcon } from "./function-icon";

const AUTO_ADVANCE_MS = 5000;

export type FunctionShowcaseItem = {
  title: string;
  description: string;
  icon?: string;
  image?: string;
};

export function FunctionShowcase({
  items,
}: {
  items: readonly FunctionShowcaseItem[];
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [isInView, setIsInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const active = items[activeIndex] ?? items[0];
  const autoplay =
    !prefersReducedMotion && isInView && isPageVisible && items.length > 1;

  useEffect(() => {
    const frame = frameRef.current;

    if (!frame) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.4 },
    );

    observer.observe(frame);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setPrefersReducedMotion(query.matches);

    syncMotion();
    query.addEventListener("change", syncMotion);

    return () => query.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    const syncVisibility = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };

    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);

    return () =>
      document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  useEffect(() => {
    if (!autoplay) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % items.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [autoplay, activeIndex, items.length]);

  if (!active) {
    return null;
  }

  function selectItem(title: string) {
    const index = items.findIndex((item) => item.title === title);

    if (index >= 0) {
      setActiveIndex(index);
    }
  }

  return (
    <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-24">
      <RevealGroup>
        <RevealItem>
          <div className="lg:sticky lg:top-[calc(var(--site-header-height)+2rem)]">
            <div
              ref={frameRef}
              className="relative mx-auto aspect-[4/3] w-full max-w-xs sm:max-w-sm lg:aspect-square lg:max-w-none"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[4%] rounded-2xl bg-muted sm:inset-[6%] sm:rounded-3xl lg:inset-[8%]"
              />
              {items.map((item) => {
                const isActive = item.title === active.title;
                const imageFailed = item.image
                  ? failedImages.has(item.image)
                  : true;

                return (
                  <div
                    key={item.title}
                    aria-hidden={!isActive}
                    className={cn(
                      "absolute inset-0 flex items-center justify-center",
                      !isActive && "invisible",
                    )}
                  >
                    {item.image && !imageFailed ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-contain p-4 sm:p-6 lg:p-10"
                        sizes="(min-width: 1024px) 34rem, (min-width: 640px) 24rem, 20rem"
                        unoptimized
                        onError={() => {
                          const src = item.image;

                          if (!src) {
                            return;
                          }

                          setFailedImages((current) => {
                            if (current.has(src)) {
                              return current;
                            }

                            const next = new Set(current);
                            next.add(src);
                            return next;
                          });
                        }}
                      />
                    ) : item.icon ? (
                      <FunctionIcon
                        className="size-16 sm:size-20 lg:size-24"
                        icon={item.icon}
                      />
                    ) : (
                      <LanguagesIcon
                        aria-hidden="true"
                        className="size-14 sm:size-16"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </RevealItem>
      </RevealGroup>

      <Accordion
        className="gap-1"
        keepMounted
        value={[active.title]}
        onValueChange={(value) => {
          const nextTitle = value.at(-1);

          if (typeof nextTitle === "string") {
            selectItem(nextTitle);
          }
        }}
      >
        <RevealGroup className="flex flex-col gap-1" stagger={0.04}>
          {items.map((item) => {
            const isOpen = item.title === active.title;

            return (
              <RevealItem key={item.title}>
                <AccordionItem
                  className={cn(
                    "rounded-2xl border border-transparent px-3 transition-[background-color,border-color] duration-200 ease-out motion-reduce:transition-none",
                    isOpen && "border-primary bg-muted",
                  )}
                  value={item.title}
                >
                  <AccordionTrigger className="py-2.5 text-base font-normal tracking-[-0.02em] sm:py-3 sm:text-lg [&>svg]:hidden">
                    <span className="flex items-center gap-3 sm:gap-4">
                      <ItemIcon item={item} />
                      <span className="text-left text-balance">
                        {item.title}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pr-2 pb-3.5 pl-11 sm:pb-4 sm:pl-14">
                    <p className="text-sm leading-6 text-pretty text-muted-foreground sm:text-base sm:leading-7">
                      {item.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Accordion>
    </div>
  );
}

function ItemIcon({ item }: { item: FunctionShowcaseItem }) {
  if (item.icon) {
    return (
      <FunctionIcon className="size-8 shrink-0 sm:size-10" icon={item.icon} />
    );
  }

  return (
    <LanguagesIcon aria-hidden="true" className="size-8 shrink-0 sm:size-10" />
  );
}
