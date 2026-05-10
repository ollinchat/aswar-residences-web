"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import {
  AnimatePresence,
  motion,
  type PanInfo,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Rotate3d } from "lucide-react";

const DRAG_THRESHOLD = 56;

type Props = {
  images: string[];
  label: string;
  on360?: () => void;
};

export function ResidenceGallerySlider({ images, label, on360 }: Props) {
  const [[index, direction], setSlide] = useState([0, 0]);
  const reduceMotion = useReducedMotion();

  const safeLen = images.length;
  const i = ((index % safeLen) + safeLen) % safeLen;

  const paginate = useCallback((dir: number) => {
    setSlide(([prev]) => [prev + dir, dir]);
  }, []);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -DRAG_THRESHOLD) paginate(1);
    else if (info.offset.x > DRAG_THRESHOLD) paginate(-1);
  };

  const variants = {
    enter: (dir: number) => ({
      x: reduceMotion || dir === 0 ? 0 : dir > 0 ? 40 : -40,
      opacity: reduceMotion || dir === 0 ? 1 : 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: reduceMotion || dir === 0 ? 0 : dir < 0 ? 40 : -40,
      opacity: reduceMotion || dir === 0 ? 1 : 0,
    }),
  };

  return (
    <div className="space-y-4">
      <div className="relative min-h-[600px] w-full overflow-hidden rounded-[2px] bg-neutral-100 md:min-h-[min(72vh,820px)]">
        <div className="absolute inset-x-0 top-0 z-30 flex gap-1 px-3 pt-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSlide([idx, idx > i ? 1 : -1])}
              className={`h-[2px] min-w-0 flex-1 rounded-[1px] transition-colors duration-300 ${
                idx === i ? "bg-charcoal" : "bg-charcoal/18 hover:bg-charcoal/30"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={i}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 320, damping: 34 },
              opacity: { duration: reduceMotion ? 0 : 0.24 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.88}
            onDragEnd={onDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[i]}
              alt={`${label} — ${i + 1}`}
              fill
              className="pointer-events-none object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 65vw"
              priority={i === 0}
            />
          </motion.div>
        </AnimatePresence>

        {on360 ? (
          <button
            type="button"
            onClick={on360}
            className="absolute bottom-4 end-4 z-20 inline-flex items-center gap-2 rounded-[2px] border border-white/15 bg-[#0a0a0a]/90 px-4 py-2.5 font-sans text-[9px] font-medium uppercase tracking-[0.28em] text-white shadow-lg backdrop-blur-xl transition-colors hover:bg-zinc-950/85"
          >
            <Rotate3d className="h-4 w-4" strokeWidth={1.2} />
            360°
          </button>
        ) : null}

        <button
          type="button"
          onClick={() => paginate(-1)}
          className="absolute start-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[2px] bg-white/92 text-charcoal shadow-sm transition-colors hover:bg-white md:start-4"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" strokeWidth={1.25} />
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          className="absolute end-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[2px] bg-white/92 text-charcoal shadow-sm transition-colors hover:bg-white md:end-4"
          aria-label="Next image"
        >
          <ChevronRight className="h-4 w-4 rtl:rotate-180" strokeWidth={1.25} />
        </button>
      </div>

      <p className="text-center font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-charcoal/32">
        {String(i + 1).padStart(2, "0")} / {String(safeLen).padStart(2, "0")}
      </p>
    </div>
  );
}
