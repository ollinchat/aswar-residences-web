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
    ? "text-charcoal/55 hover:text-charcoal"
    : "text-white/80 hover:text-white";

  const ctaClass = isLight
    ? "bg-charcoal text-white hover:bg-charcoal/92"
    : "bg-white/95 text-charcoal hover:bg-white";

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-5 py-2.5 transition-[background,backdrop-filter,border-color] duration-500 md:px-10 md:py-3 ${
        isLight
          ? "border-b border-charcoal/[0.07] bg-white/55 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-white/[0.08] bg-transparent backdrop-blur-xl backdrop-saturate-150"
      }`}
    >
      <Link
        href="/"
        className="font-serif text-base font-medium tracking-[0.32em] text-inherit md:text-[1.05rem]"
      >
        ASWAR
      </Link>
      <div
        className={`flex items-center gap-3 md:gap-5 ${isLight ? "text-charcoal/55" : "text-white/80"}`}
      >
        <div
          className={`hidden items-center gap-7 font-mono text-[9px] uppercase tracking-[0.28em] md:flex lg:gap-9`}
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
            className={`rounded-[2px] px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.26em] transition-colors ${ctaClass}`}
          >
            {t("navInquire")}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openBookMeeting}
            className={`rounded-[2px] px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.24em] transition-colors md:hidden ${ctaClass}`}
          >
            {t("navInquire")}
          </button>
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className={`rounded-[2px] border px-3 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.32em] transition-colors ${
              isLight
                ? "border-charcoal/20 bg-white/80 text-charcoal shadow-sm hover:border-charcoal/35"
                : "border-white/45 bg-white/12 text-white hover:bg-white/20"
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
