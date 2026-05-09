"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Play } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { PartnerMarquee } from "@/components/partner-marquee";
import { EngineeringFloorPlan } from "@/components/engineering-floor-plan";
import { useLang } from "@/components/language-provider";
import type { Lang } from "@/lib/i18n";

const PanoramaViewerModal = dynamic(
  () =>
    import("@/components/fullscreen-360").then((m) => m.PanoramaViewerModal),
  { ssr: false },
);

const DarkMap = dynamic(() => import("@/components/dark-map"), { ssr: false });

type PriceBand = "all" | "under2" | "2-4" | "over4";

type ResidenceModel = {
  id: string;
  label: string;
  specs: {
    totalArea: string;
    balcony: string;
    parking: string;
  };
  images: string[];
  pano: string;
  booking: {
    availableUnits: number;
    totalUnits: number;
    priceMin: number;
    priceMax: number;
  };
};

const RESIDENCE_MODELS: ResidenceModel[] = [
  {
    id: "studio",
    label: "Studio",
    specs: {
      totalArea: "548 SQ.FT",
      balcony: "52 SQ.FT",
      parking: "1 Reserved bay",
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=88",
    ],
    pano: "/hero-360-panorama.jpg",
    booking: { availableUnits: 14, totalUnits: 42, priceMin: 1_100_000, priceMax: 1_550_000 },
  },
  {
    id: "1br",
    label: "1BR",
    specs: {
      totalArea: "892 SQ.FT",
      balcony: "118 SQ.FT",
      parking: "1 Reserved bay",
    },
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=88",
    ],
    pano: "/hero-360-panorama.jpg",
    booking: { availableUnits: 11, totalUnits: 56, priceMin: 1_650_000, priceMax: 2_350_000 },
  },
  {
    id: "2br",
    label: "2BR",
    specs: {
      totalArea: "1,420 SQ.FT",
      balcony: "186 SQ.FT",
      parking: "2 Reserved bays",
    },
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1800&q=88",
    ],
    pano: "/hero-360-panorama.jpg",
    booking: { availableUnits: 9, totalUnits: 48, priceMin: 2_750_000, priceMax: 3_950_000 },
  },
  {
    id: "3br",
    label: "3BR",
    specs: {
      totalArea: "2,180 SQ.FT",
      balcony: "240 SQ.FT",
      parking: "2 Reserved bays",
    },
    images: [
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1800&q=88",
    ],
    pano: "/hero-360-panorama.jpg",
    booking: { availableUnits: 6, totalUnits: 32, priceMin: 4_100_000, priceMax: 5_850_000 },
  },
  {
    id: "penthouse",
    label: "Penthouse",
    specs: {
      totalArea: "4,850 SQ.FT",
      balcony: "620 SQ.FT",
      parking: "3 Reserved bays",
    },
    images: [
      "https://images.unsplash.com/photo-1600047509355-9dc75507daeb?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=88",
    ],
    pano: "/hero-360-panorama.jpg",
    booking: { availableUnits: 3, totalUnits: 8, priceMin: 8_200_000, priceMax: 16_500_000 },
  },
];

const PAYMENT_PHASES = [
  {
    pct: "20",
    title: "Down payment",
    when: "On booking",
    body: "Initial capital allocation secures your position and activates the sales agreement under RERA-registered escrow protocols.",
    bullets: ["Executes reservation & KYC", "Applied to final purchase price"],
  },
  {
    pct: "40",
    title: "During construction",
    when: "Milestone-linked",
    body: "Progressive instalments mirror certified construction stages — aligned with engineer sign-off and programme transparency.",
    bullets: ["Tied to structural milestones", "Disclosed schedule pre-commitment"],
  },
  {
    pct: "40",
    title: "On handover",
    when: "Completion",
    body: "Final balance due at practical completion and key release, following snagging clearance and authority approvals.",
    bullets: ["Title readiness coordination", "Move-in concierge available"],
  },
];

function matchesPriceBand(m: ResidenceModel, band: PriceBand): boolean {
  if (band === "all") return true;
  const lo = m.booking.priceMin;
  const hi = m.booking.priceMax;
  if (band === "under2") return hi <= 2_000_000;
  if (band === "2-4") return lo <= 4_000_000 && hi >= 1_800_000;
  if (band === "over4") return lo >= 3_800_000;
  return true;
}

