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
    ? "text-charcoal/60 hover:text-charcoal"
    : "text-white/85 hover:text-white";

  const ctaClass = isLight
    ? "bg-charcoal text-white hover:bg-charcoal/92"
    : "bg-white/95 text-charcoal hover:bg-white";

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-5 py-2 transition-[background,backdrop-filter,border-color] duration-500 md:px-10 md:py-2.5 ${
        isLight
          ? "border-b border-charcoal/[0.06] bg-white/28 backdrop-blur-md backdrop-saturate-150"
          : "border-b border-white/[0.06] bg-transparent backdrop-blur-md backdrop-saturate-150"
      }`}
    >
      <Link
        href="/"
        className="font-serif text-base font-medium tracking-[0.38em] text-inherit md:text-[1.05rem]"
      >
        ASWAR
      </Link>
      <div
        className={`flex items-center gap-3 md:gap-6 ${isLight ? "text-charcoal/60" : "text-white/85"}`}
      >
        <div
          className={`hidden items-center gap-8 font-sans text-[10px] font-medium uppercase tracking-[0.34em] md:flex lg:gap-11`}
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
            className={`rounded-[2px] px-3.5 py-1.5 font-sans text-[9px] font-medium uppercase tracking-[0.32em] transition-colors ${ctaClass}`}
          >
            {t("navInquire")}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openBookMeeting}
            className={`rounded-[2px] px-2.5 py-1.5 font-sans text-[8px] font-medium uppercase tracking-[0.28em] transition-colors md:hidden ${ctaClass}`}
          >
            {t("navInquire")}
          </button>
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className={`rounded-[2px] border px-3 py-1.5 font-sans text-[9px] font-medium uppercase tracking-[0.38em] transition-colors ${
              isLight
                ? "border-charcoal/18 bg-white/55 text-charcoal hover:border-charcoal/30"
                : "border-white/40 bg-white/10 text-white hover:bg-white/18"
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
