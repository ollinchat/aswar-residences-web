"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect } from "react";

type Fullscreen360Props = {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
};

export function Fullscreen360({
  open,
  onClose,
  imageSrc,
  title,
}: Fullscreen360Props) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-10">
            <p className="font-serif text-lg font-medium tracking-wide text-paper md:text-xl">
              {title}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 text-paper transition-colors hover:border-champagne hover:text-champagne"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-ink">
            <p className="pointer-events-none absolute left-1/2 top-4 z-10 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.35em] text-paper/50">
              Drag to explore · 360° environment
            </p>
            <motion.div
              className="relative h-[118vh] w-[118vw] shrink-0 cursor-grab active:cursor-grabbing"
              drag
              dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }}
              dragElastic={0.06}
              dragTransition={{ bounceStiffness: 280, bounceDamping: 24 }}
            >
              <Image
                src={imageSrc}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority
                draggable={false}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
