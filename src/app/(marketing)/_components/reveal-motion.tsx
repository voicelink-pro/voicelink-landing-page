"use client";

import type { ReactNode } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";

type RevealTrigger = "load" | "view";

const revealItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const viewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -8% 0px",
} as const;

function getTriggerProps(trigger: RevealTrigger) {
  return trigger === "load"
    ? { animate: "visible" as const }
    : {
        whileInView: "visible" as const,
        viewport,
      };
}

export function PageMotion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function RevealGroup({
  "aria-hidden": ariaHidden,
  children,
  className,
  delay = 0,
  stagger = 0.08,
  trigger = "view",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: RevealTrigger;
  "aria-hidden"?: boolean | "false" | "true";
}) {
  return (
    <motion.div
      aria-hidden={ariaHidden}
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
      {...getTriggerProps(trigger)}
    >
      {children}
    </motion.div>
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
    <motion.div className={className} variants={revealItemVariants}>
      {children}
    </motion.div>
  );
}

export function RevealList({
  as = "ul",
  children,
  className,
  delay = 0.08,
  stagger = 0.07,
}: {
  as?: "ol" | "ul";
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const List = as === "ol" ? motion.ol : motion.ul;

  return (
    <List
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
      whileInView="visible"
      viewport={viewport}
    >
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
    <motion.li className={className} variants={revealItemVariants}>
      {children}
    </motion.li>
  );
}
