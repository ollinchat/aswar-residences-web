"use client";

import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/components/language-provider";
import {
  AMENITY_HOTSPOTS,
  type AmenityListKey,
} from "@/lib/amenity-hotspots";
import {
  CINEMATIC_BY_KEY,
  CINEMATIC_TOWER_SRC,
  TIMELINE_KEYS,
  getHotspotForKey,
} from "@/lib/amenity-cinematic";

const GOLD = "#9A8550";
const CYAN = "#6ee7ff";

/** High-speed “slam” spring — spec: stiffness 800, damping 40. */
const POWER_SPRING = {
  type: "spring" as const,
  stiffness: 800,
  damping: 40,
  mass: 0.48,
};

const SNAP_SPRING = {
  type: "spring" as const,
  stiffness: 640,
  damping: 38,
  mass: 0.42,
};

const FADE = { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const };

function metaFor(key: AmenityListKey | null) {
  if (!key) return null;
  return CINEMATIC_BY_KEY[key];
}

function ScanningTelemetry({
  active,
  floorLabel,
  reduceMotion,
}: {
  active: boolean;
  floorLabel: string;
  reduceMotion: boolean | null;
}) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!active || reduceMotion) return;
    const id = window.setInterval(() => setTick((n) => n + 1), 72);
    return () => window.clearInterval(id);
  }, [active, reduceMotion]);

  const line = useMemo(() => {
    const base = 55.2708 + (tick % 47) * 0.00013;
    const alt = 25.2048 + (tick % 61) * 0.00009;
    const z = 12 + (tick % 88);
    const sig = ((tick * 7919) % 9999).toString().padStart(4, "0");
    return { base: base.toFixed(5), alt: alt.toFixed(5), z, sig };
  }, [tick]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none mt-4 space-y-1 border border-white/[0.12] bg-black/40 px-2.5 py-2 font-mono text-[8px] leading-relaxed tracking-tight text-white/55"
      aria-hidden
    >
      <div className="flex justify-between gap-2 text-[#6ee7ff]/85">
        <span>SCAN</span>
        <span className="tabular-nums">{floorLabel}</span>
      </div>
      <div className="tabular-nums text-white/45">
        E {line.base}° N {line.alt}°
      </div>
      <div className="flex justify-between tabular-nums text-white/40">
        <span>ELV {line.z}m</span>
        <span>RNG {line.sig}</span>
      </div>
    </div>
  );
}

