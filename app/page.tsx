"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Play } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { PartnerMarquee } from "@/components/partner-marquee";
import { EngineeringFloorPlan } from "@/components/engineering-floor-plan";
import { ResidenceGallerySlider } from "@/components/residence-gallery-slider";
import { useLang } from "@/components/language-provider";
import type { Lang } from "@/lib/i18n";
import { RESIDENCE_MODELS } from "@/lib/residence-models";

const PanoramaViewerModal = dynamic(
  () =>
    import("@/components/fullscreen-360").then((m) => m.PanoramaViewerModal),
  { ssr: false },
);

const LightMap = dynamic(() => import("@/components/light-map"), { ssr: false });

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
          className={`mt-10 max-w-xl font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.28em] text-charcoal/42 ${
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

  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewerOpen]);

  const activeResidence =
    RESIDENCE_MODELS.find((m) => m.id === residenceId) ?? RESIDENCE_MODELS[0];

  const open360 = (src: string, title: string) => {
    setViewerSrc(src);
    setViewerTitle(title);
    setViewerOpen(true);
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
                className="inline-flex items-center gap-3 rounded-[2px] bg-white/14 px-10 py-4 font-mono text-[10px] uppercase tracking-[0.32em] text-white backdrop-blur-md transition-colors hover:bg-white/22"
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
        className="scroll-mt-24 bg-[#FFFFFF] px-6 py-28 md:px-14 md:py-36"
      >
        <div className="mx-auto max-w-[1360px]">
          <header className="mb-14 md:mb-16">
            <p className="font-sans text-[9px] font-medium uppercase tracking-[0.52em] text-charcoal/32">
              {t("magazineKicker")}
            </p>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl font-light tracking-tight text-charcoal md:text-[2.85rem] md:leading-[1.1]">
              {t("residencesTitle")}
            </h2>
            <p className="mt-7 max-w-md font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.26em] text-charcoal/38">
              {t("residencesSubtitle")}
            </p>
          </header>

          <div className="mb-14 border-b border-charcoal/[0.08]">
            <div className="scrollbar-none flex gap-8 overflow-x-auto pb-px md:flex-wrap md:gap-x-12 md:gap-y-6 lg:gap-x-14">
              {RESIDENCE_MODELS.map((m) => {
                const active = residenceId === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setResidenceId(m.id)}
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
              className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14"
            >
              <div className="lg:col-span-7">
                {viewMode === "lifestyle" ? (
                  <ResidenceGallerySlider
                    images={activeResidence.images}
                    label={activeResidence.label}
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

              <aside className="space-y-10 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setViewMode("lifestyle")}
                    className={`rounded-[2px] px-4 py-2 font-sans text-[9px] font-medium uppercase tracking-[0.22em] transition-colors ${
                      viewMode === "lifestyle"
                        ? "bg-charcoal text-white"
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
                        ? "bg-charcoal text-white"
                        : "text-charcoal/42 ring-1 ring-charcoal/[0.1] hover:text-charcoal"
                    }`}
                  >
                    {t("technicalBlueprint")}
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

                <dl className="space-y-0 border-t border-charcoal/[0.08]">
                  <div className="flex justify-between gap-6 border-b border-charcoal/[0.08] py-3.5">
                    <dt className="max-w-[55%] font-sans text-[10px] font-medium uppercase leading-snug tracking-[0.14em] text-charcoal/40">
                      {t("totalArea")}
                    </dt>
                    <dd className="text-end font-sans text-[11px] font-semibold tracking-[0.04em] text-charcoal">
                      {activeResidence.specs.totalArea}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-charcoal/[0.08] py-3.5">
                    <dt className="max-w-[55%] font-sans text-[10px] font-medium uppercase leading-snug tracking-[0.14em] text-charcoal/40">
                      {t("balcony")}
                    </dt>
                    <dd className="text-end font-sans text-[11px] font-semibold tracking-[0.04em] text-charcoal">
                      {activeResidence.specs.balcony}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-6 py-3.5">
                    <dt className="max-w-[55%] font-sans text-[10px] font-medium uppercase leading-snug tracking-[0.14em] text-charcoal/40">
                      {t("parking")}
                    </dt>
                    <dd className="text-end font-sans text-[11px] font-semibold tracking-[0.04em] text-charcoal">
                      {activeResidence.specs.parking}
                    </dd>
                  </div>
                </dl>
              </aside>
            </motion.article>
          </AnimatePresence>
        </div>
      </section>

      <section className="bg-[#FFFFFF] px-6 py-40 md:px-12 md:py-48 lg:py-56">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            title={t("paymentTitle")}
            subtitle={t("paymentSubtitle")}
            align="center"
          />

          <div className="relative mx-auto hidden w-full max-w-[1100px] md:block">
            <div className="grid grid-cols-3 gap-4">
              {PAYMENT_PHASES.map((ph) => (
                <div key={ph.title} className="text-center">
                  <p className="font-serif text-[clamp(2.25rem,5vw,3.5rem)] font-extralight tabular-nums leading-none tracking-[-0.02em] text-charcoal">
                    {ph.pct}%
                  </p>
                </div>
              ))}
            </div>

            <div className="relative my-8 h-12">
              <div
                className="absolute start-0 end-0 top-1/2 h-px -translate-y-1/2 bg-charcoal/14"
                aria-hidden
              />
              <div className="relative grid h-full grid-cols-3">
                {PAYMENT_PHASES.map((ph) => (
                  <div key={ph.title} className="flex justify-center">
                    <span
                      className="relative z-10 mt-[1.125rem] flex h-[11px] w-[11px] items-center justify-center rounded-full border border-charcoal/20 bg-white shadow-sm"
                      aria-hidden
                    >
                      <span className="h-[5px] w-[5px] rounded-full bg-charcoal" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 px-1">
              {PAYMENT_PHASES.map((ph) => (
                <div key={ph.title} className="text-center">
                  <p className="font-sans text-[10px] font-semibold uppercase leading-snug tracking-[0.22em] text-charcoal">
                    {ph.title
                      .split(" ")
                      .map((w) => w.toUpperCase())
                      .join(" ")}
                  </p>
                  <p className="mx-auto mt-6 hidden max-w-[240px] font-sans text-[13px] font-normal leading-relaxed text-charcoal/38 lg:block">
                    {ph.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10 md:hidden">
            {PAYMENT_PHASES.map((ph) => (
              <div key={ph.title} className="border-s border-charcoal/12 ps-6">
                <p className="font-serif text-3xl font-extralight tabular-nums text-charcoal">
                  {ph.pct}%
                </p>
                <p className="mt-3 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal">
                  {ph.title
                    .split(" ")
                    .map((w) => w.toUpperCase())
                    .join(" ")}
                </p>
                <p className="mt-3 font-sans text-[13px] leading-relaxed text-charcoal/40">
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
          <div className="overflow-hidden rounded-[2px] border border-charcoal/[0.08] shadow-sm">
            <LightMap />
          </div>
          <p className="mt-10 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-charcoal/35">
            {t("locationMapCaption")}
          </p>
        </div>
      </section>

      <PartnerMarquee />

      <section
        id="heritage"
        className="border-t border-charcoal/[0.06] bg-white px-6 py-24 text-charcoal md:px-12 md:py-32"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-charcoal/35">
            {t("engineeringSealTitle")}
          </p>
          <div className="mx-auto mt-10 flex h-28 w-28 items-center justify-center rounded-full border border-charcoal/[0.1] bg-[#FAFAFA] shadow-[inset_0_0_0_1px_rgba(26,28,30,0.04)]">
            <span className="font-serif text-[10px] font-medium tracking-[0.55em] text-charcoal/30">
              ASWAR
            </span>
          </div>
          <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.5em] text-charcoal/25">
            {t("engineeringSealParent")}
          </p>
          <div className="mx-auto mt-12 max-w-md opacity-[0.85] grayscale">
            <Image
              src="/partners/sami-najami-logo.svg"
              alt="Sami Najami"
              width={220}
              height={40}
              className="mx-auto h-auto w-full max-w-[200px]"
            />
          </div>
          <p className="mx-auto mt-10 max-w-xl font-sans text-sm font-normal leading-relaxed text-charcoal/50 md:text-base">
            {t("engineeringSealLine")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.sami-najami.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-[2px] bg-charcoal px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-charcoal/90"
            >
              {t("heritageSite")} ↗
            </a>
            <a
              href="/partners/sami-najami-brand.pdf"
              download
              className="inline-flex rounded-[2px] border border-charcoal/15 bg-white px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/70 transition-colors hover:border-charcoal/30 hover:text-charcoal"
            >
              {t("downloadPdf")}
            </a>
          </div>
        </div>
      </section>

      <footer id="contact" className="border-t border-charcoal/[0.06] bg-[#FAFAFA] px-8 py-28 md:px-12 md:py-36">
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
