"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  GraduationCap,
  Play,
  ShoppingBag,
  TrainFront,
  Trees,
} from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { PartnerMarquee } from "@/components/partner-marquee";
import { HeroBackgroundVideo } from "@/components/hero-background-video";
import { EngineeringFloorPlan } from "@/components/engineering-floor-plan";
import { SamiNajamiHeritage } from "@/components/sami-najami-heritage";
import { PaymentSection } from "@/components/payment-section";
import { AboutAswarSection } from "@/components/about-aswar-section";
import { LuxuryRevealItem, LuxuryStagger } from "@/components/luxury-reveal";
import { AswarMonogramWatermark } from "@/components/aswar-monogram-watermark";
import { ProjectAmenities } from "@/components/project-amenities";
import { ProjectDevelopmentTimeline } from "@/components/project-development-timeline";
import { ResidenceGallerySlider } from "@/components/residence-gallery-slider";
import { useLang } from "@/components/language-provider";
import type { CopyKey, Lang } from "@/lib/i18n";
import { RESIDENCE_MODELS } from "@/lib/residence-models";
import type { AreaMetric } from "@/lib/area-format";
import { formatAreaRangeFromSqm, formatAreaValue } from "@/lib/area-format";
import { LUXURY_DURATION, LUXURY_EASE } from "@/lib/luxury-motion";
import {
  DISTRICT_ATTRACTIONS_ALL,
  DISTRICT_ATTRACTIONS_INITIAL,
  DISTRICT_ATTRACTIONS_PAGE,
} from "@/lib/district-attractions";
import { REMOTE_IMAGE_BLUR_DATA_URL } from "@/lib/image-blur-placeholder";
import { monthlyMortgagePayment } from "@/lib/financing-math";

const PanoramaViewerModal = dynamic(
  () =>
    import("@/components/fullscreen-360").then((m) => m.PanoramaViewerModal),
  { ssr: false },
);

const LightMap = dynamic(() => import("@/components/light-map"), {
  ssr: false,
});
const DarkMap = dynamic(() => import("@/components/dark-map"), { ssr: false });

