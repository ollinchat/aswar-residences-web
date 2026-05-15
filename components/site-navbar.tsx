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
    ? "font-extralight text-charcoal/55 hover:text-charcoal"
    : "font-extralight text-white/80 hover:text-white";

  const ctaClass = isLight
    ? "border border-charcoal/10 bg-[#0a0a0a]/85 text-white backdrop-blur-[20px] hover:bg-zinc-950/80"
    : "bg-white/90 text-charcoal backdrop-blur-[20px] hover:bg-white";

  const shellClass = isLight
    ? "bg-white/18 backdrop-blur-[20px] backdrop-saturate-150"
    : "bg-black/12 backdrop-blur-[20px] backdrop-saturate-150";

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-5 py-1.5 transition-[background,backdrop-filter] duration-500 md:px-10 md:py-2 ${shellClass}`}
    >
      <Link
        href="/"
        className="font-serif text-[0.95rem] font-extralight tracking-[0.3em] text-inherit md:text-[1rem]"
      >
        ASWAR
      </Link>
      <div
        className={`flex items-center gap-3 md:gap-6 ${isLight ? "text-charcoal/55" : "text-white/80"}`}
      >
        <div
          className={`hidden items-center gap-8 font-sans text-[9px] uppercase tracking-[0.38em] md:flex lg:gap-11`}
        >
          <Link href="/#the-residences" className={`transition-colors ${linkClass}`}>
            {t("navResidences")}
          </Link>
          <Link href="/gallery" className={`transition-colors ${linkClass}`}>
            {t("navGallery")}
          </Link>
          <Link href="/#about-aswar" className={`transition-colors ${linkClass}`}>
            {t("navAboutAswar")}
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
            className={`rounded-none px-3 py-1 font-sans text-[8px] font-extralight uppercase tracking-[0.34em] transition-colors ${ctaClass}`}
          >
            {t("navInquire")}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openBookMeeting}
            className={`rounded-none px-2 py-1 font-sans text-[8px] font-extralight uppercase tracking-[0.3em] transition-colors md:hidden ${ctaClass}`}
          >
            {t("navInquire")}
          </button>
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className={`rounded-none border px-2.5 py-1 font-sans text-[8px] font-extralight uppercase tracking-[0.4em] transition-colors ${
              isLight
                ? "border-charcoal/12 bg-white/40 text-charcoal hover:border-charcoal/22"
                : "border-white/30 bg-white/8 text-white hover:bg-white/14"
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
