"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useInquiryModal } from "@/components/inquiry-modal-context";
import { useLang } from "@/components/language-provider";

type NavVariant = "hero" | "solid";

export function SiteNavbar({
  variant = "solid",
}: {
  variant?: NavVariant;
}) {
  const { lang, setLang, t } = useLang();
  const { openBookMeeting } = useInquiryModal();
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
          <button
            type="button"
            onClick={openBookMeeting}
            className={`rounded-[4px] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${ctaClass}`}
          >
            {t("navInquire")}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openBookMeeting}
            className={`rounded-[4px] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors md:hidden ${ctaClass}`}
          >
            {t("navInquire")}
          </button>
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className={`rounded-[4px] border-2 px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.28em] transition-colors ${
              isLight
                ? "border-charcoal/25 bg-white text-charcoal shadow-sm hover:border-charcoal/45"
                : "border-white/55 bg-white/10 text-white backdrop-blur-sm hover:bg-white/18"
            }`}
            aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
          >
            {t("langShort")}
          </button>
        </div>
      </div>
    </nav>
  );
}