function formatAed(n: number, lang: Lang) {
  return new Intl.NumberFormat(lang === "ar" ? "ar-AE" : "en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(n);
}

/** Compact “From AED 1.1M” for luxury tabs. */
function formatStartingFrom(minAed: number, lang: Lang) {
  const m = Math.round((minAed / 1_000_000) * 100) / 100;
  const amount = Number.isInteger(m)
    ? String(m)
    : m.toFixed(2).replace(/\.?0+$/, "");
  if (lang === "ar") {
    return `من ${amount}M د.إ`;
  }
  return `From AED ${amount}M`;
}

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function MagneticButton({
  children,
  className,
  type = "button",
  disabled,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 280, damping: 22, mass: 0.6 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.18);
    y.set((e.clientY - cy) * 0.18);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

function SectionIntro({
  title,
  subtitle,
  align = "left",
  tone = "default",
  spacing = "default",
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "default" | "onDark";
  spacing?: "default" | "spacious";
}) {
  const isDark = tone === "onDark";
  const marginBottom =
    spacing === "spacious"
      ? "mb-16 md:mb-20 lg:mb-28"
      : "mb-10 md:mb-12 lg:mb-14";
  return (
    <LuxuryStagger
      className={`${marginBottom} ${
        align === "center" ? "mx-auto max-w-3xl text-center" : ""
      }`}
    >
      <LuxuryRevealItem>
        <h2
          className={`max-w-3xl font-serif text-3xl font-extralight tracking-[0.2em] md:text-5xl md:tracking-[0.28em] ${
            isDark ? "text-white" : "text-charcoal"
          }`}
        >
          {title}
        </h2>
      </LuxuryRevealItem>
      {subtitle ? (
        <LuxuryRevealItem>
          <p
            className={`mt-6 max-w-xl font-sans text-[11px] font-extralight uppercase leading-relaxed tracking-[0.32em] ${
              isDark ? "text-white/48" : "text-charcoal/42"
            } ${align === "center" ? "mx-auto" : ""}`}
          >
            {subtitle}
          </p>
        </LuxuryRevealItem>
      ) : null}
    </LuxuryStagger>
  );
}

function ScrollBreath() {
  return (
    <div
      className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center md:bottom-10"
      style={{ position: "absolute" }}
      aria-hidden
    >
      <motion.div
        className="relative w-[0.5px] origin-bottom rounded-full bg-white/75"
        initial={{ scaleY: 0.75, opacity: 0.55 }}
        animate={{
          scaleY: [0.72, 1, 0.72],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ position: "relative", height: 52 }}
      />
    </div>
  );
}

export default function Home() {
  const { t, lang } = useLang();
  const [residenceId, setResidenceId] = useState<string>(RESIDENCE_MODELS[0].id);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerSrc, setViewerSrc] = useState("/hero-360-panorama.jpg");
  const [viewerTitle, setViewerTitle] = useState("360° Experience");
  const [viewMode, setViewMode] = useState<
    "lifestyle" | "engineering" | "financing"
  >("lifestyle");
  const [areaMetric, setAreaMetric] = useState<AreaMetric>("sqm");
  /** When null, financing uses the active unit's starting price. */
  const [financingPriceOverride, setFinancingPriceOverride] = useState<
    number | null
  >(null);
  const [downPct, setDownPct] = useState(20);
  const [ratePct, setRatePct] = useState(4.99);
  const [termYears, setTermYears] = useState(25);
  const [mapBasemap, setMapBasemap] = useState<"light" | "dark">("light");
  const [districtVisibleCount, setDistrictVisibleCount] = useState(
    DISTRICT_ATTRACTIONS_INITIAL,
  );
  const [districtExpandBaseline, setDistrictExpandBaseline] = useState<
    number | null
  >(null);
  const reduceDistrictMotion = useReducedMotion();

  const visibleDistrictAttractions = useMemo(
    () => DISTRICT_ATTRACTIONS_ALL.slice(0, districtVisibleCount),
    [districtVisibleCount],
  );
  const canLoadMoreDistrict =
    districtVisibleCount < DISTRICT_ATTRACTIONS_ALL.length;

  const loadMoreDistrict = () => {
    setDistrictExpandBaseline(visibleDistrictAttractions.length);
    setDistrictVisibleCount((n) =>
      Math.min(
        n + DISTRICT_ATTRACTIONS_PAGE,
        DISTRICT_ATTRACTIONS_ALL.length,
      ),
    );
  };

  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewerOpen]);

  const activeResidence = useMemo(
    () =>
      RESIDENCE_MODELS.find((m) => m.id === residenceId) ?? RESIDENCE_MODELS[0],
    [residenceId],
  );

  const purchasePrice =
    financingPriceOverride ?? activeResidence.booking.priceMin;

  const selectResidence = (id: string) => {
    setResidenceId(id);
    setFinancingPriceOverride(null);
  };

  const downAmount = Math.round((purchasePrice * downPct) / 100);
  const loanPrincipal = Math.max(0, purchasePrice - downAmount);
  const monthlyPayment = monthlyMortgagePayment(
    loanPrincipal,
    ratePct,
    termYears,
  );

  const open360 = (src: string, title: string) => {
    setViewerSrc(src);
    setViewerTitle(title);
    setViewerOpen(true);
  };

  return (
    <main className="relative bg-[#FAFAFA] text-charcoal selection:bg-champagne/20">
      <SiteNavbar variant="hero" />
      <PanoramaViewerModal
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        imageSrc={viewerSrc}
        title={viewerTitle}
      />

      <section className="relative h-[100dvh] min-h-[100svh] w-full overflow-hidden">
        <HeroBackgroundVideo />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/72"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,transparent_0%,rgba(0,0,0,0.35)_100%)]"
          aria-hidden
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-24 pt-20 md:pb-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.2, delayChildren: 0.15 },
              },
            }}
            className="text-center"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE },
                },
              }}
              className="font-serif text-[clamp(3rem,12vw,8.5rem)] font-extralight tracking-[0.25em] text-white md:tracking-[0.35em]"
            >
              ASWAR
            </motion.h1>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE },
                },
              }}
              className="mx-auto mt-8 h-[0.5px] w-14 bg-champagne/90"
              aria-hidden
            />
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE },
                },
              }}
              className="mt-8 font-mono text-[10px] font-extralight uppercase tracking-[0.42em] text-white/80"
            >
              {t("heroSubtitle")}
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE },
                },
              }}
              className="mt-14 flex justify-center"
            >
              <MagneticButton
                type="button"
                onClick={() =>
                  open360("/hero-360-panorama.jpg", "ASWAR 01 · Panorama")
                }
                className="inline-flex items-center gap-3 rounded-[2px] bg-white/14 px-10 py-4 font-mono text-[10px] uppercase tracking-[0.32em] text-white backdrop-blur-md transition-colors hover:bg-white/22"
              >
                <Play className="h-4 w-4" strokeWidth={1.25} />
                {t("experience360")}
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        <ScrollBreath />
      </section>

      <AboutAswarSection />

      <section
        id="the-residences"
        className="scroll-mt-24 bg-[#FFFFFF] px-6 py-32 md:px-14 md:py-40"
      >
        <div className="mx-auto max-w-[1360px]">
          <LuxuryStagger className="mb-14 md:mb-16">
            <LuxuryRevealItem>
              <p className="font-sans text-[9px] font-extralight uppercase tracking-[0.52em] text-charcoal/32">
                {t("magazineKicker")}
              </p>
            </LuxuryRevealItem>
            <LuxuryRevealItem>
              <h2 className="mt-5 max-w-2xl font-serif text-4xl font-extralight tracking-[0.2em] text-charcoal md:text-[2.85rem] md:leading-[1.1] md:tracking-[0.28em]">
                {t("residencesTitle")}
              </h2>
            </LuxuryRevealItem>
            <LuxuryRevealItem>
              <p className="mt-7 max-w-md font-sans text-[11px] font-extralight uppercase leading-relaxed tracking-[0.3em] text-charcoal/38">
                {t("residencesSubtitle")}
              </p>
            </LuxuryRevealItem>
          </LuxuryStagger>

          <div className="mb-10 border-b border-charcoal/[0.08]">
            <div className="scrollbar-none flex gap-8 overflow-x-auto pb-px md:flex-wrap md:gap-x-12 md:gap-y-6 lg:gap-x-14">
              {RESIDENCE_MODELS.map((m) => {
                const active = residenceId === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => selectResidence(m.id)}
                    className="group relative shrink-0 pb-4 text-start transition-opacity hover:opacity-90"
                  >
                    <span
                      className={`block font-sans text-[13px] font-semibold tracking-[0.12em] transition-colors ${
                        active ? "text-charcoal" : "text-charcoal/45"
                      }`}
                    >
                      {m.label}
                    </span>
                    <span className="mt-1.5 block font-sans text-[11px] font-normal tracking-[0.06em] text-charcoal/32">
                      {formatStartingFrom(m.booking.priceMin, lang)}
                    </span>
                    {active ? (
                      <motion.span
                        layoutId="residence-tab-underline"
                        className="absolute inset-x-0 bottom-0 h-px bg-charcoal"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 34,
                        }}
                      />
                    ) : (
                      <span className="absolute inset-x-0 bottom-0 h-px bg-transparent group-hover:bg-charcoal/10" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={`${residenceId}-${viewMode}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-start gap-12 lg:grid-cols-[minmax(0,65fr)_minmax(0,35fr)] lg:gap-14"
            >
              <div className="min-w-0">
                {viewMode === "financing" ? (
                  <div className="space-y-6 rounded-[2px] border border-charcoal/[0.08] bg-[#FAFAFA] p-6 md:p-8">
                    <div>
                      <p className="font-sans text-[9px] font-medium uppercase tracking-[0.28em] text-charcoal/38">
                        {t("financingTitle")}
                      </p>
                      <p className="mt-3 max-w-md font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.2em] text-charcoal/45">
                        {t("financingSubtitle")}
                      </p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block space-y-2">
                        <span className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-charcoal/40">
                          {t("financingPurchasePrice")}
                        </span>
                        <input
                          type="number"
                          min={500_000}
                          step={50_000}
                          value={purchasePrice}
                          onChange={(e) =>
                            setFinancingPriceOverride(
                              Math.max(0, Number(e.target.value) || 0),
                            )
                          }
                          className="w-full rounded-[2px] border border-charcoal/[0.12] bg-white px-3 py-2.5 font-sans text-sm tabular-nums text-charcoal outline-none ring-0 transition-shadow focus:border-charcoal/35"
                        />
                      </label>
                      <label className="block space-y-2">
                        <span className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-charcoal/40">
                          {t("financingDownPayment")} ({downPct}%)
                        </span>
                        <input
                          type="range"
                          min={15}
                          max={50}
                          step={1}
                          value={downPct}
                          onChange={(e) =>
                            setDownPct(Number(e.target.value))
                          }
                          className="mt-3 w-full accent-charcoal"
                        />
                      </label>
                      <label className="block space-y-2">
                        <span className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-charcoal/40">
                          {t("financingRate")}
                        </span>
                        <input
                          type="number"
                          min={0}
                          max={15}
                          step={0.05}
                          value={ratePct}
                          onChange={(e) =>
                            setRatePct(Number(e.target.value) || 0)
                          }
                          className="w-full rounded-[2px] border border-charcoal/[0.12] bg-white px-3 py-2.5 font-sans text-sm tabular-nums text-charcoal outline-none focus:border-charcoal/35"
                        />
                      </label>
                      <label className="block space-y-2">
                        <span className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-charcoal/40">
                          {t("financingTerm")}
                        </span>
                        <select
                          value={termYears}
                          onChange={(e) =>
                            setTermYears(Number(e.target.value))
                          }
                          className="w-full rounded-[2px] border border-charcoal/[0.12] bg-white px-3 py-2.5 font-sans text-sm text-charcoal outline-none focus:border-charcoal/35"
                        >
                          {[20, 25, 30].map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div className="border-t border-charcoal/[0.08] pt-6">
                      <dl className="grid gap-3 sm:grid-cols-3">
                        <div>
                          <dt className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/35">
                            {t("financingDownPayment")}
                          </dt>
                          <dd className="mt-1 font-serif text-lg font-light tabular-nums text-charcoal">
                            {formatAed(downAmount, lang)}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/35">
                            {t("financingLoanPrincipal")}
                          </dt>
                          <dd className="mt-1 font-serif text-lg font-light tabular-nums text-charcoal">
                            {formatAed(loanPrincipal, lang)}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/35">
                            {t("financingMonthly")}
                          </dt>
                          <dd className="mt-1 font-serif text-2xl font-light tabular-nums tracking-tight text-charcoal">
                            {formatAed(Math.round(monthlyPayment), lang)}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                ) : viewMode === "lifestyle" ? (
                  <ResidenceGallerySlider
                    images={activeResidence.images}
                    label={activeResidence.label}
                    objectFit="contain"
                    on360={() =>
                      open360(
                        activeResidence.pano,
                        `${activeResidence.label} · 360°`,
                      )
                    }
                  />
                ) : (
                  <div className="overflow-hidden rounded-[2px] border border-charcoal/[0.06] bg-white">
                    <EngineeringFloorPlan unitId={activeResidence.id} />
                  </div>
                )}
              </div>

              <aside className="min-w-0 space-y-10 lg:sticky lg:top-28 lg:self-start">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode("lifestyle")}
                    className={`rounded-[2px] px-4 py-2 font-sans text-[9px] font-medium uppercase tracking-[0.22em] transition-colors ${
                      viewMode === "lifestyle"
                        ? "border border-charcoal/15 bg-[#0a0a0a]/90 text-white backdrop-blur-xl"
                        : "text-charcoal/42 ring-1 ring-charcoal/[0.1] hover:text-charcoal"
                    }`}
                  >
                    {t("lifestyleGallery")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("engineering")}
                    className={`rounded-[2px] px-4 py-2 font-sans text-[9px] font-medium uppercase tracking-[0.22em] transition-colors ${
                      viewMode === "engineering"
                        ? "border border-charcoal/15 bg-[#0a0a0a]/90 text-white backdrop-blur-xl"
                        : "text-charcoal/42 ring-1 ring-charcoal/[0.1] hover:text-charcoal"
                    }`}
                  >
                    {t("technicalBlueprint")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("financing")}
                    className={`rounded-[2px] px-4 py-2 font-sans text-[9px] font-medium uppercase tracking-[0.22em] transition-colors ${
                      viewMode === "financing"
                        ? "border border-charcoal/15 bg-[#0a0a0a]/90 text-white backdrop-blur-xl"
                        : "text-charcoal/42 ring-1 ring-charcoal/[0.1] hover:text-charcoal"
                    }`}
                  >
                    {t("financingTitle")}
                  </button>
                </div>

                <div>
                  <h3 className="font-serif text-[clamp(1.85rem,3.2vw,2.85rem)] font-light leading-[1.06] tracking-tight text-charcoal">
                    {activeResidence.label}
                  </h3>
                  <p className="mt-4 font-sans text-[10px] font-medium uppercase leading-relaxed tracking-[0.24em] text-charcoal/38">
                    {activeResidence.booking.availableUnits} {t("remainingOf")}{" "}
                    {activeResidence.booking.totalUnits} {t("remaining")}
                  </p>
                  <div className="mt-8 space-y-1">
                    <p className="font-sans text-[9px] font-medium uppercase tracking-[0.28em] text-charcoal/32">
                      {t("priceStartingLabel")}
                    </p>
                    <p className="font-serif text-[clamp(1.75rem,2.8vw,2.35rem)] font-light tabular-nums tracking-tight text-charcoal">
                      {formatAed(activeResidence.booking.priceMin, lang)}
                    </p>
                    <p className="font-serif text-lg font-light tabular-nums text-charcoal/42">
                      — {formatAed(activeResidence.booking.priceMax, lang)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-charcoal/[0.08] pt-6">
                  <div
                    className="mx-auto w-full max-w-xl rounded-[2px] border border-white/10 bg-[#0a0a0a]/90 px-2.5 py-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:px-4 sm:py-1"
                    role="list"
                  >
                    <div
                      role="listitem"
                      className="flex min-h-[52px] items-center justify-between gap-3 border-b border-white/10 px-1.5 transition-colors hover:bg-white/5 sm:gap-4 sm:px-2"
                    >
                      <span className="max-w-[46%] font-serif text-[10px] font-medium uppercase tracking-widest text-white/60 rtl:max-w-[50%] rtl:font-arabic rtl:normal-case rtl:tracking-wide rtl:leading-[1.72]">
                        {t("totalArea")}
                      </span>
                      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 rtl:justify-start">
                        <span className="text-end font-sans text-[11px] font-medium tabular-nums text-white rtl:text-start rtl:font-arabic rtl:leading-[1.72]">
                          {formatAreaRangeFromSqm(
                            activeResidence.areaSqm.min,
                            activeResidence.areaSqm.max,
                            areaMetric,
                            lang,
                          )}
                        </span>
                        <div
                          className="inline-flex shrink-0 rounded-[2px] bg-zinc-950/35 p-0.5 ring-1 ring-zinc-400/25"
                          role="group"
                          aria-label="Area unit"
                        >
                          <button
                            type="button"
                            onClick={() => setAreaMetric("sqm")}
                            className={`rounded-[1px] px-2.5 py-1 font-sans text-[8px] font-medium uppercase tracking-[0.16em] transition-colors sm:px-3 sm:text-[9px] ${
                              areaMetric === "sqm"
                                ? "bg-white text-charcoal"
                                : "text-zinc-300 hover:text-zinc-100"
                            }`}
                          >
                            {t("metricSqm")}
                          </button>
                          <button
                            type="button"
                            onClick={() => setAreaMetric("sqft")}
                            className={`rounded-[1px] px-2.5 py-1 font-sans text-[8px] font-medium uppercase tracking-[0.16em] transition-colors sm:px-3 sm:text-[9px] ${
                              areaMetric === "sqft"
                                ? "bg-white text-charcoal"
                                : "text-zinc-300 hover:text-zinc-100"
                            }`}
                          >
                            {t("metricSqft")}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      role="listitem"
                      className="flex min-h-[52px] items-center justify-between gap-3 border-b border-white/10 px-1.5 transition-colors hover:bg-white/5 sm:gap-4 sm:px-2"
                    >
                      <span className="max-w-[46%] font-serif text-[10px] font-medium uppercase tracking-widest text-white/60 rtl:max-w-[50%] rtl:font-arabic rtl:normal-case rtl:tracking-wide rtl:leading-[1.72]">
                        {t("balcony")}
                      </span>
                      <span className="text-end font-sans text-[11px] font-medium tabular-nums text-white rtl:text-start rtl:font-arabic rtl:leading-[1.72]">
                        {formatAreaValue(
                          activeResidence.areas.balconySqft,
                          areaMetric,
                          lang,
                        )}
                      </span>
                    </div>

                    <div
                      role="listitem"
                      className="flex min-h-[52px] items-center justify-between gap-3 border-b border-white/10 px-1.5 transition-colors hover:bg-white/5 sm:gap-4 sm:px-2"
                    >
                      <span className="max-w-[46%] font-serif text-[10px] font-medium uppercase tracking-widest text-white/60 rtl:max-w-[50%] rtl:font-arabic rtl:normal-case rtl:tracking-wide rtl:leading-[1.72]">
                        {t("residenceLblGarden")}
                      </span>
                      <span className="text-end font-sans text-[11px] font-medium tabular-nums text-white rtl:text-start rtl:font-arabic rtl:leading-[1.72]">
                        {activeResidence.spatial.gardenSqft != null
                          ? formatAreaValue(
                              activeResidence.spatial.gardenSqft,
                              areaMetric,
                              lang,
                            )
                          : t("specNotApplicable")}
                      </span>
                    </div>

                    <div
                      role="listitem"
                      className="flex min-h-[52px] items-center justify-between gap-3 border-b border-white/10 px-1.5 transition-colors hover:bg-white/5 sm:gap-4 sm:px-2"
                    >
                      <span className="max-w-[46%] font-serif text-[10px] font-medium uppercase tracking-widest text-white/60 rtl:max-w-[50%] rtl:font-arabic rtl:normal-case rtl:tracking-wide rtl:leading-[1.72]">
                        {t("residenceLblKitchen")}
                      </span>
                      <span className="text-end font-sans text-[11px] font-medium tabular-nums text-white rtl:text-start rtl:font-arabic rtl:leading-[1.72]">
                        {formatAreaValue(
                          activeResidence.spatial.kitchenSqft,
                          areaMetric,
                          lang,
                        )}
                      </span>
                    </div>

                    <div
                      role="listitem"
                      className="flex min-h-[52px] items-center justify-between gap-3 border-b border-white/10 px-1.5 transition-colors hover:bg-white/5 sm:gap-4 sm:px-2"
                    >
                      <span className="max-w-[46%] font-serif text-[10px] font-medium uppercase tracking-widest text-white/60 rtl:max-w-[50%] rtl:font-arabic rtl:normal-case rtl:tracking-wide rtl:leading-[1.72]">
                        {t("residenceLblLivingRoom")}
                      </span>
                      <span className="text-end font-sans text-[11px] font-medium tabular-nums text-white rtl:text-start rtl:font-arabic rtl:leading-[1.72]">
                        {formatAreaValue(
                          activeResidence.spatial.livingSqft,
                          areaMetric,
                          lang,
                        )}
                      </span>
                    </div>

                    <div
                      role="listitem"
                      className="flex min-h-[52px] items-center justify-between gap-3 border-b border-white/10 px-1.5 transition-colors hover:bg-white/5 sm:gap-4 sm:px-2"
                    >
                      <span className="max-w-[46%] font-serif text-[10px] font-medium uppercase tracking-widest text-white/60 rtl:max-w-[50%] rtl:font-arabic rtl:normal-case rtl:tracking-wide rtl:leading-[1.72]">
                        {t("residenceLblMasterBedroom")}
                      </span>
                      <span className="text-end font-sans text-[11px] font-medium tabular-nums text-white rtl:text-start rtl:font-arabic rtl:leading-[1.72]">
                        {formatAreaValue(
                          activeResidence.spatial.masterBedSqft,
                          areaMetric,
                          lang,
                        )}
                      </span>
                    </div>

                    <div
                      role="listitem"
                      className="flex min-h-[52px] items-center justify-between gap-3 px-1.5 transition-colors hover:bg-white/5 sm:gap-4 sm:px-2"
                    >
                      <span className="max-w-[46%] font-serif text-[10px] font-medium uppercase tracking-widest text-white/60 rtl:max-w-[50%] rtl:font-arabic rtl:normal-case rtl:tracking-wide rtl:leading-[1.72]">
                        {t("residenceLblAdditionalBedrooms")}
                      </span>
                      <span className="text-end font-sans text-[11px] font-medium tabular-nums text-white rtl:text-start rtl:font-arabic rtl:leading-[1.72]">
                        {activeResidence.spatial.additionalBedroomsSqft != null
                          ? formatAreaValue(
                              activeResidence.spatial.additionalBedroomsSqft,
                              areaMetric,
                              lang,
                            )
                          : t("specNotApplicable")}
                      </span>
                    </div>
                  </div>
                </div>

                {viewMode === "financing" ? (
                  <div className="space-y-4 border-t border-charcoal/[0.08] pt-8">
                    <p className="font-sans text-[11px] font-normal leading-relaxed text-charcoal/48">
                      {t("financingDisclaimer")}
                    </p>
                    <a
                      href={`mailto:sales@aswar.ae?subject=${encodeURIComponent(
                        `Finance quote — ASWAR 01 — ${activeResidence.label}`,
                      )}`}
                      className="inline-flex w-full items-center justify-center rounded-[2px] border border-white/15 bg-[#0a0a0a]/90 px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white backdrop-blur-xl transition-colors hover:bg-zinc-950/80"
                    >
                      {t("financingCta")}
                    </a>
                  </div>
                ) : null}
              </aside>
            </motion.article>
          </AnimatePresence>

          <ProjectAmenities />

          <ProjectDevelopmentTimeline />
        </div>
      </section>

      <section className="bg-[#FFFFFF] px-6 py-32 md:px-12 md:py-40">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            title={t("paymentTitle")}
            subtitle={t("paymentSubtitle")}
            align="center"
          />

          <PaymentSection
            initialPurchasePrice={
              RESIDENCE_MODELS.find((m) => m.id === "2br")?.booking.priceMin ??
              RESIDENCE_MODELS[0].booking.priceMin
            }
            currency="AED"
          />
        </div>
      </section>

      <section
        id="district-highlights"
        className="scroll-mt-24 bg-[#FAFAFA] px-6 py-32 md:px-12 md:py-40"
      >
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            title={t("districtTitle")}
            subtitle={t("districtSubtitle")}
            spacing="spacious"
          />
          <div className="grid grid-cols-2 gap-6 gap-y-10 md:gap-8 md:gap-y-12 lg:grid-cols-3 lg:gap-10 lg:gap-y-14">
            {visibleDistrictAttractions.map((img, idx) => {
              const from = districtExpandBaseline;
              const isNew = from != null && idx >= from;
              return (
                <motion.article
                  key={img.src}
                  className="group flex min-h-0 flex-col gap-5 md:gap-6"
                  initial={
                    isNew
                      ? { opacity: 0, y: 22 }
                      : false
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduceDistrictMotion
                      ? { duration: 0.2 }
                      : {
                          type: "spring",
                          stiffness: 280,
                          damping: 26,
                          delay: isNew ? (idx - from) * 0.055 : 0,
                        }
                  }
                >
                  <div
                    className="relative aspect-[3/4] w-full overflow-hidden rounded-[4px] bg-neutral-100"
                    style={{ position: "relative" }}
                  >
                    <motion.div
                      className="relative h-full w-full origin-center will-change-transform"
                      style={{ position: "relative" }}
                      whileHover={
                        reduceDistrictMotion ? undefined : { scale: 1.02 }
                      }
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                        className="object-cover object-center"
                        priority={idx < 4}
                        placeholder="blur"
                        blurDataURL={REMOTE_IMAGE_BLUR_DATA_URL}
                      />
                    </motion.div>
                  </div>
                  <div className="flex flex-col gap-1.5 px-0.5 pt-1 md:pt-2">
                    <p
                      className={`font-urbanist text-[10px] font-extralight leading-relaxed tracking-[0.2em] text-charcoal/45 ${lang === "ar" ? "font-arabic tracking-normal" : "uppercase"}`}
                    >
                      {t(img.kickerKey)}
                    </p>
                    <h3
                      className={`text-[18px] font-medium leading-snug tracking-normal text-charcoal ${lang === "ar" ? "font-arabic" : "font-playfair"}`}
                    >
                      {t(img.titleKey)}
                    </h3>
                    <p
                      className={`mt-2 text-[11px] font-extralight leading-relaxed text-charcoal/52 ${lang === "ar" ? "font-arabic" : "font-urbanist"}`}
                    >
                      {t(img.descKey)}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {canLoadMoreDistrict ? (
            <div className="mt-8 flex justify-center md:mt-10">
              <button
                type="button"
                onClick={loadMoreDistrict}
                className="rounded-full border border-charcoal/22 bg-transparent px-10 py-2.5 font-serif text-[10px] font-medium uppercase tracking-[0.32em] text-charcoal/55 transition-all duration-300 ease-out hover:border-charcoal/40 hover:bg-charcoal/[0.02] hover:text-charcoal"
              >
                {t("districtLoadMore")}
              </button>
            </div>
          ) : null}

          <div className="mt-12 grid grid-cols-2 gap-5 md:mt-14 md:grid-cols-4 md:gap-6">
            {(
              [
                {
                  Icon: GraduationCap,
                  label: "proxSchools" as const,
                  mins: "proxSchoolsMins" as const,
                },
                {
                  Icon: ShoppingBag,
                  label: "proxShopping" as const,
                  mins: "proxShoppingMins" as const,
                },
                {
                  Icon: Trees,
                  label: "proxParks" as const,
                  mins: "proxParksMins" as const,
                },
                {
                  Icon: TrainFront,
                  label: "proxMetro" as const,
                  mins: "proxMetroMins" as const,
                },
              ] as const
            ).map(({ Icon, label, mins }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-[2px] border border-charcoal/[0.08] bg-white px-4 py-6 text-center"
              >
                <Icon
                  className="h-9 w-9 text-charcoal"
                  strokeWidth={1}
                  aria-hidden
                />
                <p className="mt-4 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal">
                  {t(label)}
                </p>
                <p className="mt-2 font-serif text-sm font-light text-charcoal/55">
                  {t(mins)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`relative overflow-hidden px-6 py-32 transition-colors duration-300 md:px-12 md:py-40 ${
          mapBasemap === "dark" ? "bg-[#1a1a1a]" : "bg-[#ebebeb]"
        }`}
        style={{ position: "relative" }}
      >
        <AswarMonogramWatermark />
        <div className="relative z-[1] mx-auto max-w-6xl">
          <SectionIntro
            title={t("locationTitle")}
            subtitle={t("locationSubtitle")}
            tone={mapBasemap === "dark" ? "onDark" : "default"}
          />
          <div className="mb-4 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => setMapBasemap("light")}
              className={`rounded-[2px] px-3 py-1.5 font-sans text-[9px] font-medium uppercase tracking-[0.2em] transition-colors ${
                mapBasemap === "light"
                  ? "border border-charcoal/12 bg-[#0a0a0a]/90 text-white backdrop-blur-xl"
                  : mapBasemap === "dark"
                    ? "text-white/55 ring-1 ring-white/15 hover:text-white"
                    : "text-charcoal/42 ring-1 ring-charcoal/[0.1] hover:text-charcoal"
              }`}
            >
              {t("mapBasemapLight")}
            </button>
            <button
              type="button"
              onClick={() => setMapBasemap("dark")}
              className={`rounded-[2px] px-3 py-1.5 font-sans text-[9px] font-medium uppercase tracking-[0.2em] transition-colors ${
                mapBasemap === "dark"
                  ? "bg-white text-charcoal"
                  : "text-charcoal/42 ring-1 ring-charcoal/[0.1] hover:text-charcoal"
              }`}
            >
              {t("mapBasemapDark")}
            </button>
          </div>
          <div
            className={`overflow-hidden rounded-none transition-colors duration-300 ${
              mapBasemap === "dark" ? "bg-[#1c1c1c]" : "bg-[#ebebeb]"
            }`}
          >
            {mapBasemap === "light" ? (
              <LightMap key="map-light" />
            ) : (
              <DarkMap key="map-dark" />
            )}
          </div>
          <p
            className={`mt-8 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] transition-colors ${
              mapBasemap === "dark" ? "text-white/45" : "text-charcoal/40"
            }`}
          >
            {t("locationMapCaption")}
          </p>
        </div>
      </section>

      <PartnerMarquee />

      <SamiNajamiHeritage />

      <footer id="contact" className="border-t border-charcoal/[0.06] bg-[#FAFAFA] px-8 py-20 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-4 md:gap-12">
          <div className="space-y-8 md:col-span-2">
            <div className="font-serif text-lg font-extralight tracking-[0.3em] text-charcoal">
              ASWAR
            </div>
            <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-charcoal/40">
              {t("footerDev")}
              <br />
              {t("footerLine")}
            </p>
          </div>
          <div className="space-y-5">
            <h4 className="font-serif text-xs font-normal uppercase tracking-[0.2em] text-charcoal/50">
              {t("headquarters")}
            </h4>
            <p className="font-mono text-[11px] uppercase leading-loose tracking-wider text-charcoal/45">
              {t("headquartersAddress")}
              <br />
              United Arab Emirates
            </p>
          </div>
          <div className="space-y-5">
            <h4 className="font-serif text-xs font-normal uppercase tracking-[0.2em] text-charcoal/50">
              {t("inquiries")}
            </h4>
            <p className="font-mono text-[11px] uppercase leading-loose tracking-wider text-charcoal/45 transition-colors hover:text-charcoal">
              <a href="mailto:sales@aswar.ae">sales@aswar.ae</a>
              <br />
              <a href="tel:+971000000000">+971 (0) 4 000 0000</a>
            </p>
          </div>
        </div>
        <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-mono text-[9px] uppercase tracking-widest text-charcoal/30">
            © 2026 {t("footerDev")}. All rights reserved.
          </p>
          <div className="flex gap-10 font-mono text-[9px] uppercase tracking-widest text-charcoal/30">
            <a href="#" className="transition-colors hover:text-charcoal">
              {t("privacy")}
            </a>
            <a href="#" className="transition-colors hover:text-charcoal">
              {t("terms")}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