function formatAed(n: number, lang: Lang) {
  return new Intl.NumberFormat(lang === "ar" ? "ar-AE" : "en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(n);
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
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`mb-24 md:mb-32 lg:mb-40 ${
        align === "center" ? "mx-auto max-w-3xl text-center" : ""
      }`}
    >
      <h2 className="max-w-3xl font-serif text-3xl font-medium tracking-tight text-charcoal md:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-10 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.25em] text-charcoal/45 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function ScrollBreath() {
  return (
    <div
      className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center md:bottom-10"
      aria-hidden
    >
      <motion.div
        className="w-[0.5px] origin-bottom rounded-full bg-white/75"
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
        style={{ height: 52 }}
      />
    </div>
  );
}

export default function Home() {
  const { t, lang } = useLang();
  const [residenceId, setResidenceId] = useState<string>(RESIDENCE_MODELS[2].id);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerSrc, setViewerSrc] = useState("/hero-360-panorama.jpg");
  const [viewerTitle, setViewerTitle] = useState("360° Experience");
  const [viewMode, setViewMode] = useState<"lifestyle" | "engineering">(
    "lifestyle",
  );
  const [priceBand, setPriceBand] = useState<PriceBand>("all");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [typesFilter, setTypesFilter] = useState<Set<string>>(
    () => new Set(RESIDENCE_MODELS.map((m) => m.id)),
  );

  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewerOpen]);

  const filteredModels = useMemo(
    () =>
      RESIDENCE_MODELS.filter((m) => {
        if (!typesFilter.has(m.id)) return false;
        if (availableOnly && m.booking.availableUnits === 0) return false;
        return matchesPriceBand(m, priceBand);
      }),
    [typesFilter, availableOnly, priceBand],
  );

  const activeResidenceId = useMemo(() => {
    if (filteredModels.some((m) => m.id === residenceId)) return residenceId;
    return filteredModels[0]?.id ?? RESIDENCE_MODELS[0].id;
  }, [filteredModels, residenceId]);

  const activeResidence =
    RESIDENCE_MODELS.find((m) => m.id === activeResidenceId) ??
    RESIDENCE_MODELS[0];

  const bookingSummary = useMemo(() => {
    if (filteredModels.length === 0) {
      return { avail: 0, pMin: 0, pMax: 0 };
    }
    const avail = filteredModels.reduce(
      (s, m) => s + m.booking.availableUnits,
      0,
    );
    const pMin = Math.min(...filteredModels.map((m) => m.booking.priceMin));
    const pMax = Math.max(...filteredModels.map((m) => m.booking.priceMax));
    return { avail, pMin, pMax };
  }, [filteredModels]);

  const open360 = (src: string, title: string) => {
    setViewerSrc(src);
    setViewerTitle(title);
    setViewerOpen(true);
  };

  const toggleTypeFilter = (id: string) => {
    setTypesFilter((prev) => {
      const n = new Set(prev);
      if (n.has(id) && n.size === 1) return prev;
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  return (
    <main className="bg-[#FAFAFA] text-charcoal selection:bg-champagne/20">
      <SiteNavbar variant="hero" />
      <PanoramaViewerModal
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        imageSrc={viewerSrc}
        title={viewerTitle}
      />

      <section className="relative h-[100dvh] min-h-[100svh] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.png"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/72"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,transparent_0%,rgba(0,0,0,0.35)_100%)]"
          aria-hidden
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-32 pt-24 md:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="font-serif text-[clamp(3rem,12vw,8.5rem)] font-light tracking-[0.22em] text-white md:tracking-[0.3em]">
              ASWAR
            </h1>
            <div
              className="mx-auto mt-8 h-[0.5px] w-14 bg-champagne/90"
              aria-hidden
            />
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.42em] text-white/80">
              {t("heroSubtitle")}
            </p>
            <div className="mt-14 flex justify-center">
              <MagneticButton
                type="button"
                onClick={() =>
                  open360("/hero-360-panorama.jpg", "ASWAR 01 · Panorama")
                }
                className="inline-flex items-center gap-3 rounded-[4px] bg-white/14 px-10 py-4 font-mono text-[10px] uppercase tracking-[0.32em] text-white backdrop-blur-md transition-colors hover:bg-white/22"
              >
                <Play className="h-4 w-4" strokeWidth={1.25} />
                {t("experience360")}
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        <ScrollBreath />
      </section>

      <section
        id="the-residences"
        className="scroll-mt-28 px-6 py-48 md:px-12 md:py-56 lg:py-64"
      >
        <div className="mx-auto max-w-[1500px]">
          <SectionIntro
            title={t("residencesTitle")}
            subtitle={t("residencesSubtitle")}
          />

          <div className="mb-14 rounded-[4px] bg-white p-8 shadow-[0_1px_0_rgba(26,28,30,0.06)] md:p-10">
            <div className="mb-10 hidden gap-0 md:grid md:grid-cols-4">
              {(
                [
                  [1, t("stepTypes")],
                  [2, t("stepBudget")],
                  [3, t("stepOptions")],
                  [4, t("stepLayout")],
                ] as const
              ).map(([n, label], i) => (
                <div
                  key={n}
                  className={`relative flex items-center gap-3 px-2 ${i < 3 ? "after:absolute after:right-0 after:top-1/2 after:h-px after:w-[calc(100%-2rem)] after:-translate-y-1/2 after:translate-x-1/2 after:bg-charcoal/10" : ""}`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-charcoal/[0.06] font-mono text-[10px] text-charcoal/70">
                    {n}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/45">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <div>
                <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.35em] text-charcoal/35">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[8px] text-white md:hidden">
                    1
                  </span>
                  {t("unitTypes")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {RESIDENCE_MODELS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => toggleTypeFilter(m.id)}
                      className={`rounded-[4px] px-4 py-2 font-mono text-[9px] uppercase tracking-widest transition-colors ${
                        typesFilter.has(m.id)
                          ? "bg-charcoal text-white"
                          : "bg-charcoal/[0.04] text-charcoal/40 hover:bg-charcoal/[0.08] hover:text-charcoal/70"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.35em] text-charcoal/35">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[8px] text-white md:hidden">
                    2
                  </span>
                  {t("priceBand")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(
                    [
                      ["all", "All"],
                      ["under2", "≤ 2M"],
                      ["2-4", "2M – 4M"],
                      ["over4", "4M+"],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPriceBand(id)}
                      className={`rounded-[4px] px-4 py-2 font-mono text-[9px] uppercase tracking-widest transition-colors ${
                        priceBand === id
                          ? "bg-charcoal text-white"
                          : "bg-charcoal/[0.04] text-charcoal/45 hover:bg-charcoal/[0.08]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-end lg:col-span-1">
                <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.35em] text-charcoal/35">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[8px] text-white md:hidden">
                    3
                  </span>
                  {t("stepOptions")}
                </p>
                <label className="mt-4 flex cursor-pointer items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-charcoal/50">
                  <input
                    type="checkbox"
                    checked={availableOnly}
                    onChange={(e) => setAvailableOnly(e.target.checked)}
                    className="h-3.5 w-3.5 rounded-[3px] border-0 accent-charcoal"
                  />
                  {t("availableOnly")}
                </label>
              </div>
              <div className="flex flex-col justify-end border-t border-charcoal/[0.06] pt-8 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-charcoal/50 lg:border-t-0 lg:pt-0">
                <p className="mb-1 flex items-center gap-2 text-charcoal/35">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[8px] text-white md:hidden">
                    4
                  </span>
                  {t("stepLayout")}
                </p>
                {filteredModels.length === 0 ? (
                  <span className="text-charcoal/35">{t("noMatch")}</span>
                ) : (
                  <>
                    <span className="text-charcoal">
                      {bookingSummary.avail} {t("summaryAvail")}
                    </span>
                    <span className="mt-2 block text-[9px] text-charcoal/40">
                      {t("summaryFrom")}{" "}
                      {formatAed(bookingSummary.pMin, lang)} {t("summaryTo")}{" "}
                      {formatAed(bookingSummary.pMax, lang)}
                    </span>
                    <span className="mt-1 block text-[9px] text-charcoal/35">
                      {filteredModels.length} {t("summaryTypologies")}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mb-12 flex flex-wrap items-center justify-center gap-2 md:mb-14">
            {filteredModels.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setResidenceId(m.id)}
                className={`shrink-0 rounded-[4px] px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all ${
                  activeResidenceId === m.id
                    ? "bg-charcoal text-white shadow-sm"
                    : "bg-white text-charcoal/40 shadow-[0_1px_0_rgba(26,28,30,0.06)] hover:text-charcoal/80"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-charcoal/30">
              {t("view")}
            </span>
            <button
              type="button"
              onClick={() => setViewMode("lifestyle")}
              className={`rounded-[4px] px-5 py-2 font-mono text-[9px] uppercase tracking-widest transition-colors ${
                viewMode === "lifestyle"
                  ? "bg-charcoal text-white"
                  : "text-charcoal/40 hover:text-charcoal"
              }`}
            >
              {t("lifestyleGallery")}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("engineering")}
              className={`rounded-[4px] px-5 py-2 font-mono text-[9px] uppercase tracking-widest transition-colors ${
                viewMode === "engineering"
                  ? "bg-charcoal text-white"
                  : "text-charcoal/40 hover:text-charcoal"
              }`}
            >
              {t("technicalBlueprint")}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeResidenceId}-${viewMode}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <h3 className="font-serif text-3xl font-medium tracking-tight text-charcoal md:text-4xl">
                    {activeResidence.label}
                  </h3>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-charcoal/40">
                    {activeResidence.booking.availableUnits}{" "}
                    {t("remainingOf")}{" "}
                    {activeResidence.booking.totalUnits} {t("remaining")} ·{" "}
                    {formatAed(activeResidence.booking.priceMin, lang)} –{" "}
                    {formatAed(activeResidence.booking.priceMax, lang)}
                  </p>
                  <div className="mt-12 space-y-6 font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal/55">
                    <div className="flex justify-between gap-6 border-b border-charcoal/[0.08] pb-5">
                      <span className="text-charcoal/35">{t("totalArea")}</span>
                      <span className="text-charcoal">
                        {activeResidence.specs.totalArea}
                      </span>
                    </div>
                    <div className="flex justify-between gap-6 border-b border-charcoal/[0.08] pb-5">
                      <span className="text-charcoal/35">{t("balcony")}</span>
                      <span className="text-charcoal">
                        {activeResidence.specs.balcony}
                      </span>
                    </div>
                    <div className="flex justify-between gap-6 pb-2">
                      <span className="text-charcoal/35">{t("parking")}</span>
                      <span className="text-charcoal">
                        {activeResidence.specs.parking}
                      </span>
                    </div>
                  </div>
                  <MagneticButton
                    type="button"
                    onClick={() =>
                      open360(
                        activeResidence.pano,
                        `${activeResidence.label} · 360°`,
                      )
                    }
                    className="mt-12 w-full rounded-[4px] bg-charcoal py-5 font-mono text-[10px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-charcoal/90 md:max-w-xs"
                  >
                    {t("enterWalkthrough")}
                  </MagneticButton>
                </div>

                <div className="lg:col-span-8">
                  {viewMode === "lifestyle" ? (
                    <div className="space-y-3">
                      <div className="relative min-h-[min(52vh,520px)] w-full overflow-hidden rounded-[4px] bg-charcoal/[0.03]">
                        <Image
                          src={activeResidence.images[0]}
                          alt={`${activeResidence.label} — primary`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 66vw"
                          priority
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                        {activeResidence.images.slice(1).map((src, i) => (
                          <div
                            key={src}
                            className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-charcoal/[0.03]"
                          >
                            <Image
                              src={src}
                              alt={`${activeResidence.label} interior ${i + 2}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 50vw, 22vw"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-[4px] bg-white shadow-[0_1px_0_rgba(26,28,30,0.06)]">
                      <EngineeringFloorPlan unitId={activeResidence.id} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="bg-white px-6 py-48 md:px-12 md:py-56 lg:py-64">
        <div className="mx-auto max-w-5xl">
          <SectionIntro
            title={t("paymentTitle")}
            subtitle={t("paymentSubtitle")}
            align="center"
          />

          <div className="relative hidden md:block">
            <div className="absolute left-0 right-0 top-[3px] h-px bg-charcoal/12" />
            <div className="grid grid-cols-3 gap-6 lg:gap-12">
              {PAYMENT_PHASES.map((ph) => (
                <div key={ph.title} className="relative pt-0 text-center">
                  <div className="mx-auto h-1.5 w-1.5 rounded-full bg-charcoal ring-4 ring-white" />
                  <p className="mt-10 font-mono text-[10px] font-normal uppercase tracking-[0.32em] text-charcoal/35">
                    {ph.when}
                  </p>
                  <p className="mt-3 font-serif text-2xl font-light tracking-tight text-charcoal">
                    {ph.pct}%
                  </p>
                  <p className="mt-2 font-serif text-lg font-normal text-charcoal/90">
                    {ph.title}
                  </p>
                  <p className="mx-auto mt-6 max-w-[220px] font-sans text-[13px] font-normal leading-relaxed text-charcoal/45">
                    {ph.body}
                  </p>
                  <ul className="mx-auto mt-6 max-w-[220px] space-y-1.5 text-left font-mono text-[8px] uppercase tracking-[0.12em] text-charcoal/35">
                    {ph.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10 md:hidden">
            {PAYMENT_PHASES.map((ph) => (
              <div key={ph.title} className="border-l border-charcoal/15 pl-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-charcoal/35">
                  {ph.pct}% · {ph.when}
                </p>
                <p className="mt-2 font-serif text-xl font-light text-charcoal">
                  {ph.title}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-charcoal/45">
                  {ph.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-48 md:px-12 md:py-56 lg:py-64">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            title={t("locationTitle")}
            subtitle={t("locationSubtitle")}
          />
          <div className="overflow-hidden rounded-[4px] shadow-[0_1px_0_rgba(26,28,30,0.08)]">
            <DarkMap />
          </div>
          <p className="mt-10 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-charcoal/35">
            {t("locationMapCaption")}
          </p>
        </div>
      </section>

      <PartnerMarquee />

      <section
        id="heritage"
        className="border-t border-charcoal/[0.06] bg-[#F5F5F4] px-6 py-32 text-charcoal md:px-12 md:py-40"
      >
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-charcoal/35">
              {t("sealQuality")}
            </p>
            <h2 className="mt-6 font-serif text-4xl font-light tracking-tight md:text-5xl">
              {t("heritageTitle")}
            </h2>
            <p className="mt-10 font-sans text-lg font-normal leading-[1.7] text-charcoal/65 md:text-xl">
              {t("heritageLead")}
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-charcoal/40">
              {t("heritageTags")}
            </p>
            <a
              href="https://www.sami-najami.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-[4px] bg-charcoal px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-charcoal/90"
            >
              {t("heritageSite")} ↗
            </a>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col justify-center grayscale">
              <Image
                src="/partners/sami-najami-logo.svg"
                alt="Sami Najami"
                width={280}
                height={48}
                className="h-auto w-full max-w-[280px] opacity-80"
              />
              <p className="mt-8 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-charcoal/45">
                {t("heritagePartnerBlurb")}
              </p>
            </div>
            <div className="flex flex-col border-t border-charcoal/10 pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-charcoal/40">
                {t("heritageCorp")}
              </p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal/55">
                {t("heritageCorpBody")}
              </p>
              <embed
                title="Sami Najami brand PDF"
                src="/partners/sami-najami-brand.pdf#view=FitH"
                type="application/pdf"
                className="mt-6 h-[200px] w-full rounded-[4px] bg-white opacity-90"
              />
              <a
                href="/partners/sami-najami-brand.pdf"
                download
                className="mt-4 inline-flex w-fit font-mono text-[9px] uppercase tracking-widest text-charcoal/60 hover:text-charcoal"
              >
                {t("downloadPdf")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer id="inquire" className="border-t border-charcoal/[0.06] bg-[#FAFAFA] px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-4 md:gap-12">
          <div className="space-y-8 md:col-span-2">
            <div className="font-serif text-lg font-medium tracking-[0.28em] text-charcoal">
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
              Business Bay, Dubai
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
        <div className="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
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
