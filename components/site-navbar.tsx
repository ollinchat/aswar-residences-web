"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/components/language-provider";

type NavVariant = "hero" | "solid";

export function SiteNavbar({
  variant = "solid",
}: {
  variant?: NavVariant;
}) {
  const { lang, setLang, t } = useLang();
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
    ? "text-charcoal/50 hover:text-charcoal"
    : "text-white/70 hover:text-white";

  const ctaClass = isLight
    ? "bg-charcoal text-white hover:bg-charcoal/90"
    : "bg-white text-charcoal hover:bg-white/90";

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-6 py-5 transition-colors duration-300 md:px-12 md:py-6 ${
        isLight
          ? "border-b border-charcoal/[0.06] bg-[#FAFAFA]/85 text-charcoal backdrop-blur-xl"
          : "border-b border-white/[0.06] bg-transparent text-white"
      }`}
    >
      <Link
        href="/"
        className="font-serif text-lg font-medium tracking-[0.28em] text-inherit"
      >
        ASWAR
      </Link>
      <div
        className={`flex items-center gap-4 md:gap-6 lg:gap-8 ${isLight ? "text-charcoal/50" : "text-white/70"}`}
      >
        <div
          className={`hidden items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em] md:flex lg:gap-10`}
        >
          <Link href="/#the-residences" className={`transition-colors ${linkClass}`}>
            {t("navResidences")}
          </Link>
          <Link href="/gallery" className={`transition-colors ${linkClass}`}>
            {t("navGallery")}
          </Link>
          <Link href="/location" className={`transition-colors ${linkClass}`}>
            {t("navLocation")}
          </Link>
          <Link href="/about-najami" className={`transition-colors ${linkClass}`}>
            {t("navAbout")}
          </Link>
          <a
            href="#inquire"
            className={`rounded-[4px] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${ctaClass}`}
          >
            {t("navInquire")}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
          className={`rounded-[4px] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
            isLight
              ? "text-charcoal/60 hover:bg-charcoal/[0.06]"
              : "text-white/75 hover:bg-white/10"
          }`}
          aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
        >
          {t("langShort")}
        </button>
      </div>
    </nav>
  );
}
