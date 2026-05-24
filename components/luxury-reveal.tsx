"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import {
  LUXURY_DURATION,
  LUXURY_EASE,
  luxuryContainerVariants,
  luxuryItemVariants,
} from "@/lib/luxury-motion";

export function LuxuryStagger({
  children,
  className,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.12, margin: "0px 0px -8% 0px" });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className ?? ""}`.trim()}
      style={{ position: "relative" }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={luxuryContainerVariants}
    >
      {children}
    </motion.div>
  );
}

export function LuxuryRevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <motion.div className={className}>{children}</motion.div>;
  }

  return (
    <motion.div variants={luxuryItemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function LuxuryFadeUp({
  children,
  className,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.15 });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <motion.div className={className}>{children}</motion.div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className ?? ""}`.trim()}
      style={{ position: "relative" }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: LUXURY_DURATION, ease: LUXURY_EASE }}
    >
      {children}
    </motion.div>
  );
}
