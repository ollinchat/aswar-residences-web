"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Play } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { Fullscreen360 } from "@/components/fullscreen-360";
import { PartnerMarquee } from "@/components/partner-marquee";

const RESIDENCE_MODELS = [
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
  },
] as const;

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
      <h2 className="max-w-3xl font-serif text-3xl font-medium tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-10 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.25em] text-ink/45 ${
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

  const activeResidence =
    RESIDENCE_MODELS.find((m) => m.id === residenceId) ?? RESIDENCE_MODELS[0];

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
                  open360("/hero-360-panorama.jpg", "ASWAR 01 · Immersive panorama")
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

      {/* Heritage — Sami Najami (grayscale) */}
      <section
        id="heritage"
        className="bg-[#121212] px-6 py-44 text-paper md:px-12 md:py-52 lg:py-60"
      >
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center md:gap-24">
          <div>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-paper md:text-5xl lg:text-[3.25rem]">
              Heritage
            </h2>
            <p className="mt-12 font-serif text-xl font-normal leading-[1.65] text-paper/65 md:text-2xl">
              For decades,{" "}
              <span className="text-paper/95">Sami Najami</span> has defined
              large-scale engineering and contracting across the Emirates — a
              lineage of structural discipline that now underpins ASWAR 01.
            </p>
            <p className="mt-8 font-mono text-[11px] uppercase leading-relaxed tracking-[0.22em] text-paper/40">
              Master planning · High-rise delivery · Institutional quality
            </p>
            <a
              href="https://www.sami-najami.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex font-mono text-[10px] uppercase tracking-[0.28em] text-champagne/90 transition-colors hover:text-paper"
            >
              sami-najami.com ↗
            </a>
          </div>
          <div className="flex justify-center md:justify-end">
            <a
              href="https://www.sami-najami.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block max-w-sm p-12 transition-opacity hover:opacity-90"
            >
              <Image
                src="/partners/sami-najami-logo.svg"
                alt="Sami Najami — Engineering & Contracting"
                width={320}
                height={56}
                className="h-auto w-full opacity-90 [filter:brightness(0)_invert(1)]"
              />
              <p className="mt-10 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-paper/35">
                Parent organisation & principal contractor. Official credentials
                and project history on the corporate site.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* The Residences */}
      <section
        id="the-residences"
        className="scroll-mt-28 px-6 py-44 md:px-12 md:py-52 lg:py-60"
      >
        <div className="mx-auto max-w-[1500px]">
          <SectionIntro
            title="The Residences"
            subtitle="Select a typology to explore verified specifications, gallery imagery, and spatial walkthroughs."
          />

          <div className="mb-16 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] md:mb-20 md:flex-wrap md:justify-center md:overflow-visible [&::-webkit-scrollbar]:hidden">
            {RESIDENCE_MODELS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setResidenceId(m.id)}
                className={`shrink-0 rounded-sm px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all ${
                  residenceId === m.id
                    ? "bg-ink text-paper"
                    : "bg-paper text-ink/50 hover:bg-ink/[0.04] hover:text-ink"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeResidence.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="space-y-20"
            >
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <h3 className="font-serif text-3xl font-medium text-ink md:text-4xl">
                    {activeResidence.label}
                  </h3>
                  <div className="mt-12 space-y-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                    <div className="flex justify-between gap-6 border-b border-ink/10 pb-5">
                      <span className="text-ink/40">Total Area</span>
                      <span className="text-ink">{activeResidence.specs.totalArea}</span>
                    </div>
                    <div className="flex justify-between gap-6 border-b border-ink/10 pb-5">
                      <span className="text-ink/40">Balcony</span>
                      <span className="text-ink">{activeResidence.specs.balcony}</span>
                    </div>
                    <div className="flex justify-between gap-6 pb-2">
                      <span className="text-ink/40">Parking</span>
                      <span className="text-ink">{activeResidence.specs.parking}</span>
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
                    className="mt-12 w-full border border-ink bg-ink py-5 font-mono text-[10px] uppercase tracking-[0.28em] text-paper transition-colors hover:bg-ink/90 md:max-w-xs"
                  >
                    Enter 3D Walkthrough
                  </MagneticButton>
                </div>

                <div className="lg:col-span-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {activeResidence.images.map((src, i) => (
                      <div
                        key={src}
                        className={`relative overflow-hidden bg-ink/[0.03] ${
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
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="bg-ink/[0.02] px-6 py-44 md:px-12 md:py-52 lg:py-60">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            title="Payment Plan"
            subtitle="Structured for international investors"
            align="center"
          />
        </div>
        <div className="w-full overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex snap-x snap-mandatory gap-8 px-6 md:gap-10 md:px-12">
            {PAYMENT_SLIDES.map((slide) => (
              <div
                key={slide.title}
                className="min-w-[min(100%,360px)] shrink-0 snap-center bg-paper px-12 py-20 text-center md:min-w-[400px] md:px-16 md:py-24"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
                  {slide.title}
                </p>
                <p className="mt-10 flex items-baseline justify-center gap-1 font-serif text-7xl font-extralight tracking-tight text-ink md:text-8xl">
                  {slide.value}
                  <span className="font-serif text-4xl font-extralight text-ink/45 md:text-5xl">
                    {slide.suffix}
                  </span>
                </p>
                <div className="mx-auto mt-8 h-[0.5px] w-10 bg-champagne/60" />
                <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-ink/38">
                  {slide.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center font-mono text-[9px] uppercase tracking-widest text-ink/30">
          Scroll horizontally
        </p>
      </section>

      <section className="px-6 py-44 md:px-12 md:py-52 lg:py-60">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            title="Location"
            subtitle="Business Bay · Dubai, UAE"
          />
          <div className="overflow-hidden bg-ink/[0.03]">
            <div className="aspect-[21/9] min-h-[260px] w-full grayscale contrast-[1.05] md:min-h-[320px]">
              <iframe
                title="ASWAR 01 — Business Bay, Dubai"
                src="https://maps.google.com/maps?q=Business+Bay+Dubai&hl=en&z=14&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <p className="mt-12 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-ink/40">
            Minutes from Downtown and the waterfront. Final plot coordinates will
            track authority registration.
          </p>
        </div>
      </section>

      <PartnerMarquee />

      <footer
        id="inquire"
        className="px-8 py-28 md:px-12 md:py-36"
      >
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-4 md:gap-12">
          <div className="space-y-8 md:col-span-2">
            <div className="font-serif text-lg font-medium tracking-[0.28em] text-ink">
              ASWAR
            </div>
            <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-ink/40">
              ASWAR International Development
              <br />
              Visionary Architecture · Dubai, UAE
            </p>
          </div>
          <div className="space-y-5">
            <h4 className="font-serif text-xs font-medium uppercase tracking-[0.2em] text-champagne">
              Headquarters
            </h4>
            <p className="font-mono text-[11px] uppercase leading-loose tracking-wider text-ink/45">
              Business Bay, Dubai
              <br />
              United Arab Emirates
            </p>
          </div>
          <div className="space-y-5">
            <h4 className="font-serif text-xs font-medium uppercase tracking-[0.2em] text-champagne">
              Inquiries
            </h4>
            <p className="font-mono text-[11px] uppercase leading-loose tracking-wider text-ink/45 transition-colors hover:text-ink">
              <a href="mailto:sales@aswar.ae">sales@aswar.ae</a>
              <br />
              <a href="tel:+971000000000">+971 (0) 4 000 0000</a>
            </p>
          </div>
        </div>
        <div className="mx-auto mt-24 flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink/30">
            © 2026 ASWAR International Development. All rights reserved.
          </p>
          <div className="flex gap-10 font-mono text-[9px] uppercase tracking-widest text-ink/30">
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
