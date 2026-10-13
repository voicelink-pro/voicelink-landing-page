"use client";

import type { ReactNode } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";

type RevealTrigger = "load" | "view";

const revealEase = [0.22, 1, 0.36, 1] as const;

const revealItemVariants: Variants = {
  hidden: {
    opacity: 0,
    transform: "translateY(0.3rem)",
  },
  visible: {
    opacity: 1,
    transform: "none",
    transition: {
      duration: 0.36,
      ease: revealEase,
    },
  },
};

const viewport = {
  once: true,
  amount: "some",
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
  stagger = 0.04,
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

export function RevealCluster({
  children,
  className,
  delay = 0,
  stagger = 0.04,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealList({
  as = "ul",
  children,
  className,
  delay = 0.04,
  stagger = 0.04,
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

export function RevealTableBody({
  children,
  className,
  delay = 0.06,
  stagger = 0.04,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.tbody
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
    </motion.tbody>
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
    <motion.tr className={className} variants={revealItemVariants}>
      {children}
    </motion.tr>
  );
}
