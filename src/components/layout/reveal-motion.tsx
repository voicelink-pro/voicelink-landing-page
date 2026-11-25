"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealTrigger = "load" | "view";
type ObserverCallback = (batchIndex: number) => void;

const MAX_STAGGER_STEPS = 6;
const TRANSITION_CLEANUP_BUFFER_MS = 780;

const observerCallbacks = new WeakMap<Element, ObserverCallback>();
const observedElements = new Set<Element>();
let sharedObserver: IntersectionObserver | null = null;
let scrollFallbackAttached = false;
let scrollFallbackTimer = 0;

function revealTarget(target: Element, batchIndex: number) {
  const callback = observerCallbacks.get(target);

  if (!callback) {
    return false;
  }

  observerCallbacks.delete(target);
  observedElements.delete(target);
  sharedObserver?.unobserve(target);
  callback(batchIndex);

  if (observedElements.size === 0) {
    detachScrollFallback();
  }

  return true;
}

function flushPassedElements() {
  if (observedElements.size === 0) {
    detachScrollFallback();
    return;
  }

  const threshold = window.innerHeight * 0.94;
  let batchIndex = 0;

  for (const target of Array.from(observedElements)) {
    const rect = target.getBoundingClientRect();

    if (rect.top < threshold) {
      if (revealTarget(target, batchIndex)) {
        batchIndex += 1;
      }
    }
  }
}

function onScrollOrHashChange() {
  window.clearTimeout(scrollFallbackTimer);
  scrollFallbackTimer = window.setTimeout(flushPassedElements, 140);
}

function attachScrollFallback() {
  if (scrollFallbackAttached || typeof window === "undefined") {
    return;
  }

  scrollFallbackAttached = true;
  window.addEventListener("scroll", onScrollOrHashChange, { passive: true });
  window.addEventListener("hashchange", flushPassedElements);
}

function detachScrollFallback() {
  if (!scrollFallbackAttached || typeof window === "undefined") {
    return;
  }

  scrollFallbackAttached = false;
  window.clearTimeout(scrollFallbackTimer);
  window.removeEventListener("scroll", onScrollOrHashChange);
  window.removeEventListener("hashchange", flushPassedElements);
}

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        let batchIndex = 0;

        for (let i = 0; i < entries.length; i += 1) {
          const entry = entries[i];

          if (
            !entry.isIntersecting &&
            entry.boundingClientRect.top >= window.innerHeight
          ) {
            continue;
          }

          if (revealTarget(entry.target, batchIndex)) {
            batchIndex += 1;
          }
        }
      },
      {
        rootMargin: "0px 0px -6% 0px",
        threshold: 0.01,
      },
    );
  }

  return sharedObserver;
}

function observeTarget(
  observer: IntersectionObserver,
  target: Element,
  callback: ObserverCallback,
) {
  observerCallbacks.set(target, callback);
  observedElements.add(target);
  observer.observe(target);
  attachScrollFallback();
}

function unobserveTarget(observer: IntersectionObserver, target: Element) {
  observerCallbacks.delete(target);
  observedElements.delete(target);
  observer.unobserve(target);

  if (observedElements.size === 0) {
    detachScrollFallback();
  }
}

function getDirectRevealItems(
  container: HTMLElement,
  useDirectChildren: boolean,
): HTMLElement[] {
  if (useDirectChildren) {
    return Array.from(container.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    );
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>("[data-reveal-item]"),
  ).filter((item) => item.closest("[data-reveal-group]") === container);
}

function scheduleCleanup(
  item: HTMLElement,
  delaySeconds: number,
  cleanups: Array<() => void>,
) {
  let finished = false;

  const markDone = () => {
    if (finished) {
      return;
    }

    finished = true;
    item.removeEventListener("transitionend", onTransitionEnd);
    window.clearTimeout(fallbackTimer);

    if (item.dataset.revealState === "visible") {
      item.dataset.revealState = "done";
      item.style.transitionDelay = "";
    }
  };

  const onTransitionEnd = (event: TransitionEvent) => {
    if (event.target === item && event.propertyName === "transform") {
      markDone();
    }
  };

  item.addEventListener("transitionend", onTransitionEnd);
  const fallbackTimer = window.setTimeout(
    markDone,
    Math.round(delaySeconds * 1000) + TRANSITION_CLEANUP_BUFFER_MS,
  );

  cleanups.push(() => {
    finished = true;
    item.removeEventListener("transitionend", onTransitionEnd);
    window.clearTimeout(fallbackTimer);
  });
}

