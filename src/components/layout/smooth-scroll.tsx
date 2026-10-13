"use client";

import { useEffect } from "react";
import Lenis, { type LenisOptions } from "lenis";

import "lenis/dist/lenis.css";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

// Mniejsze `lerp` wydłuża wyhamowanie. Mniejsze `wheelMultiplier` skraca krok kółka.
const smoothScrollOptions = {
  autoRaf: true,
  smoothWheel: true,
  lerp: 0.08,
  wheelMultiplier: 0.85,
  syncTouch: false,
  anchors: true,
  allowNestedScroll: true,
  stopInertiaOnNavigate: true,
} satisfies LenisOptions;

function isPlainPrimaryClick(event: MouseEvent) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

function findClickedAnchor(event: MouseEvent) {
  const target = event.target;

  if (!(target instanceof Element)) {
    return null;
  }

  const anchor = target.closest("a");

  if (!(anchor instanceof HTMLAnchorElement)) {
    return null;
  }

  if (
    (anchor.target && anchor.target !== "_self") ||
    anchor.hasAttribute("download")
  ) {
    return null;
  }

  return anchor;
}

function readAnchorUrl(anchor: HTMLAnchorElement) {
  try {
    return new URL(anchor.href, window.location.href);
  } catch {
    return null;
  }
}

function isSamePageHashLink(anchor: HTMLAnchorElement) {
  const url = readAnchorUrl(anchor);

  return (
    url !== null &&
    url.origin === window.location.origin &&
    url.pathname === window.location.pathname &&
    url.hash.length > 1
  );
}

function isInternalNavigation(anchor: HTMLAnchorElement) {
  const url = readAnchorUrl(anchor);

  return url !== null && url.origin === window.location.origin;
}

function isDialogScrollLocked() {
  const root = document.documentElement;

  if (root.hasAttribute("data-base-ui-scroll-locked")) {
    return true;
  }

  return [root.style.overflowY, document.body.style.overflowY].some(
    (value) => value === "hidden" || value === "clip",
  );
}

function releaseInertia(lenis: Lenis) {
  if (lenis.isStopped) {
    return;
  }

  lenis.stop();
  lenis.start();
}

export function SmoothScroll() {
  useEffect(() => {
    const motionPreference = window.matchMedia(reducedMotionQuery);
    let lenis: Lenis | null = null;
    let removeListeners = () => {};

    const destroy = () => {
      removeListeners();
      removeListeners = () => {};
      lenis?.destroy();
      lenis = null;
    };

    const create = () => {
      if (lenis || motionPreference.matches) {
        return;
      }

      const instance = new Lenis(smoothScrollOptions);
      lenis = instance;
      let correctingScroll = false;

      const syncDialogLock = () => {
        if (isDialogScrollLocked()) {
          instance.stop();
          return;
        }

        if (instance.isStopped) {
          instance.start();
        }
      };

      const onScroll = () => {
        if (
          correctingScroll ||
          instance.isScrolling !== "smooth" ||
          Math.abs(instance.animatedScroll - window.scrollY) <= 1
        ) {
          return;
        }

        correctingScroll = true;
        window.scrollTo({
          top: instance.animatedScroll,
          behavior: "instant",
        });
        correctingScroll = false;
      };

      const onClick = (event: MouseEvent) => {
        if (!isPlainPrimaryClick(event)) {
          return;
        }

        const anchor = findClickedAnchor(event);

        if (
          !anchor ||
          isSamePageHashLink(anchor) ||
          !isInternalNavigation(anchor)
        ) {
          return;
        }

        releaseInertia(instance);
      };

      const onPopState = () => {
        releaseInertia(instance);
      };

      const onPageShow = (event: PageTransitionEvent) => {
        if (event.persisted) {
          releaseInertia(instance);
        }
      };

      const lockObserver = new MutationObserver(syncDialogLock);
      lockObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["style", "data-base-ui-scroll-locked"],
      });
      lockObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["style"],
      });

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("click", onClick, true);
      window.addEventListener("popstate", onPopState, true);
      window.addEventListener("pageshow", onPageShow);
      syncDialogLock();

      removeListeners = () => {
        lockObserver.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("click", onClick, true);
        window.removeEventListener("popstate", onPopState, true);
        window.removeEventListener("pageshow", onPageShow);
      };
    };

    const onMotionPreferenceChange = () => {
      if (motionPreference.matches) {
        destroy();
        return;
      }

      create();
    };

    onMotionPreferenceChange();
    motionPreference.addEventListener("change", onMotionPreferenceChange);

    return () => {
      motionPreference.removeEventListener("change", onMotionPreferenceChange);
      destroy();
    };
  }, []);

  return null;
}