function AtmosphereParticles({ reduceMotion }: { reduceMotion: boolean | null }) {
  const seeds = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        i,
        l: 6 + (i * 13) % 42,
        t: 4 + (i * 17) % 88,
        d: 14 + (i * 7) % 20,
        del: (i * 0.37) % 6,
      })),
    [],
  );
  if (reduceMotion) return null;
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {seeds.map(({ i, l, t, d, del }) => (
        <span
          key={i}
          className="absolute h-0.5 w-0.5 rounded-full bg-white/50 shadow-[0_0_12px_rgba(110,231,255,0.55)]"
          style={{
            left: `${l}%`,
            top: `${t}%`,
            animation: `amenity-float-particle ${d}s ease-in-out ${del}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

export function ProjectAmenities() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const buildingZoneRef = useRef<HTMLDivElement>(null);

  const [selectedKey, setSelectedKey] = useState<AmenityListKey | null>(null);
  const [hoverHotspotKey, setHoverHotspotKey] = useState<AmenityListKey | null>(
    null,
  );
  const [flashNonce, setFlashNonce] = useState(0);

  const slamBlur = useMotionValue(0);
  const stageBlur = useTransform(slamBlur, (v) => `blur(${v}px)`);

  const mouseNorm = useMotionValue(0);
  const mouseSpring = useSpring(mouseNorm, {
    stiffness: 85,
    damping: 20,
    mass: 0.55,
  });
  const snapRotateY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.1"],
  });

  const mouseDeg = useTransform(mouseSpring, [-1, 1], [18, -18]);
  const scrollDeg = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const rotateY = useTransform(
    [mouseDeg, scrollDeg, snapRotateY],
    ([m, s, r]) => (m as number) + (s as number) + (r as number),
  );

  const focusMeta = metaFor(selectedKey);
  const focused = Boolean(selectedKey && focusMeta);
  const hotspot = selectedKey ? getHotspotForKey(selectedKey) : null;

  useEffect(() => {
    if (!focused || reduceMotion) {
      slamBlur.set(0);
      return;
    }
    slamBlur.set(reduceMotion ? 0 : 16);
    const c = animate(slamBlur, 0, {
      duration: 0.42,
      ease: [0.12, 0.9, 0.22, 1],
    });
    return () => c.stop();
  }, [selectedKey, focused, reduceMotion, flashNonce, slamBlur]);

  const selectAmenity = useCallback(
    (key: AmenityListKey) => {
      setSelectedKey(key);
      setFlashNonce((n) => n + 1);
      const spot = getHotspotForKey(key);
      if (!spot || reduceMotion) return;
      animate(snapRotateY, spot.focusRotateY, SNAP_SPRING);
    },
    [snapRotateY, reduceMotion],
  );

  const clearFocus = useCallback(() => {
    setSelectedKey(null);
    if (!reduceMotion) {
      animate(snapRotateY, 0, {
        type: "spring",
        stiffness: 320,
        damping: 32,
        mass: 0.5,
      });
    }
  }, [snapRotateY, reduceMotion]);

  const onBuildingPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const el = buildingZoneRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const half = Math.max(r.width / 2, 1);
      const nx = (e.clientX - r.left - half) / half;
      mouseNorm.set(Math.max(-1, Math.min(1, nx)));
    },
    [mouseNorm, reduceMotion],
  );

  const onBuildingPointerLeave = useCallback(() => {
    mouseNorm.set(0);
  }, [mouseNorm]);

  const selectedFloorLevel = focusMeta?.floorLevel ?? 0;

  return (
    <div
      ref={sectionRef}
      className="relative mt-20 min-h-[min(100svh,920px)] overflow-hidden border-t border-cyan-500/[0.06] py-10 md:mt-24 md:py-12"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 20%, rgba(20, 40, 72, 0.55) 0%, transparent 55%), radial-gradient(ellipse 90% 70% at 80% 100%, rgba(8, 18, 42, 0.9) 0%, transparent 50%), linear-gradient(180deg, #010308 0%, #020814 38%, #00040a 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[min(55vw,520px)] w-[min(55vw,520px)] rounded-full opacity-[0.14]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,245,220,0.5) 0%, rgba(110,231,255,0.08) 35%, transparent 70%)",
          filter: "blur(4px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden
      />

      <AnimatePresence mode="wait">
        {selectedKey && focusMeta ? (
          <motion.div
            key={selectedKey}
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={FADE}
            className="absolute inset-0 z-0"
          >
            <Image
              src={focusMeta.interiorSrc}
              alt=""
              fill
              className="object-cover opacity-[0.14] blur-3xl scale-110"
              sizes="100vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#010308]/95 via-[#030a16]/92 to-[#00040a]/96" />
          </motion.div>
        ) : (
          <motion.div
            key="ambient"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="absolute inset-0 z-0 bg-[#010308]"
          />
        )}
      </AnimatePresence>

      <AtmosphereParticles reduceMotion={reduceMotion} />

      <div className="relative z-10 mx-auto grid min-h-[min(88svh,820px)] w-full max-w-[1440px] grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-[minmax(0,1.15fr)_300px] lg:gap-12 xl:grid-cols-[minmax(0,1.2fr)_320px]">
        <div
          className="relative order-1 flex min-h-[360px] items-center justify-center lg:order-none lg:min-h-0"
          dir="ltr"
        >
          <motion.div
            layout
            layoutId="cinematic-building-stage"
            className="relative w-full max-w-[min(100%,480px)] lg:max-w-[min(100%,560px)]"
            initial={false}
            style={reduceMotion ? undefined : { filter: stageBlur }}
            animate={
              reduceMotion
                ? {}
                : {
                    scale: focusMeta?.focusScale ?? 1,
                    x: focusMeta?.focusX ?? "0%",
                    y: focusMeta?.focusY ?? "0%",
                  }
            }
            transition={POWER_SPRING}
          >
            <div
              ref={buildingZoneRef}
              onPointerMove={onBuildingPointerMove}
              onPointerLeave={onBuildingPointerLeave}
              className="relative"
              style={{ perspective: 1280 }}
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span
                  className="rounded-[2px] border px-2.5 py-1 font-mono text-[8px] font-medium uppercase tracking-[0.28em] shadow-[0_0_24px_rgba(110,231,255,0.15)]"
                  style={{
                    borderColor: `${CYAN}55`,
                    color: CYAN,
                    backgroundColor: "rgba(2,8,20,0.88)",
                  }}
                >
                  {t("amenities360Badge")}
                </span>
                {focused ? (
                  <button
                    type="button"
                    onClick={clearFocus}
                    className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-cyan-200/50 underline-offset-4 transition-colors hover:text-cyan-100/90"
                  >
                    {t("amenitiesExitFocus")}
                  </button>
                ) : null}
              </div>

              {!reduceMotion ? (
                <motion.div
                  className="pointer-events-none absolute left-[6%] right-[6%] z-[5] h-[2px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(110,231,255,0.95) 45%, rgba(154,133,80,0.9) 55%, transparent 100%)",
                    boxShadow: `0 0 28px ${CYAN}88, 0 0 8px ${GOLD}`,
                  }}
                  initial={{ top: "12%" }}
                  animate={{ top: ["8%", "90%", "8%"] }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ) : null}

              <motion.div
                className="relative mx-auto aspect-[3/5] w-[90%] sm:w-full"
                style={
                  reduceMotion
                    ? undefined
                    : {
                        rotateY,
                        transformStyle: "preserve-3d",
                      }
                }
              >
                <motion.div
                  className="relative h-full w-full"
                  animate={{
                    opacity: focused ? 0.35 : 1,
                    filter: focused ? "blur(5px) saturate(1.15)" : "blur(0px)",
                  }}
                  transition={{ duration: 0.2, ease: FADE.ease }}
                >
                  <Image
                    src={CINEMATIC_TOWER_SRC}
                    alt={t("amenitiesBuildingAlt")}
                    fill
                    className="object-contain object-center drop-shadow-[0_0_60px_rgba(110,231,255,0.22),0_40px_100px_rgba(0,0,0,0.65)]"
                    sizes="(max-width: 1024px) 90vw, 55vw"
                    priority={false}
                  />
                </motion.div>

                <AnimatePresence>
                  {focused && focusMeta && hotspot ? (
                    <motion.div
                      key={`portal-${selectedKey}`}
                      className="pointer-events-none absolute z-[30] w-[min(92%,400px)] max-w-[92vw]"
                      style={{
                        left: hotspot.left,
                        top: hotspot.top,
                        x: "-50%",
                        y: "-50%",
                      }}
                      initial={{
                        scale: 0.08,
                        opacity: 0,
                        filter: "blur(24px)",
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        scale: 0.15,
                        opacity: 0,
                        filter: "blur(16px)",
                      }}
                      transition={POWER_SPRING}
                    >
                      <div
                        className="pointer-events-auto relative overflow-hidden rounded-2xl"
                        style={{
                          boxShadow: `
                            0 0 0 1px rgba(110,231,255,0.35),
                            0 0 40px rgba(110,231,255,0.25),
                            0 0 120px rgba(154,133,80,0.12),
                            inset 0 0 0 1px rgba(255,255,255,0.12)
                          `,
                          background:
                            "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(110,231,255,0.06) 100%)",
                        }}
                      >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-cyan-400/5" />
                        <div className="relative aspect-video w-full">
                          <video
                            key={focusMeta.videoSrc}
                            className="h-full w-full object-cover"
                            poster={focusMeta.interiorSrc}
                            src={focusMeta.videoSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/5" />
                        </div>
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-cyan-300/25" />
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 z-10">
                  {AMENITY_HOTSPOTS.map(({ key, top, left }) => {
                    const spotMeta = CINEMATIC_BY_KEY[key];
                    const isSel = selectedKey === key;
                    return (
                      <div
                        key={key}
                        className="pointer-events-auto absolute z-20 -translate-x-1/2 -translate-y-1/2"
                        style={{ top, left }}
                      >
                        <motion.button
                          type="button"
                          layoutId={`hotspot-ring-${key}`}
                          aria-label={t(key)}
                          aria-pressed={isSel}
                          className="relative flex min-h-[48px] min-w-[48px] touch-manipulation items-center justify-center md:min-h-[40px] md:min-w-[40px]"
                          onClick={() => selectAmenity(key)}
                          onPointerEnter={() => setHoverHotspotKey(key)}
                          onPointerLeave={() =>
                            setHoverHotspotKey((h) =>
                              h === key ? null : h,
                            )
                          }
                          onFocus={() => setHoverHotspotKey(key)}
                          onBlur={() =>
                            setHoverHotspotKey((h) =>
                              h === key ? null : h,
                            )
                          }
                          animate={
                            isSel
                              ? {
                                  boxShadow: [
                                    `0 0 0 0 ${CYAN}00`,
                                    `0 0 32px 6px ${CYAN}77`,
                                    `0 0 0 0 ${CYAN}00`,
                                  ],
                                }
                              : {}
                          }
                          transition={
                            isSel
                              ? {
                                  duration: 0.85,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }
                              : {}
                          }
                        >
                          {isSel ? (
                            <motion.span
                              key={flashNonce}
                              className="pointer-events-none absolute inset-0 rounded-full"
                              style={{ border: `2px solid ${CYAN}` }}
                              initial={{ opacity: 0.95, scale: 1 }}
                              animate={{ opacity: 0, scale: 2.8 }}
                              transition={{
                                duration: 0.55,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            />
                          ) : null}

                          <motion.span
                            animate={
                              reduceMotion
                                ? undefined
                                : { scale: [1, 1.16, 1] }
                            }
                            transition={{
                              duration: 1.9,
                              repeat: reduceMotion ? 0 : Infinity,
                              ease: "easeInOut",
                            }}
                            className="relative"
                          >
                            <span
                              className="relative block h-3.5 w-3.5 rounded-full border md:h-3 md:w-3"
                              style={{
                                borderColor: CYAN,
                                backgroundColor: `${CYAN}35`,
                                boxShadow: `0 0 16px ${CYAN}aa, inset 0 0 8px ${GOLD}44`,
                              }}
                            />
                          </motion.span>

                          <AnimatePresence>
                            {hoverHotspotKey === key ? (
                              <motion.div
                                initial={{ opacity: 0, y: 6, scale: 0.94 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 520,
                                  damping: 36,
                                }}
                                className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-40 w-[min(11.5rem,calc(100vw-4rem))] -translate-x-1/2 overflow-hidden rounded-[3px] border border-cyan-400/25 bg-[#020814]/95 shadow-[0_24px_80px_rgba(0,0,0,0.65)] md:w-[13rem]"
                              >
                                <div className="relative aspect-[16/10] w-full">
                                  <Image
                                    src={spotMeta.interiorSrc}
                                    alt=""
                                    fill
                                    className="object-cover"
                                    sizes="208px"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#020814]/95 to-transparent" />
                                </div>
                                <p className="px-2.5 py-2 font-sans text-[9px] font-medium uppercase leading-snug tracking-[0.16em] text-white/90">
                                  {t(key)}
                                </p>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </motion.button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <aside className="order-2 flex flex-col justify-center lg:order-none">
          <header className="mb-5 border-b border-cyan-500/15 pb-4">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-serif text-xl font-light tracking-wide text-white/95 md:text-[1.35rem]">
                {t("amenitiesTitle")}
              </h3>
              <span className="font-mono text-[8px] tracking-[0.2em] text-cyan-300/50">
                ELEV
              </span>
            </div>
            <p className="mt-2 font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-white/35">
              {t("amenitiesTimelineHint")}
            </p>
          </header>

          <nav
            aria-label={t("amenitiesTitle")}
            className="relative max-h-[min(68vh,620px)] overflow-y-auto pe-1"
          >
            <div
              className="absolute start-[11px] top-1 bottom-3 w-px"
              style={{
                background:
                  "linear-gradient(180deg, rgba(110,231,255,0) 0%, rgba(110,231,255,0.35) 15%, rgba(110,231,255,0.2) 50%, rgba(110,231,255,0.35) 85%, rgba(110,231,255,0) 100%)",
                boxShadow: "0 0 12px rgba(110,231,255,0.35)",
              }}
            />
            <ul className="relative space-y-0">
              {TIMELINE_KEYS.map((key, idx) => {
                const meta = CINEMATIC_BY_KEY[key];
                const active = selectedKey === key;
                const floor = meta.floorLevel;
                const lit =
                  Boolean(selectedKey) && floor >= selectedFloorLevel;
                return (
                  <li key={key} className="relative">
                    <div className="flex gap-3 ps-0">
                      <div className="relative flex w-[22px] shrink-0 flex-col items-center pt-2">
                        <div
                          className="relative z-10 flex h-full min-h-[28px] w-full flex-col items-center"
                          aria-hidden
                        >
                          <motion.div
                            className="h-px w-6 rounded-full"
                            animate={{
                              opacity: lit ? 1 : 0.22,
                              scaleX: lit ? 1 : 0.45,
                              backgroundColor: lit
                                ? active
                                  ? `rgba(110,231,255,0.95)`
                                  : `rgba(110,231,255,0.55)`
                                : "rgba(255,255,255,0.12)",
                              boxShadow: lit
                                ? active
                                  ? `0 0 14px ${CYAN}aa, 0 0 4px ${GOLD}88`
                                  : `0 0 8px ${CYAN}44`
                                : "none",
                            }}
                            transition={
                              reduceMotion
                                ? { duration: 0 }
                                : { type: "spring", stiffness: 520, damping: 38 }
                            }
                          />
                          <motion.span
                            layoutId={`timeline-node-${key}`}
                            className="relative z-10 mt-1.5 h-2 w-2 rounded-full border"
                            style={{
                              borderColor: active
                                ? CYAN
                                : lit
                                  ? `${CYAN}66`
                                  : "rgba(255,255,255,0.2)",
                              backgroundColor: active
                                ? `${CYAN}55`
                                : lit
                                  ? `${CYAN}22`
                                  : "rgba(2,8,20,0.95)",
                              boxShadow: active
                                ? `0 0 18px ${CYAN}99`
                                : lit
                                  ? `0 0 10px ${CYAN}44`
                                  : undefined,
                            }}
                            animate={
                              active && !reduceMotion
                                ? { scale: [1, 1.25, 1] }
                                : {}
                            }
                            transition={{
                              duration: 1.1,
                              repeat: active && !reduceMotion ? Infinity : 0,
                              ease: "easeInOut",
                            }}
                          />
                        </div>
                        {idx < TIMELINE_KEYS.length - 1 ? (
                          <span
                            className="mt-0.5 block w-px flex-1 min-h-[10px] bg-gradient-to-b from-cyan-400/15 to-white/8"
                            aria-hidden
                          />
                        ) : null}
                      </div>
                      <button
                        type="button"
                        onClick={() => selectAmenity(key)}
                        className={`mb-4 w-full min-w-0 rounded-[2px] py-1.5 text-start transition-colors md:mb-5 ${
                          active
                            ? "bg-cyan-400/[0.07] ring-1 ring-cyan-400/40"
                            : "hover:bg-white/[0.03]"
                        }`}
                      >
                        <span
                          className={`block font-mono text-[9px] font-medium tabular-nums tracking-[0.12em] ${
                            lit ? "text-cyan-200/90" : "text-white/30"
                          }`}
                        >
                          {meta.floorLabel}
                        </span>
                        <span className="mt-1 block font-sans text-[10px] font-medium uppercase leading-snug tracking-[0.2em] text-white/80 sm:text-[11px]">
                          {t(key)}
                        </span>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ScanningTelemetry
            active={focused}
            floorLabel={focusMeta?.floorLabel ?? "—"}
            reduceMotion={reduceMotion}
          />
        </aside>
      </div>
    </div>
  );
}