function useRevealGroup<T extends HTMLElement>({
  delay,
  stagger,
  trigger,
  useDirectChildren = false,
}: {
  delay: number;
  stagger: number;
  trigger: RevealTrigger;
  useDirectChildren?: boolean;
}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element || trigger === "load") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const items = getDirectRevealItems(element, useDirectChildren);

    if (items.length === 0) {
      return;
    }

    if (useDirectChildren) {
      for (let i = 0; i < items.length; i += 1) {
        items[i].dataset.revealItem = "";
      }
    }

    const observer = getSharedObserver();

    if (!observer) {
      return;
    }

    const viewportThreshold = window.innerHeight * 0.94;
    const containerRect = element.getBoundingClientRect();
    const observeIndividually =
      useDirectChildren ||
      (items.length > 1 && containerRect.height > window.innerHeight * 0.8);

    const localObserved: Element[] = [];
    const cleanups: Array<() => void> = [];

    if (observeIndividually) {
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        const itemRect = item.getBoundingClientRect();

        if (itemRect.top < viewportThreshold) {
          continue;
        }

        item.dataset.revealState = "hidden";

        const revealItem = (batchIndex: number) => {
          const itemDelay =
            delay + Math.min(batchIndex, MAX_STAGGER_STEPS) * stagger;
          item.style.transitionDelay = itemDelay > 0 ? `${itemDelay}s` : "";
          item.dataset.revealState = "visible";
          scheduleCleanup(item, itemDelay, cleanups);
        };

        observeTarget(observer, item, revealItem);
        localObserved.push(item);
      }
    } else {
      if (containerRect.top < viewportThreshold) {
        return;
      }

      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        const itemDelay = delay + Math.min(i, MAX_STAGGER_STEPS) * stagger;
        item.style.transitionDelay = itemDelay > 0 ? `${itemDelay}s` : "";
        item.dataset.revealState = "hidden";
      }

      const revealGroup = () => {
        for (let i = 0; i < items.length; i += 1) {
          const item = items[i];
          const itemDelay = delay + Math.min(i, MAX_STAGGER_STEPS) * stagger;
          item.dataset.revealState = "visible";
          scheduleCleanup(item, itemDelay, cleanups);
        }
      };

      observeTarget(observer, element, revealGroup);
      localObserved.push(element);
    }

    return () => {
      for (let i = 0; i < localObserved.length; i += 1) {
        unobserveTarget(observer, localObserved[i]);
      }

      for (let i = 0; i < cleanups.length; i += 1) {
        cleanups[i]();
      }
    };
  }, [delay, stagger, trigger, useDirectChildren]);

  return ref;
}

function getLoadStyle(
  trigger: RevealTrigger,
  delay: number,
  stagger: number,
): CSSProperties | undefined {
  if (trigger !== "load") {
    return undefined;
  }

  return {
    "--reveal-delay": `${delay}s`,
    "--reveal-stagger": `${stagger}s`,
  } as CSSProperties;
}

export function PageMotion({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function RevealGroup({
  "aria-hidden": ariaHidden,
  children,
  className,
  delay = 0,
  stagger = 0.07,
  trigger = "view",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: RevealTrigger;
  "aria-hidden"?: boolean | "false" | "true";
}) {
  const ref = useRevealGroup<HTMLDivElement>({ delay, stagger, trigger });

  return (
    <div
      ref={ref}
      aria-hidden={ariaHidden}
      className={className}
      data-reveal-group=""
      data-reveal-load={trigger === "load" ? "" : undefined}
      style={getLoadStyle(trigger, delay, stagger)}
    >
      {children}
    </div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className} data-reveal-item="">
      {children}
    </div>
  );
}

export function RevealCluster({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return <div className={className}>{children}</div>;
}

export function RevealList({
  as = "ul",
  children,
  className,
  delay = 0.05,
  stagger = 0.065,
}: {
  as?: "ol" | "ul";
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRevealGroup<HTMLUListElement & HTMLOListElement>({
    delay,
    stagger,
    trigger: "view",
  });
  const List = as === "ol" ? "ol" : "ul";

  return (
    <List ref={ref} className={className} data-reveal-group="">
      {children}
    </List>
  );
}

export function RevealListItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <li className={className} data-reveal-item="">
      {children}
    </li>
  );
}

export function RevealTableBody({
  children,
  className,
  delay = 0.05,
  stagger = 0.045,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRevealGroup<HTMLTableSectionElement>({
    delay,
    stagger,
    trigger: "view",
  });

  return (
    <tbody ref={ref} className={className} data-reveal-group="">
      {children}
    </tbody>
  );
}

export function RevealTableRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tr className={className} data-reveal-item="">
      {children}
    </tr>
  );
}

export function RevealArticle({
  children,
  className,
  delay = 0,
  stagger = 0.06,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRevealGroup<HTMLElement>({
    delay,
    stagger,
    trigger: "view",
    useDirectChildren: true,
  });

  return (
    <article ref={ref} className={className} data-reveal-group="">
      {children}
    </article>
  );
}
