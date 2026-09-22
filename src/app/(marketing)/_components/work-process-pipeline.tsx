"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type WorkProcessStep = {
  title: string;
  description: string;
};

const stepImages = [
  "/analiza.png",
  "/konfiguracja.png",
  "/integracja.png",
  "/testy.png",
  "/start.png",
  "/optymalizacja.png",
] as const;

export function WorkProcessPipeline({
  steps,
}: {
  steps: readonly WorkProcessStep[];
}) {
  const pipelineRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const checkpointRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const checkpointProgress = useRef<number[]>([]);
  const [activeStep, setActiveStep] = useState(-1);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: pipelineRef,
    offset: ["start 75%", "end 35%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });
  const lineProgress = shouldReduceMotion ? scrollYProgress : smoothProgress;

  const updateActiveStep = useCallback((latest: number) => {
    const nextStep = checkpointProgress.current.reduce(
      (current, threshold, index) => (latest >= threshold ? index : current),
      -1,
    );
    setActiveStep((current) => (current === nextStep ? current : nextStep));
  }, []);

  const measureCheckpoints = useCallback(() => {
    const pipeline = pipelineRef.current;

    if (!pipeline) {
      return;
    }

    const isDesktop = window.matchMedia("(min-width: 48rem)").matches;
    const markers = isDesktop ? checkpointRefs.current : numberRefs.current;
    const pipelineRect = pipeline.getBoundingClientRect();
    const lineStart = 20;
    const lineLength = Math.max(pipeline.clientHeight - lineStart * 2, 1);

    checkpointProgress.current = markers.map((marker) => {
      if (!marker) {
        return 1;
      }

      const markerRect = marker.getBoundingClientRect();
      const markerCenter =
        markerRect.top - pipelineRect.top + markerRect.height / 2;

      return Math.min(1, Math.max(0, (markerCenter - lineStart) / lineLength));
    });

    updateActiveStep(lineProgress.get());
  }, [lineProgress, updateActiveStep]);

  useLayoutEffect(() => {
    const pipeline = pipelineRef.current;

    if (!pipeline) {
      return;
    }

    const resizeObserver = new ResizeObserver(measureCheckpoints);
    resizeObserver.observe(pipeline);
    measureCheckpoints();

    return () => resizeObserver.disconnect();
  }, [measureCheckpoints]);

  useMotionValueEvent(lineProgress, "change", updateActiveStep);

  return (
    <div ref={pipelineRef} className="relative">
      <div
        aria-hidden="true"
        className="absolute top-5 bottom-5 left-5 w-px bg-foreground/12 md:left-1/2 md:-translate-x-1/2"
      >
        <motion.div
          className="h-full w-full origin-top bg-eyebrow"
          style={{ scaleY: lineProgress }}
        />
      </div>

      <ol className="relative grid gap-4">
        {steps.map((step, index) => {
          const isReached = index <= activeStep;
          const isHighlighted = isReached || hoveredStep === index;
          const isLeft = index % 2 === 0;
          const image = stepImages[index];

          return (
            <motion.li
              key={step.title}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-3 md:grid-cols-[2.5rem_minmax(0,1fr)_5rem_minmax(0,1fr)_2.5rem] md:gap-x-3"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: shouldReduceMotion ? 0.2 : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <span
                ref={(element) => {
                  numberRefs.current[index] = element;
                }}
                className={cn(
                  "relative z-10 flex size-10 items-center justify-center rounded-full border bg-background font-mono text-xs font-semibold transition-colors duration-300",
                  isLeft
                    ? "md:col-start-1 md:row-start-1"
                    : "md:col-start-5 md:row-start-1",
                  isHighlighted
                    ? "border-eyebrow bg-eyebrow text-white"
                    : "border-foreground/15 text-muted-foreground",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                ref={(element) => {
                  checkpointRefs.current[index] = element;
                }}
                aria-hidden="true"
                className={cn(
                  "relative z-10 hidden size-3 justify-self-center rounded-full border transition-colors duration-300 md:col-start-3 md:row-start-1 md:block",
                  isReached
                    ? "border-eyebrow bg-eyebrow"
                    : "border-foreground/20 bg-background",
                )}
              />

              <motion.div
                className={cn(
                  "min-w-0",
                  isLeft
                    ? "md:col-start-2 md:row-start-1"
                    : "md:col-start-4 md:row-start-1",
                )}
                animate={{
                  x: hoveredStep === index ? (isLeft ? -4 : 4) : 0,
                }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              >
                <Card
                  className="bg-white shadow-sm ring-foreground/6"
                  size="sm"
                >
                  <CardHeader className="gap-2 sm:px-5 sm:py-4">
                    <CardTitle className="text-xl font-semibold group-data-[size=sm]/card:text-xl sm:text-2xl sm:group-data-[size=sm]/card:text-2xl">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="leading-6 text-pretty sm:leading-7">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              {image ? (
                <div
                  aria-hidden="true"
                  className={cn(
                    "col-start-2 row-start-2 mt-3 flex min-w-0 items-center justify-center md:row-start-1 md:mt-0",
                    isLeft ? "md:col-start-4" : "md:col-start-2",
                  )}
                >
                  <div className="relative aspect-[3/2] w-full max-w-[18rem]">
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="(min-width: 768px) 18rem, calc(100vw - 5rem)"
                      unoptimized
                    />
                  </div>
                </div>
              ) : null}
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
