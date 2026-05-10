"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import type { CopyKey } from "@/lib/i18n";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/components/language-provider";
import {
  AMENITY_LIST_ORDER,
  type AmenityListKey,
} from "@/lib/amenity-hotspots";

const GOLD = "#9A8550";
const NAVY = "#0f172a";

const AMENITY_DESC = {
  amenityFurnishedUnits: "amenityFurnishedUnitsDesc",
  amenityAdultKidsPools: "amenityAdultKidsPoolsDesc",
  amenityGymJogTrack: "amenityGymJogTrackDesc",
  amenityYogaMultipurposeDecks: "amenityYogaMultipurposeDecksDesc",
  amenityBbqFirePit: "amenityBbqFirePitDesc",
  amenityKidsPlayground: "amenityKidsPlaygroundDesc",
  amenityReadingBeanBags: "amenityReadingBeanBagsDesc",
  amenityCabanasWetDecks: "amenityCabanasWetDecksDesc",
  amenityCourtyardWaterGarden: "amenityCourtyardWaterGardenDesc",
  amenityMultipurposeHallLawn: "amenityMultipurposeHallLawnDesc",
  amenityRooftopOpenArea: "amenityRooftopOpenAreaDesc",
} as const satisfies Record<AmenityListKey, CopyKey>;

export function ProjectAmenities() {
  const { t, lang } = useLang();
  const reduceMotion = useReducedMotion();
  const towerZoneRef = useRef<HTMLDivElement>(null);
  const [detailKey, setDetailKey] = useState<AmenityListKey | null>(null);

  const mouseNorm = useMotionValue(0);
  const mouseSpring = useSpring(mouseNorm, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
  });

  const rotateY = useTransform(mouseSpring, [-1, 1], [62, -62]);

  const openDetail = useCallback((key: AmenityListKey) => {
    setDetailKey(key);
  }, []);

  const closeDetail = useCallback(() => {
    setDetailKey(null);
  }, []);

  useEffect(() => {
    if (!detailKey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDetail();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detailKey, closeDetail]);

  const onTowerPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const el = towerZoneRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / Math.max(r.width, 1);
      mouseNorm.set(Math.max(-1, Math.min(1, nx * 2 - 1)));
    },
    [mouseNorm, reduceMotion],
  );

  const onTowerPointerLeave = useCallback(() => {
    mouseNorm.set(0);
  }, [mouseNorm]);

  return (
    <section
      className="relative h-[100svh] max-h-[100svh] min-h-0 overflow-hidden bg-white"
      aria-label={t("amenitiesTitle")}
    >
      {/* Top 70% — floating tower, mouse rotation only in this band */}
      <div
        ref={towerZoneRef}
        onPointerMove={onTowerPointerMove}
        onPointerLeave={onTowerPointerLeave}
        className="flex h-[70%] min-h-0 flex-col items-center justify-center bg-[#FDFCF9] px-4 pt-6 md:px-10"
        dir="ltr"
      >
        <p
          className={`pointer-events-none mb-2 text-center text-[9px] font-medium uppercase tracking-[0.28em] text-[#0f172a]/45 md:mb-3 md:text-[10px] ${lang === "ar" ? "font-arabic" : "font-urbanist"}`}
        >
          <span style={{ color: GOLD }} className="me-2 inline-block">
            ·
          </span>
          {t("amenities360Badge")}
        </p>

        <div
          className="relative flex min-h-0 flex-1 items-center justify-center"
          style={{ perspective: 1500 }}
        >
          <motion.div
            className="relative will-change-transform"
            style={
              reduceMotion
                ? undefined
                : {
                    rotateY,
                    transformStyle: "preserve-3d",
                  }
            }
          >
            <Image
              src="/building-showcase-3d.svg"
              alt={t("amenitiesBuildingAlt")}
              width={420}
              height={560}
              unoptimized
              className="h-[min(48svh,520px)] w-auto max-w-[min(85vw,400px)] select-none"
              priority={false}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom 30% — ribbon frame */}
      <div className="flex h-[30%] min-h-0 flex-col border-t border-charcoal/[0.08] bg-white px-3 py-3 md:px-8 md:py-4">
        <p
          className={`mb-2 shrink-0 text-center font-playfair text-[11px] font-normal tracking-[0.12em] text-[#0f172a] md:mb-3 md:text-[12px] ${lang === "ar" ? "font-arabic" : ""}`}
        >
          {t("amenitiesRibbonKicker")}
        </p>
        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="flex h-full flex-wrap items-center justify-center gap-2 md:gap-2.5">
            {AMENITY_LIST_ORDER.map((key) => {
              const active = detailKey === key;
              return (
                <motion.button
                  key={key}
                  type="button"
                  onClick={() => openDetail(key)}
                  onMouseEnter={() => openDetail(key)}
                  whileHover={reduceMotion ? undefined : { y: -1 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  className={`flex max-w-[100%] items-center gap-2 rounded-[2px] border px-2.5 py-2 transition-colors md:px-3 md:py-2.5 ${
                    active
                      ? "border-charcoal/20 bg-[#FDFCF9]"
                      : "border-charcoal/[0.1] bg-white hover:border-charcoal/[0.18]"
                  }`}
                  style={{
                    boxShadow: active
                      ? `0 8px 24px rgba(15,23,42,0.06), 0 0 0 1px ${GOLD}33`
                      : undefined,
                  }}
                >
                  <span
                    className="h-1 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: GOLD }}
                    aria-hidden
                  />
                  <span
                    className={`text-start text-[9px] font-medium leading-snug tracking-wide text-[#0f172a] md:text-[10px] ${lang === "ar" ? "font-arabic" : "font-urbanist"}`}
                  >
                    {t(key)}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {detailKey ? (
          <motion.div
            key={detailKey}
            className="pointer-events-auto fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 cursor-default bg-[#0f172a]/[0.12]"
              aria-label={t("amenitiesDetailClose")}
              onClick={closeDetail}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="amenity-detail-title"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 28, filter: "blur(6px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 20, filter: "blur(4px)" }
              }
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="relative z-10 w-full max-w-md rounded-[3px] border border-charcoal/[0.08] bg-white px-6 py-6 sm:rounded-[4px] sm:px-8 sm:py-7"
              style={{
                boxShadow: `0 32px 64px rgba(15,23,42,0.12), 0 0 0 1px rgba(154,133,80,0.12)`,
              }}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <h2
                  id="amenity-detail-title"
                  className={`text-lg font-normal leading-snug tracking-tight sm:text-xl ${lang === "ar" ? "font-arabic" : "font-playfair"}`}
                  style={{ color: NAVY }}
                >
                  {t(detailKey)}
                </h2>
                <button
                  type="button"
                  onClick={closeDetail}
                  className={`shrink-0 border-b border-transparent pb-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#0f172a]/45 transition-colors hover:text-[#0f172a] ${lang === "ar" ? "font-arabic" : "font-urbanist"}`}
                >
                  {t("amenitiesDetailClose")}
                </button>
              </div>
              <p
                className={`text-[12px] font-normal leading-relaxed text-[#0f172a]/72 sm:text-[13px] ${lang === "ar" ? "font-arabic leading-[1.75]" : "font-urbanist"}`}
              >
                {t(AMENITY_DESC[detailKey])}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
