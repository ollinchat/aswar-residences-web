"use client";

import React, { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Play } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { PartnerMarquee } from "@/components/partner-marquee";
import { EngineeringFloorPlan } from "@/components/engineering-floor-plan";

const PanoramaViewerModal = dynamic(
  () =>
    import("@/components/panorama-viewer").then((m) => m.PanoramaViewerModal),
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

function formatAed(n: number) {
  return new Intl.NumberFormat("en-AE", {
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
    <main className="bg-parchment text-charcoal selection:bg-champagne/25">
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
              Private Residences · Dubai
            </p>
            <div className="mt-14 flex justify-center">
              <MagneticButton
                type="button"
                onClick={() =>
                  open360("/hero-360-panorama.jpg", "ASWAR 01 · Panorama")
                }
                className="inline-flex items-center gap-3 border border-white/45 bg-white/10 px-10 py-4 font-mono text-[10px] uppercase tracking-[0.32em] text-white backdrop-blur-md transition-colors hover:border-white/70 hover:bg-white/20"
              >
                <Play className="h-4 w-4" strokeWidth={1.25} />
                Experience 360°
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        <ScrollBreath />
      </section>

      {/* Heritage — industrial seal of quality */}
      <section
        id="heritage"
        className="relative overflow-hidden bg-[#2b2e32] px-6 py-48 text-parchment md:px-12 md:py-56 lg:py-64"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(244,241,234,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(244,241,234,0.5) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.55em] text-parchment/40">
              Seal of quality
            </p>
            <h2 className="mt-8 font-serif text-4xl font-medium tracking-tight text-parchment md:text-5xl">
              Heritage
            </h2>
            <p className="mt-12 font-serif text-xl font-normal leading-[1.65] text-parchment/60 md:text-2xl">
              <span className="text-parchment/90">Sami Najami</span> carries a
              multi-decade record of structural delivery across the UAE — the
              industrial backbone that de-risks ASWAR 01 from foundation to
              façade.
            </p>
            <p className="mt-8 font-mono text-[11px] uppercase leading-relaxed tracking-[0.22em] text-parchment/38">
              Engineering · High-rise contracting · Programme governance
            </p>
            <a
              href="https://www.sami-najami.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex font-mono text-[10px] uppercase tracking-[0.28em] text-champagne transition-colors hover:text-parchment"
            >
              sami-najami.com ↗
            </a>
          </div>

          <div className="mt-20 grid gap-12 border border-parchment/10 bg-charcoal/40 p-10 backdrop-blur-sm md:grid-cols-2 md:p-14 lg:gap-16">
            <div className="flex flex-col justify-center grayscale">
              <Image
                src="/partners/sami-najami-logo.svg"
                alt="Sami Najami"
                width={300}
                height={52}
                className="h-auto w-full max-w-xs opacity-90 [filter:brightness(0)_invert(1)]"
              />
              <p className="mt-10 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-parchment/35">
                Certified delivery partner · Principal contractor to ASWAR
                International Development.
              </p>
            </div>
            <div className="flex flex-col border-t border-parchment/10 pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-parchment/45">
                Corporate identity
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed text-parchment/50">
                Official mark &amp; credentials — vector PDF supplied for print
                and digital compliance.
              </p>
              <embed
                title="Sami Najami brand PDF"
                src="/partners/sami-najami-brand.pdf#view=FitH"
                type="application/pdf"
                className="mt-6 h-[220px] w-full rounded-sm border border-parchment/10 opacity-90"
              />
              <a
                href="/partners/sami-najami-brand.pdf"
                download
                className="mt-4 font-mono text-[9px] uppercase tracking-widest text-champagne hover:text-parchment"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="the-residences"
        className="scroll-mt-28 px-6 py-48 md:px-12 md:py-56 lg:py-64"
      >
        <div className="mx-auto max-w-[1500px]">
          <SectionIntro
            title="The Residences"
            subtitle="Filter by typology, price band, and availability. Specifications and galleries update instantly per layout."
          />

          <div className="mb-16 space-y-10 rounded-sm border border-charcoal/8 bg-parchment p-8 md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-charcoal/40">
                  Unit types
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {RESIDENCE_MODELS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => toggleTypeFilter(m.id)}
                      className={`rounded-sm px-4 py-2 font-mono text-[9px] uppercase tracking-widest transition-colors ${
                        typesFilter.has(m.id)
                          ? "bg-charcoal text-parchment"
                          : "bg-charcoal/5 text-charcoal/40 hover:bg-charcoal/10"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-charcoal/40">
                  Price band (AED)
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
                      className={`rounded-sm px-4 py-2 font-mono text-[9px] uppercase tracking-widest transition-colors ${
                        priceBand === id
                          ? "bg-champagne/25 text-charcoal ring-1 ring-champagne/50"
                          : "bg-charcoal/5 text-charcoal/45 hover:bg-charcoal/10"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex cursor-pointer items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-charcoal/50">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-charcoal/30 accent-charcoal"
                />
                Available only
              </label>
            </div>
            <div className="border-t border-charcoal/8 pt-8 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-charcoal/55">
              {filteredModels.length === 0 ? (
                <span className="text-charcoal/40">
                  No layouts match — widen filters.
                </span>
              ) : (
                <>
                  <span className="text-champagne">
                    {bookingSummary.avail} units available
                  </span>
                  <span className="mx-3 text-charcoal/25">·</span>
                  <span>
                    From {formatAed(bookingSummary.pMin)} to{" "}
                    {formatAed(bookingSummary.pMax)}
                  </span>
                  <span className="mx-3 text-charcoal/25">·</span>
                  <span>{filteredModels.length} typologies shown</span>
                </>
              )}
            </div>
          </div>

          <div className="mb-12 flex flex-wrap items-center justify-center gap-3 md:mb-16">
            {filteredModels.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setResidenceId(m.id)}
                className={`shrink-0 rounded-sm px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all ${
                  activeResidenceId === m.id
                    ? "bg-charcoal text-parchment"
                    : "bg-parchment text-charcoal/45 ring-1 ring-charcoal/10 hover:text-charcoal"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-charcoal/35">
              View
            </span>
            <button
              type="button"
              onClick={() => setViewMode("lifestyle")}
              className={`rounded-sm px-5 py-2 font-mono text-[9px] uppercase tracking-widest ${
                viewMode === "lifestyle"
                  ? "bg-charcoal text-parchment"
                  : "text-charcoal/45 hover:text-charcoal"
              }`}
            >
              Lifestyle gallery
            </button>
            <button
              type="button"
              onClick={() => setViewMode("engineering")}
              className={`rounded-sm px-5 py-2 font-mono text-[9px] uppercase tracking-widest ${
                viewMode === "engineering"
                  ? "bg-charcoal text-parchment"
                  : "text-charcoal/45 hover:text-charcoal"
              }`}
            >
              Engineering view
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
                  <h3 className="font-serif text-3xl font-medium text-charcoal md:text-4xl">
                    {activeResidence.label}
                  </h3>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-charcoal/40">
                    {activeResidence.booking.availableUnits} of{" "}
                    {activeResidence.booking.totalUnits} remaining ·{" "}
                    {formatAed(activeResidence.booking.priceMin)} –{" "}
                    {formatAed(activeResidence.booking.priceMax)}
                  </p>
                  <div className="mt-12 space-y-6 font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal/55">
                    <div className="flex justify-between gap-6 border-b border-charcoal/10 pb-5">
                      <span className="text-charcoal/40">Total Area</span>
                      <span className="text-charcoal">
                        {activeResidence.specs.totalArea}
                      </span>
                    </div>
                    <div className="flex justify-between gap-6 border-b border-charcoal/10 pb-5">
                      <span className="text-charcoal/40">Balcony</span>
                      <span className="text-charcoal">
                        {activeResidence.specs.balcony}
                      </span>
                    </div>
                    <div className="flex justify-between gap-6 pb-2">
                      <span className="text-charcoal/40">Parking</span>
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
                        `${activeResidence.label} · 3D Walkthrough`,
                      )
                    }
                    className="mt-12 w-full border border-charcoal bg-charcoal py-5 font-mono text-[10px] uppercase tracking-[0.28em] text-parchment transition-colors hover:bg-charcoal/90 md:max-w-xs"
                  >
                    Enter 3D Walkthrough
                  </MagneticButton>
                </div>

                <div className="lg:col-span-8">
                  {viewMode === "lifestyle" ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {activeResidence.images.map((src, i) => (
                        <div
                          key={src}
                          className={`relative overflow-hidden bg-charcoal/[0.04] ${
                            i === 0 ? "sm:col-span-2" : ""
                          }`}
                        >
                          <div
                            className={`relative w-full ${
                              i === 0 ? "aspect-[21/10]" : "aspect-[4/3]"
                            }`}
                          >
                            <Image
                              src={src}
                              alt={`${activeResidence.label} interior ${i + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 66vw"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EngineeringFloorPlan unitId={activeResidence.id} />
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="bg-charcoal/[0.04] px-6 py-48 md:px-12 md:py-56 lg:py-64">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            title="Payment plan"
            subtitle="Three-phase equity curve with milestone alignment from reservation through handover."
            align="center"
          />

          <div className="relative hidden md:block">
            <div className="absolute left-[8%] right-[8%] top-[2.75rem] h-[0.5px] bg-charcoal/12" />
            <div className="grid grid-cols-3 gap-10">
              {PAYMENT_PHASES.map((ph) => (
                <div key={ph.title} className="relative text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-champagne/60 bg-parchment shadow-[0_0_0_6px_rgba(244,241,234,0.9)]">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-champagne">
                      {ph.pct}%
                    </span>
                  </div>
                  <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.28em] text-charcoal/40">
                    {ph.when}
                  </p>
                  <p className="mt-4 font-serif text-xl font-medium text-charcoal">
                    {ph.title}
                  </p>
                  <p className="mx-auto mt-6 max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-wider text-charcoal/45">
                    {ph.body}
                  </p>
                  <ul className="mx-auto mt-6 max-w-xs space-y-2 text-left font-mono text-[9px] uppercase tracking-wider text-charcoal/38">
                    {ph.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-champagne">·</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12 md:hidden">
            {PAYMENT_PHASES.map((ph) => (
              <div key={ph.title} className="border-l-2 border-champagne/40 pl-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-champagne">
                  {ph.pct}% · {ph.when}
                </p>
                <p className="mt-2 font-serif text-xl text-charcoal">{ph.title}</p>
                <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed text-charcoal/45">
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
            title="Location"
            subtitle="Business Bay · Dubai, UAE"
          />
          <div className="overflow-hidden rounded-sm ring-1 ring-charcoal/10">
            <DarkMap />
          </div>
          <p className="mt-12 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-charcoal/40">
            Dark cartography with live ASWAR pulse marker. Final survey pin
            tracks authority registration.
          </p>
        </div>
      </section>

      <PartnerMarquee />

      <footer id="inquire" className="px-8 py-32 md:px-12 md:py-40">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-4 md:gap-12">
          <div className="space-y-8 md:col-span-2">
            <div className="font-serif text-lg font-medium tracking-[0.28em] text-charcoal">
              ASWAR
            </div>
            <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-charcoal/40">
              ASWAR International Development
              <br />
              Visionary Architecture · Dubai, UAE
            </p>
          </div>
          <div className="space-y-5">
            <h4 className="font-serif text-xs font-medium uppercase tracking-[0.2em] text-champagne">
              Headquarters
            </h4>
            <p className="font-mono text-[11px] uppercase leading-loose tracking-wider text-charcoal/45">
              Business Bay, Dubai
              <br />
              United Arab Emirates
            </p>
          </div>
          <div className="space-y-5">
            <h4 className="font-serif text-xs font-medium uppercase tracking-[0.2em] text-champagne">
              Inquiries
            </h4>
            <p className="font-mono text-[11px] uppercase leading-loose tracking-wider text-charcoal/45 transition-colors hover:text-charcoal">
              <a href="mailto:sales@aswar.ae">sales@aswar.ae</a>
              <br />
              <a href="tel:+971000000000">+971 (0) 4 000 0000</a>
            </p>
          </div>
        </div>
        <div className="mx-auto mt-24 flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-mono text-[9px] uppercase tracking-widest text-charcoal/30">
            © 2026 ASWAR International Development. All rights reserved.
          </p>
          <div className="flex gap-10 font-mono text-[9px] uppercase tracking-widest text-charcoal/30">
            <a href="#" className="transition-colors hover:text-charcoal">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-charcoal">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
