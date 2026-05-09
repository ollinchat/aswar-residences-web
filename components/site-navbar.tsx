"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavVariant = "hero" | "solid";

export function SiteNavbar({
  variant = "solid",
}: {
  variant?: NavVariant;
}) {
  const [onLight, setOnLight] = useState(variant === "solid");

  useEffect(() => {
    if (variant !== "hero") return;
    const threshold = () => window.scrollY > window.innerHeight * 0.72;
    const onScroll = () => setOnLight(threshold());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const isLight = variant === "solid" || onLight;

  const linkClass = isLight
    ? "text-ink/55 hover:text-ink"
    : "text-white/75 hover:text-white";

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-6 py-6 transition-colors duration-300 md:px-12 md:py-7 ${
        isLight
          ? "border-b border-ink/8 bg-paper/90 text-ink backdrop-blur-md"
          : "border-b border-white/10 bg-transparent text-white"
      }`}
    >
      <Link
        href="/"
        className="font-serif text-lg font-medium tracking-[0.28em] text-inherit"
      >
        ASWAR
      </Link>
      <div
        className={`hidden items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em] md:flex lg:gap-10 ${isLight ? "text-ink/55" : "text-white/75"}`}
      >
        <Link href="/#the-residences" className={`transition-colors ${linkClass}`}>
          Residences
        </Link>
        <Link href="/gallery" className={`transition-colors ${linkClass}`}>
          Gallery
        </Link>
        <Link href="/location" className={`transition-colors ${linkClass}`}>
          Location
        </Link>
        <Link href="/about-najami" className={`transition-colors ${linkClass}`}>
          About Najami
        </Link>
        <a
          href="#inquire"
          className={`border-b border-champagne pb-0.5 transition-colors ${
            isLight
              ? "text-champagne hover:text-ink"
              : "text-white hover:text-white"
          }`}
        >
          Inquire
        </a>
      </div>
    </nav>
  );
}
