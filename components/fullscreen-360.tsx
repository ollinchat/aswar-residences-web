"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

type Fullscreen360Props = {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
};

const SPRING = { stiffness: 90, damping: 22, mass: 0.85 };

export function Fullscreen360({
  open,
  onClose,
  imageSrc,
  title,
}: Fullscreen360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const springX = useSpring(targetX, SPRING);
  const springY = useSpring(targetY, SPRING);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    targetX.set(0);
    targetY.set(0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, targetX, targetY]);

  const updateLook = (clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (clientX - cx) / (rect.width / 2);
    const ny = (clientY - cy) / (rect.height / 2);
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    const maxPx = 80;
    targetX.set(-clamp(nx) * maxPx);
    targetY.set(-clamp(ny) * maxPx);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    updateLook(e.clientX, e.clientY);
  };

  const handlePointerLeave = () => {
    targetX.set(0);
    targetY.set(0);
  };

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
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-4 md:px-10">
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
          <div
            ref={containerRef}
            className="relative min-h-0 flex-1 cursor-crosshair overflow-hidden bg-black"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <p className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center font-mono text-[9px] uppercase tracking-[0.35em] text-paper/45">
              Move pointer to look around · High-resolution panorama
            </p>
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <motion.div
                className="relative h-[128%] w-[128%] shrink-0"
                style={{ x: springX, y: springY }}
              >
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                  quality={95}
                  draggable={false}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
