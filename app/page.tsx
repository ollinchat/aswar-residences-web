"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Share2, Printer } from "lucide-react";

const GOLD_LINE = "border-[0.5px] border-aswar-gold/50";

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
    const strength = 0.22;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
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
      className={`relative mb-16 md:mb-24 ${
        align === "center" ? "text-center" : ""
      }`}
    >
      <span
        className={`pointer-events-none absolute select-none font-serif text-[clamp(5.5rem,16vw,13rem)] font-bold leading-none text-aswar-gold/[0.08] ${
          align === "center"
            ? "left-1/2 top-0 -translate-x-1/2 -translate-y-1/4"
            : "-left-1 md:-left-4 -top-8 md:-top-20"
        }`}
        aria-hidden
      >
        {index}
      </span>
      <div className="relative z-10 space-y-4">
        <div
          className={`flex items-center gap-6 ${align === "center" ? "justify-center" : ""}`}
        >
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.35em] text-aswar-gold ${GOLD_LINE} px-3 py-1`}
          >
            {index}
          </span>
          <span className={`hidden sm:block h-[0.5px] flex-1 max-w-[120px] bg-aswar-gold/40`} />
        </div>
        <h2 className="font-serif text-4xl font-bold tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
        <p className="max-w-md font-mono text-xs uppercase tracking-widest text-stone/90">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

const Navbar = () => (
  <nav
    className={`fixed top-0 z-50 flex w-full items-center justify-between border-b border-aswar-gold/30 bg-parchment/85 px-8 py-6 backdrop-blur-md md:px-10 md:py-7`}
  >
    <div className="font-serif text-xl font-bold tracking-[0.35em] text-ink">
      ASWAR
    </div>
    <div className="hidden gap-10 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/70 md:flex">
      <a href="#" className="transition-colors hover:text-aswar-gold">
        The Tower
      </a>
      <a href="#" className="transition-colors hover:text-aswar-gold">
        Units
      </a>
      <a href="#" className="transition-colors hover:text-aswar-gold">
        Investment
      </a>
      <a
        href="#"
        className="border-b-[0.5px] border-aswar-gold pb-0.5 text-aswar-gold"
      >
        Inquire
      </a>
    </div>
  </nav>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState("3BR");
  const units = ["1BR", "2BR", "3BR", "4BR", "5BR", "PENTHOUSE"];

  return (
    <main className="bg-parchment text-ink selection:bg-aswar-gold/20">
      <Navbar />

      {/* Hero — split screen, depth */}
      <section className="relative min-h-screen pt-[76px]">
        <div className="grid min-h-[calc(100vh-76px)] md:grid-cols-2">
          <div className="relative flex flex-col items-center justify-center bg-ink px-6 py-20 md:px-10 md:py-0">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(3.5rem,14vw,9rem)] font-bold leading-none tracking-tight text-champagne [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180"
            >
              ASWAR
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="absolute bottom-10 left-8 right-8 md:left-12 md:right-auto"
            >
              <p className="font-serif text-3xl font-bold text-aswar-gold md:text-4xl">
                01
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.4em] text-champagne/60">
                Luxury Living Redefined
                <br />
                <span className="text-champagne/40">Dubai, UAE</span>
              </p>
            </motion.div>
            <div
              className={`pointer-events-none absolute right-0 top-16 bottom-16 hidden w-[0.5px] bg-gradient-to-b from-transparent via-aswar-gold/50 to-transparent md:block`}
              aria-hidden
            />
          </div>

          <div className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-parchment via-white to-mist/80 px-6 py-16 md:px-12 md:py-10">
            <span
              className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-serif text-[min(40vw,18rem)] font-bold leading-none text-aswar-gold/[0.06]"
              aria-hidden
            >
              01
            </span>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md"
            >
              <div
                className="pointer-events-none absolute -inset-6 rounded-sm bg-aswar-gold/15 blur-3xl md:-inset-10"
                aria-hidden
              />
              <div
                className={`relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-white shadow-[0_0_0_0.5px_rgba(197,160,89,0.35),0_32px_80px_-24px_rgba(197,160,89,0.35),0_24px_64px_-32px_rgba(15,15,15,0.12)] ring-1 ring-aswar-gold/25`}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-mist/30 to-white">
                  <div className="w-[55%] rounded-full border-[0.5px] border-aswar-gold/35 px-4 py-16 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-stone/50">
                    [ 360° Tower Viewport ]
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="relative z-10 mt-12 flex justify-center md:mt-14">
              <MagneticButton
                type="button"
                className="rounded-sm bg-ink px-10 py-3.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white shadow-lg transition-colors hover:bg-aswar-gold"
              >
                Explore 360°
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <div className={`${GOLD_LINE} w-full opacity-80`} aria-hidden />

      {/* Units — overlap treatment, layered index */}
      <section className="relative overflow-visible px-6 py-28 md:py-36">
        <div className="relative mx-auto max-w-[1400px] overflow-visible">
          <SectionHeading
            index="02"
            title="Available Units"
            subtitle="Immersive layouts · Verified specifications"
          />

          <div className="mb-14 flex flex-col items-end justify-between gap-8 md:flex-row md:items-end">
            <p className="max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-wider text-stone">
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
                      ? `border-ink bg-ink text-white ${GOLD_LINE}`
                      : `border-stone/25 bg-white/80 text-stone hover:border-aswar-gold/60`
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
              className="grid gap-8 overflow-visible md:grid-cols-12 md:gap-10"
            >
              <div className="relative z-0 overflow-visible md:col-span-8">
                <div className="group relative md:pl-6 md:pt-6">
                  <div
                    className={`relative z-10 -mx-2 origin-center shadow-2xl transition-transform duration-500 ease-out md:mx-0 md:-translate-x-3 md:-translate-y-5 md:scale-[1.045]`}
                  >
                    <div
                      className={`aspect-[16/10] overflow-hidden rounded-sm bg-mist ring-1 ring-aswar-gold/20 ${GOLD_LINE}`}
                    >
                      <div className="flex h-full items-center justify-center bg-gradient-to-tr from-champagne/40 via-white to-mist/50">
                        <span className="font-mono text-[11px] uppercase italic tracking-widest text-stone/35">
                          [ High-Res {activeTab} Interior Render ]
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute -bottom-3 -right-3 left-8 top-8 -z-10 border border-aswar-gold/15 bg-transparent md:left-14 md:top-10"
                    aria-hidden
                  />
                  <div className="pointer-events-none absolute bottom-8 left-8 z-20 flex gap-2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 md:bottom-12 md:left-12">
                    <button
                      type="button"
                      className="pointer-events-auto rounded-sm bg-white/95 p-3 shadow-md ring-1 ring-stone/10 transition-colors hover:text-aswar-gold"
                      aria-label="Share"
                    >
                      <Share2 size={14} />
                    </button>
                    <button
                      type="button"
                      className="pointer-events-auto rounded-sm bg-white/95 p-3 shadow-md ring-1 ring-stone/10 transition-colors hover:text-aswar-gold"
                      aria-label="Print"
                    >
                      <Printer size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between space-y-6 md:col-span-4">
                <div
                  className={`relative z-10 flex-grow rounded-sm border border-stone/10 bg-white/90 p-8 backdrop-blur-sm md:p-10 ${GOLD_LINE}`}
                >
                  <h3 className="mb-8 font-serif text-2xl font-bold tracking-tight text-ink md:text-3xl">
                    {activeTab} Residence
                  </h3>
                  <div className="space-y-5 font-mono text-[11px] uppercase tracking-wider text-stone">
                    <div
                      className={`flex items-center justify-between gap-4 border-b border-aswar-gold/25 pb-4`}
                    >
                      <span className="text-stone/80">Total Area</span>
                      <span className="text-ink">2,450 SQ.FT</span>
                    </div>
                    <div
                      className={`flex items-center justify-between gap-4 border-b border-aswar-gold/25 pb-4`}
                    >
                      <span className="text-stone/80">Unit Type</span>
                      <span className="text-ink">Corner Suite</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 pb-1">
                      <span className="text-stone/80">Starting From</span>
                      <span className="text-aswar-gold">AED 4.2M</span>
                    </div>
                  </div>
                </div>
                <MagneticButton
                  type="button"
                  className={`w-full rounded-sm bg-aswar-gold py-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white shadow-[0_12px_40px_-12px_rgba(197,160,89,0.45)] transition-colors hover:bg-ink`}
                >
                  Download Technical Spec
                </MagneticButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <div className={`${GOLD_LINE} w-full opacity-80`} aria-hidden />

      {/* Payment — magazine numbers */}
      <section className="border-y border-stone/10 bg-mist/40 py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            index="03"
            title="Payment Plan"
            subtitle="Structured for international investors"
            align="center"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Down Payment", value: "20%", subtitle: "On Booking" },
              { title: "Construction", value: "40%", subtitle: "During Build" },
              { title: "Handover", value: "40%", subtitle: "On Completion" },
            ].map((box, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-sm border border-stone/15 bg-white p-10 text-center transition-colors hover:border-aswar-gold/45 md:p-12 ${GOLD_LINE}`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone">
                  {box.title}
                </p>
                <p className="mt-5 font-serif text-5xl font-bold text-ink transition-colors group-hover:text-aswar-gold md:text-6xl">
                  {box.value}
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-stone/55">
                  {box.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={`${GOLD_LINE} w-full opacity-80`} aria-hidden />

      <footer className="border-t border-aswar-gold/25 bg-white px-8 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
          <div className="space-y-6 md:col-span-2">
            <div className="font-serif text-xl font-bold tracking-[0.35em] text-ink">
              ASWAR
            </div>
            <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-widest text-stone">
              ASWAR International Development
              <br />
              Visionary Architecture · Dubai, UAE
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-aswar-gold">
              Headquarters
            </h4>
            <p className="font-mono text-[11px] uppercase leading-loose tracking-wider text-stone">
              Business Bay, Dubai
              <br />
              United Arab Emirates
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-aswar-gold">
              Inquiries
            </h4>
            <p className="font-mono text-[11px] uppercase leading-loose tracking-wider text-stone transition-colors hover:text-ink">
              <a href="mailto:sales@aswar.ae">sales@aswar.ae</a>
              <br />
              <a href="tel:+971000000000">+971 (0) 4 000 0000</a>
            </p>
          </div>
        </div>
        <div
          className={`mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-aswar-gold/20 pt-8 md:flex-row`}
        >
          <p className="font-mono text-[9px] uppercase tracking-widest text-stone/50">
            © 2026 ASWAR International Development. All rights reserved.
          </p>
          <div className="flex gap-8 font-mono text-[9px] uppercase tracking-widest text-stone/50">
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
