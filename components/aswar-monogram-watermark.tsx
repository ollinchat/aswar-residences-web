"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fillImageParentAbsoluteStyle } from "@/lib/image-layout";

const GOLD = "#9A8550";

export function AswarMonogramWatermark({ className }: { className?: string }) {
  /** Plain div ref — Framer useScroll requires a non-static target (not motion-only). */
  const targetRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

  return (
    <div
      ref={targetRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      style={fillImageParentAbsoluteStyle}
      aria-hidden
    >
      <motion.div
        className="relative flex h-full w-full items-center justify-center"
        style={reduceMotion ? { position: "relative" } : { position: "relative", y }}
      >
        <svg
          viewBox="0 0 100 118"
          className="h-[min(72vw,520px)] w-[min(58vw,420px)] opacity-[0.015]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={GOLD}
            d="M50 5 L91 113 H71 L64 88 H36 L29 113 H9 Z M50 34 L43 70 H57 Z"
          />
        </svg>
      </motion.div>
    </div>
  );
}
