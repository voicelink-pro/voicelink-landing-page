"use client";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import { RevealList, RevealListItem } from "@/components/layout/reveal-motion";
import { cn } from "@/lib/utils";

import { ProcessIcon } from "./process-icon";

type ProcessTimelineStep = {
  title: string;
  icon: string;
  paragraphs: readonly string[];
  link?: {
    label: string;
    href: string;
  };
};

export function ProcessStepsTimeline({
  steps,
}: {
  steps: readonly ProcessTimelineStep[];
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const checkpointProgress = useRef<number[]>([]);
  const [lineBox, setLineBox] = useState({ top: 22, height: 1 });
  const [activeStep, setActiveStep] = useState(-1);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 48%", "end 80%"],
  });

  const updateActiveStep = useCallback((latest: number) => {
    if (latest <= 0) {
      setActiveStep(-1);
      return;
    }

    const nextStep = checkpointProgress.current.reduce(
      (current, threshold, index) =>
        latest >= threshold - 0.015 ? index : current,
      -1,
    );
    setActiveStep((current) => (current === nextStep ? current : nextStep));
  }, []);

  const measureCheckpoints = useCallback(() => {
    const list = listRef.current;
    const first = numberRefs.current[0];
    const last = numberRefs.current[numberRefs.current.length - 1];

    if (!list || !first || !last) {
      return;
    }

    const listRect = list.getBoundingClientRect();
    const firstRect = first.getBoundingClientRect();
    const lastRect = last.getBoundingClientRect();
    const start = firstRect.top - listRect.top + firstRect.height / 2;
    const end = lastRect.top - listRect.top + lastRect.height / 2;
    const length = Math.max(end - start, 1);

    setLineBox({ top: start, height: length });
    checkpointProgress.current = numberRefs.current.map((marker) => {
      if (!marker) {
        return 1;
      }

      const markerRect = marker.getBoundingClientRect();
      const center = markerRect.top - listRect.top + markerRect.height / 2;

      return Math.min(1, Math.max(0, (center - start) / length));
    });
    updateActiveStep(scrollYProgress.get());
  }, [scrollYProgress, updateActiveStep]);

  useLayoutEffect(() => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    const resizeObserver = new ResizeObserver(measureCheckpoints);
    resizeObserver.observe(list);
    measureCheckpoints();

    return () => resizeObserver.disconnect();
  }, [measureCheckpoints]);

  useMotionValueEvent(scrollYProgress, "change", updateActiveStep);

  return (
    <div ref={listRef} className="relative mt-10 sm:mt-14">
      <div
        ref={lineRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-[1.375rem] w-0.5 -translate-x-1/2"
        style={{ top: lineBox.top, height: lineBox.height }}
      >
        <div className="absolute inset-0 bg-foreground/12" />
        <motion.div
          className="absolute inset-0 origin-top bg-primary will-change-transform"
          style={{ scaleY: scrollYProgress }}
        />
      </div>

      <RevealList as="ol">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isReached = index <= activeStep;

          return (
            <RevealListItem
              key={step.title}
              className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 sm:gap-x-6"
            >
              <div className="relative flex justify-center">
                <span
                  ref={(element) => {
                    numberRefs.current[index] = element;
                  }}
                  className={cn(
                    "relative z-10 flex size-11 items-center justify-center rounded-full text-sm font-semibold tabular-nums ring-1 motion-safe:transition-colors motion-safe:duration-500",
                    isReached
                      ? "bg-primary text-white ring-primary"
                      : "bg-background text-eyebrow ring-border",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div
                className={cn(
                  "grid items-start gap-4 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:gap-8 lg:gap-12",
                  !isLast && "pb-10 sm:pb-14 lg:pb-16",
                )}
              >
                <div className="flex flex-col gap-3">
                  <ProcessIcon icon={step.icon} />
                  <h3 className="subsection-title text-xl sm:text-2xl">
                    {step.title}
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  {step.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {step.link ? (
                    <Link
                      className="group/link inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary sm:text-base"
                      href={step.link.href}
                    >
                      {step.link.label}
                      <ArrowRightIcon
                        aria-hidden="true"
                        className="size-4 motion-safe:transition-transform motion-safe:group-hover/link:translate-x-0.5"
                      />
                    </Link>
                  ) : null}
                </div>
              </div>
            </RevealListItem>
          );
        })}
      </RevealList>
    </div>
  );
}
