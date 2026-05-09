"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Share2, Printer, Play } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { Fullscreen360 } from "@/components/fullscreen-360";
import { PartnerMarquee } from "@/components/partner-marquee";

const HAIRLINE = "border-[0.5px] border-ink/10";

const RESIDENCE_GALLERY = [
  {
    id: "sky",
    title: "Sky Residence",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85",
    pano: "/hero-360-panorama.jpg",
  },
  {
    id: "corner",
    title: "Corner Living",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=85",
    pano: "/hero-360-panorama.jpg",
  },
  {
    id: "penthouse",
    title: "Penthouse Gallery",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
    pano: "/hero-360-panorama.jpg",
  },
];

const PAYMENT_SLIDES = [
  { title: "Down Payment", value: "20", suffix: "%", subtitle: "On Booking" },
  { title: "Construction", value: "40", suffix: "%", subtitle: "During Build" },
  { title: "Handover", value: "40", suffix: "%", subtitle: "On Completion" },
];

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

function SectionHeading({
  index,
  title,
  subtitle,
  align = "left",
}: {
  index: string;
  title: string;
  subtitle: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`relative mb-20 md:mb-28 ${
        align === "center" ? "text-center" : ""
      }`}
    >
      <span
        className={`pointer-events-none absolute select-none font-serif text-[clamp(4rem,14vw,11rem)] font-extralight leading-none text-ink/[0.06] ${
          align === "center"
            ? "left-1/2 top-0 -translate-x-1/2 -translate-y-1/4"
            : "-left-2 md:-left-4 -top-6 md:-top-16"
        }`}
        aria-hidden
      >
        {index}
      </span>
      <div className="relative z-10 space-y-5">
        <div
          className={`flex items-center gap-6 ${align === "center" ? "justify-center" : ""}`}
        >
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-ink/45">
            <span className="h-1 w-1 rounded-full bg-champagne" aria-hidden />
            {index}
          </span>
          <span className="hidden h-[0.5px] max-w-[100px] flex-1 bg-ink/15 sm:block" />
        </div>
        <h2 className="font-serif text-3xl font-medium tracking-tight text-ink md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-widest text-ink/50">
          {subtitle}
        </p>
      </div>
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
  const [activeTab, setActiveTab] = useState("3BR");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerSrc, setViewerSrc] = useState("/hero-360-panorama.jpg");
  const [viewerTitle, setViewerTitle] = useState("360° Experience");
  const units = ["1BR", "2BR", "3BR", "4BR", "5BR", "PENTHOUSE"];

  const open360 = (src: string, title: string) => {
    setViewerSrc(src);
    setViewerTitle(title);
    setViewerOpen(true);
  };

  return (
    <main className="bg-paper text-ink selection:bg-champagne/25">
      <SiteNavbar variant="hero" />
      <Fullscreen360
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

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-36 pt-24 md:pb-40">
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
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28, x: 12 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-24 right-4 z-20 w-[min(92vw,20rem)] md:bottom-28 md:right-10 md:w-[22rem]"
        >
          <button
            type="button"
            onClick={() => open360("/hero-360-panorama.jpg", "Tower · 360° Preview")}
            className="group relative w-full overflow-hidden rounded-lg border border-white/50 bg-white/15 text-left shadow-[0_24px_64px_-16px_rgba(0,0,0,0.45)] backdrop-blur-2xl backdrop-saturate-150 transition-shadow hover:border-white/70 hover:shadow-[0_28px_72px_-12px_rgba(0,0,0,0.5)]"
            aria-label="Open 360° virtual tour"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/hero-360-panorama.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 92vw, 22rem"
                className="object-cover opacity-95 transition-opacity group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-ink/15 transition-colors group-hover:bg-ink/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-white/20 backdrop-blur-md transition-transform group-hover:scale-105">
                  <Play
                    className="ml-0.5 h-6 w-6 text-white"
                    strokeWidth={1.25}
                    fill="none"
                  />
                </span>
              </div>
            </div>
            <div className="border-t border-white/25 px-4 py-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/90">
                360° Virtual Tour
              </p>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-wider text-white/55">
                Immersive environment
              </p>
            </div>
          </button>
        </motion.div>

        <ScrollBreath />
      </section>

      {/* Engineering Excellence — Sami Najami */}
      <section className="border-b border-ink/10 bg-paper px-6 py-32 md:px-12 md:py-44 lg:py-48">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:items-center md:gap-20">
          <div>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-ink/45">
              <span className="h-1 w-1 rounded-full bg-champagne" aria-hidden />
              01
            </span>
            <h2 className="mt-6 font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">
              Engineering Excellence
            </h2>
            <div className="mx-0 my-8 h-[0.5px] max-w-[120px] bg-champagne/80" />
            <p className="font-serif text-lg font-normal leading-relaxed text-ink/80 md:text-xl">
              ASWAR 01 is delivered under the stewardship of{" "}
              <strong className="font-medium text-ink">Sami Najami</strong> — the
              parent engineering and contracting group renowned for precision,
              scale, and enduring quality across the UAE.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase leading-relaxed tracking-wider text-ink/45">
              Structural integrity · Programme certainty · Heritage of delivery
            </p>
            <a
              href="https://www.sami-najami.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-champagne transition-colors hover:text-ink"
            >
              Visit sami-najami.com
              <span className="text-champagne" aria-hidden>
                ↗
              </span>
            </a>
          </div>
          <div className="flex justify-center md:justify-end">
            <a
              href="https://www.sami-najami.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`block max-w-sm rounded-sm bg-paper p-10 ${HAIRLINE} transition-shadow hover:shadow-lg`}
            >
              <Image
                src="/partners/sami-najami-logo.svg"
                alt="Sami Najami — Engineering & Contracting"
                width={320}
                height={56}
                className="h-auto w-full"
              />
              <p className="mt-8 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-ink/40">
                Parent company & principal contractor for ASWAR International
                Development initiatives.
              </p>
            </a>
          </div>
        </div>
      </section>

      <section className="relative overflow-visible px-6 py-40 md:px-12 md:py-52 lg:py-56">
        <div className="relative mx-auto max-w-[1400px] overflow-visible">
          <SectionHeading
            index="02"
            title="Available Units"
            subtitle="Immersive layouts · Verified specifications"
          />
          <div className="mb-16 flex flex-col items-end justify-between gap-10 md:mb-20 md:flex-row md:items-end">
            <p className="max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-wider text-ink/55">
              Select a layout to preview floor plans and high-resolution
              interior renders.
            </p>
            <div className="flex flex-wrap justify-end gap-2">
              {units.map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setActiveTab(unit)}
                  className={`rounded-sm border px-5 py-2.5 font-mono text-[10px] uppercase tracking-widest transition-all ${
                    activeTab === unit
                      ? "border-ink bg-ink text-paper"
                      : `border-ink/12 bg-paper text-ink/60 hover:border-champagne/50`
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid gap-10 overflow-visible md:grid-cols-12 md:gap-12"
            >
              <div className="relative z-0 overflow-visible md:col-span-8">
                <div className="group relative md:pl-4 md:pt-4">
                  <div className="relative z-10 -mx-1 origin-center shadow-xl transition-transform duration-500 ease-out md:mx-0 md:-translate-x-2 md:-translate-y-4 md:scale-[1.03]">
                    <div
                      className={`aspect-[16/10] overflow-hidden rounded-sm bg-ink/[0.04] ${HAIRLINE}`}
                    >
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-paper to-ink/[0.03]">
                        <span className="font-mono text-[11px] uppercase italic tracking-widest text-ink/25">
                          [ High-Res {activeTab} Interior Render ]
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute -bottom-2 -right-2 left-6 top-6 -z-10 border border-ink/10 bg-transparent md:left-10 md:top-8"
                    aria-hidden
                  />
                  <div className="pointer-events-none absolute bottom-6 left-6 z-20 flex gap-2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 md:bottom-10 md:left-10">
                    <button
                      type="button"
                      className="pointer-events-auto rounded-sm border border-ink/10 bg-paper/90 p-3 shadow-sm backdrop-blur-sm transition-colors hover:text-champagne"
                      aria-label="Share"
                    >
                      <Share2 size={14} />
                    </button>
                    <button
                      type="button"
                      className="pointer-events-auto rounded-sm border border-ink/10 bg-paper/90 p-3 shadow-sm backdrop-blur-sm transition-colors hover:text-champagne"
                      aria-label="Print"
                    >
                      <Printer size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-6 md:col-span-4">
                <div className="relative z-10 flex-grow rounded-sm border border-ink/10 bg-paper/95 p-8 backdrop-blur-sm md:p-10">
                  <h3 className="mb-8 font-serif text-2xl font-medium tracking-tight text-ink md:text-3xl">
                    {activeTab} Residence
                  </h3>
                  <div className="space-y-5 font-mono text-[11px] uppercase tracking-wider text-ink/55">
                    <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
                      <span className="text-ink/45">Total Area</span>
                      <span className="text-ink">2,450 SQ.FT</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
                      <span className="text-ink/45">Unit Type</span>
                      <span className="text-ink">Corner Suite</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 pb-1">
                      <span className="text-ink/45">Starting From</span>
                      <span className="text-champagne">AED 4.2M</span>
                    </div>
                  </div>
                </div>
                <MagneticButton
                  type="button"
                  className="w-full rounded-sm border border-ink bg-ink py-5 font-mono text-[10px] uppercase tracking-[0.28em] text-paper shadow-lg transition-colors hover:bg-ink/90"
                >
                  Download Technical Spec
                </MagneticButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Residences — interactive gallery */}
      <section className="border-t border-ink/10 bg-ink/[0.02] px-6 py-40 md:px-12 md:py-52 lg:py-56">
        <div className="mx-auto max-w-[1600px]">
          <SectionHeading
            index="03"
            title="Residences"
            subtitle="Curated interiors · Full-scale visual language"
          />
          <div className="grid gap-10 md:gap-14">
            {RESIDENCE_GALLERY.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-sm"
              >
                <div className="relative aspect-[21/9] min-h-[280px] w-full md:aspect-[24/9] md:min-h-[360px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 1600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 p-8 md:flex-row md:items-end md:justify-between md:p-12">
                    <h3 className="font-serif text-3xl font-medium text-paper md:text-4xl">
                      {item.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => open360(item.pano, `${item.title} · 360°`)}
                      className="inline-flex w-fit items-center gap-3 border border-white/40 bg-white/10 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-paper backdrop-blur-md transition-colors hover:border-champagne hover:bg-white/20"
                    >
                      <Play className="h-4 w-4" strokeWidth={1.25} />
                      360° Experience
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Payment — horizontal slider */}
      <section
        id="payment"
        className="border-y border-ink/10 bg-paper px-0 py-40 md:py-52 lg:py-56"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <SectionHeading
            index="04"
            title="Payment Plan"
            subtitle="Structured for international investors"
            align="center"
          />
        </div>
        <div className="mt-4 w-full overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex snap-x snap-mandatory gap-6 px-6 md:gap-8 md:px-12">
            {PAYMENT_SLIDES.map((slide, i) => (
              <div
                key={slide.title}
                className="min-w-[min(100%,340px)] shrink-0 snap-center rounded-sm border border-ink/10 bg-paper px-10 py-16 text-center shadow-sm md:min-w-[380px] md:px-14 md:py-20"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
                  {slide.title}
                </p>
                <p className="mt-8 flex items-baseline justify-center gap-1 font-serif text-7xl font-extralight tracking-tight text-ink md:text-8xl">
                  {slide.value}
                  <span className="font-serif text-4xl font-extralight text-ink/50 md:text-5xl">
                    {slide.suffix}
                  </span>
                </p>
                <div className="mx-auto mt-6 h-[0.5px] w-12 bg-champagne/70" />
                <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-ink/40">
                  {slide.subtitle}
                </p>
                <span className="mt-8 inline-block font-mono text-[9px] text-ink/25">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(PAYMENT_SLIDES.length).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-widest text-ink/35">
          Scroll horizontally
        </p>
      </section>

      {/* Location */}
      <section className="px-6 py-40 md:px-12 md:py-52 lg:py-56">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            index="05"
            title="Location"
            subtitle="Business Bay · Dubai, UAE"
          />
          <div
            className={`overflow-hidden rounded-sm ${HAIRLINE} bg-ink/[0.03]`}
          >
            <div className="aspect-[21/9] min-h-[280px] w-full grayscale contrast-[1.05] md:min-h-[340px]">
              <iframe
                title="ASWAR 01 — Business Bay, Dubai"
                src="https://maps.google.com/maps?q=Business+Bay+Dubai&hl=en&z=14&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <p className="mt-8 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-wider text-ink/45">
            Minutes from Downtown and the waterfront. Exact pin to follow upon
            authority release.
          </p>
        </div>
      </section>

      <PartnerMarquee />

      <footer
        id="inquire"
        className="border-t border-ink/10 bg-paper px-8 py-24 md:px-12 md:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-4 md:gap-12">
          <div className="space-y-6 md:col-span-2">
            <div className="font-serif text-lg font-medium tracking-[0.28em] text-ink">
              ASWAR
            </div>
            <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-widest text-ink/45">
              ASWAR International Development
              <br />
              Visionary Architecture · Dubai, UAE
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-medium uppercase tracking-[0.2em] text-champagne">
              Headquarters
            </h4>
            <p className="font-mono text-[11px] uppercase leading-loose tracking-wider text-ink/50">
              Business Bay, Dubai
              <br />
              United Arab Emirates
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-medium uppercase tracking-[0.2em] text-champagne">
              Inquiries
            </h4>
            <p className="font-mono text-[11px] uppercase leading-loose tracking-wider text-ink/50 transition-colors hover:text-ink">
              <a href="mailto:sales@aswar.ae">sales@aswar.ae</a>
              <br />
              <a href="tel:+971000000000">+971 (0) 4 000 0000</a>
            </p>
          </div>
        </div>
        <div className="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-ink/10 pt-10 md:flex-row">
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink/35">
            © 2026 ASWAR International Development. All rights reserved.
          </p>
          <div className="flex gap-8 font-mono text-[9px] uppercase tracking-widest text-ink/35">
            <a href="#" className="transition-colors hover:text-ink">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
