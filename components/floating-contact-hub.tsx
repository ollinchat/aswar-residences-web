"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { MessageCircle, Plus, UserRound, X } from "lucide-react";
import type { ReactNode } from "react";
import {
  BrandIconFacebook,
  BrandIconGmail,
  BrandIconInstagram,
  BrandIconLinkedIn,
  BrandIconMessenger,
  BrandIconPhone,
  BrandIconTelegram,
  BrandIconWhatsApp,
  BrandIconX,
  BrandIconYouTube,
} from "@/components/contact-brand-icons";
import { useLang } from "@/components/language-provider";
import type { CopyKey, Lang } from "@/lib/i18n";

const glassFab =
  "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/40 text-charcoal shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-[box-shadow,border-color,transform] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal/25";

/** Accessibility — cool silver halo */
const fabGlowSilver =
  "motion-safe:hover:border-slate-200/55 motion-safe:hover:shadow-[0_0_28px_rgba(192,198,210,0.5),0_8px_28px_rgba(0,0,0,0.08)]";

/** Social — soft platinum between silver and gold */
const fabGlowPlatinum =
  "motion-safe:hover:border-stone-200/50 motion-safe:hover:shadow-[0_0_26px_rgba(210,205,198,0.45),0_8px_28px_rgba(0,0,0,0.09)]";

/** Contact — champagne gold */
const fabGlowGoldStrong =
  "motion-safe:hover:border-champagne/45 motion-safe:hover:shadow-[0_0_32px_rgba(212,175,55,0.5),0_8px_28px_rgba(0,0,0,0.11)]";

const hitWrap =
  "flex min-h-[52px] min-w-[52px] items-center justify-center rounded-full";

const LS_TEXT_SIZE = "aswar-a11y-text-size";
const LS_LEGACY_TEXT = "aswar-a11y-text";
const A11Y_CONTRAST = "aswar-a11y-contrast";
const A11Y_UNDERLINE = "aswar-a11y-underline-links";
const CLS_TEXT_SM = "aswar-a11y-text-sm";
const CLS_TEXT_LG = "aswar-a11y-text-lg";
const CLS_GRAYSCALE_FLAG = "aswar-a11y-grayscale";
const CLS_BIG_CURSOR = "aswar-a11y-big-cursor";
const CLS_STOP_ANIM = "aswar-a11y-stop-animations";
const CLS_READABLE = "aswar-a11y-readable-font";
const LS_NEGATIVE = "aswar-a11y-negative";

const menuSpring = {
  type: "spring" as const,
  stiffness: 280,
  damping: 13,
  mass: 0.68,
};

const pillTap = { type: "spring" as const, stiffness: 520, damping: 28 };

const CHANNEL_GLOW: Record<string, string> = {
  wa: "[&_svg]:transition-[filter,transform] motion-safe:hover:[&_svg]:drop-shadow-[0_0_12px_rgba(37,211,102,0.75)]",
  phone:
    "[&_svg]:transition-[filter,transform] motion-safe:hover:[&_svg]:drop-shadow-[0_0_10px_rgba(26,28,30,0.45)]",
  email:
    "[&_svg]:transition-[filter,transform] motion-safe:hover:[&_svg]:drop-shadow-[0_0_12px_rgba(234,67,53,0.5)]",
  messenger:
    "[&_svg]:transition-[filter,transform] motion-safe:hover:[&_svg]:drop-shadow-[0_0_14px_rgba(0,178,255,0.65)]",
  instagram:
    "[&_svg]:transition-[filter,transform] motion-safe:hover:[&_svg]:drop-shadow-[0_0_14px_rgba(225,48,108,0.55)]",
  telegram:
    "[&_svg]:transition-[filter,transform] motion-safe:hover:[&_svg]:drop-shadow-[0_0_14px_rgba(0,136,204,0.75)]",
  facebook:
    "[&_svg]:transition-[filter,transform] motion-safe:hover:[&_svg]:drop-shadow-[0_0_12px_rgba(24,119,242,0.55)]",
  x: "[&_svg]:transition-[filter,transform] motion-safe:hover:[&_svg]:drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]",
  linkedin:
    "[&_svg]:transition-[filter,transform] motion-safe:hover:[&_svg]:drop-shadow-[0_0_12px_rgba(10,102,194,0.55)]",
  youtube:
    "[&_svg]:transition-[filter,transform] motion-safe:hover:[&_svg]:drop-shadow-[0_0_12px_rgba(255,0,0,0.45)]",
};

type TextSize = "sm" | "md" | "lg";

type Channel = {
  id: string;
  href: string;
  external?: boolean;
  labelKey: CopyKey;
  node: ReactNode;
};

function buildContactChannels(): Channel[] {
  const wa =
    process.env.NEXT_PUBLIC_CONTACT_WHATSAPP?.replace(/\D/g, "") ||
    "971400000000";
  const tel = process.env.NEXT_PUBLIC_CONTACT_PHONE_E164 || "+9714000000000";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sales@aswar.ae";
  const mMessenger =
    process.env.NEXT_PUBLIC_CONTACT_MESSENGER_USERNAME || "meta";
  const tg = process.env.NEXT_PUBLIC_CONTACT_TELEGRAM || "aswar";

  return [
    {
      id: "wa",
      href: `https://wa.me/${wa}`,
      external: true,
      labelKey: "hubToolWhatsApp",
      node: <BrandIconWhatsApp />,
    },
    {
      id: "telegram",
      href: `https://t.me/${tg}`,
      external: true,
      labelKey: "hubToolTelegram",
      node: <BrandIconTelegram />,
    },
    {
      id: "phone",
      href: tel.startsWith("tel:") ? tel : `tel:${tel}`,
      labelKey: "hubToolPhone",
      node: <BrandIconPhone />,
    },
    {
      id: "messenger",
      href: `https://m.me/${mMessenger}`,
      external: true,
      labelKey: "hubToolMessenger",
      node: <BrandIconMessenger />,
    },
    {
      id: "email",
      href: `mailto:${email}`,
      labelKey: "hubToolEmail",
      node: <BrandIconGmail />,
    },
  ];
}

function buildSocialChannels(): Channel[] {
  const ig = process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM || "aswar";
  const fb = process.env.NEXT_PUBLIC_CONTACT_FACEBOOK || "aswar";
  const xHandle = process.env.NEXT_PUBLIC_CONTACT_X || "aswar";
  const li =
    process.env.NEXT_PUBLIC_CONTACT_LINKEDIN ||
    "aswar-international-development";
  const ytRaw = process.env.NEXT_PUBLIC_CONTACT_YOUTUBE || "ASWARInternational";
  const yt = ytRaw.replace(/^@/, "");

  return [
    {
      id: "instagram",
      href: `https://www.instagram.com/${ig}/`,
      external: true,
      labelKey: "hubToolInstagram",
      node: <BrandIconInstagram />,
    },
    {
      id: "facebook",
      href: `https://www.facebook.com/${fb}`,
      external: true,
      labelKey: "hubToolFacebook",
      node: <BrandIconFacebook />,
    },
    {
      id: "x",
      href: `https://x.com/${xHandle.replace(/^@/, "")}`,
      external: true,
      labelKey: "hubToolX",
      node: <BrandIconX />,
    },
    {
      id: "linkedin",
      href: `https://www.linkedin.com/company/${li}/`,
      external: true,
      labelKey: "hubToolLinkedIn",
      node: <BrandIconLinkedIn />,
    },
    {
      id: "youtube",
      href: `https://www.youtube.com/@${yt}`,
      external: true,
      labelKey: "hubToolYouTube",
      node: <BrandIconYouTube />,
    },
  ];
}

function readStoredBool(key: string): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(key) === "1";
}

function writeStoredBool(key: string, on: boolean) {
  if (typeof window === "undefined") return;
  if (on) window.localStorage.setItem(key, "1");
  else window.localStorage.removeItem(key);
}

function readTextSize(): TextSize {
  if (typeof window === "undefined") return "md";
  const v = window.localStorage.getItem(LS_TEXT_SIZE);
  if (v === "sm" || v === "lg") return v;
  if (window.localStorage.getItem(LS_LEGACY_TEXT) === "1") return "lg";
  return "md";
}

function writeTextSize(size: TextSize) {
  if (typeof window === "undefined") return;
  if (size === "md") window.localStorage.removeItem(LS_TEXT_SIZE);
  else window.localStorage.setItem(LS_TEXT_SIZE, size);
}

const trayPanel =
  "w-[min(calc(100vw-2rem),20rem)] max-h-[min(70vh,480px)] origin-bottom-left overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-white/30 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl sm:p-3.5 rtl:origin-bottom-right";

function SectionLabel({
  id,
  children,
  lang,
}: {
  id: string;
  children: ReactNode;
  lang: Lang;
}) {
  const cls =
    lang === "ar"
      ? "font-arabic text-[10px] font-semibold leading-[1.72] text-charcoal/55 sm:text-[11px]"
      : "font-serif text-[9px] font-semibold uppercase tracking-[0.2em] text-charcoal/55 sm:text-[10px]";
  return (
    <p id={id} className={`border-b border-white/10 pb-1.5 ${cls}`}>
      {children}
    </p>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/25 px-3 py-2 text-start backdrop-blur-md transition-colors hover:bg-white/40"
    >
      <span className="font-sans text-[11px] font-medium leading-snug tracking-wide text-charcoal rtl:leading-[1.65] sm:text-xs">
        {label}
      </span>
      <span
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          checked ? "bg-charcoal" : "bg-charcoal/15"
        }`}
        aria-hidden
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}

function TextSizeRadios({
  value,
  onChange,
  labelledBy,
  t,
}: {
  value: TextSize;
  onChange: (v: TextSize) => void;
  labelledBy: string;
  t: (k: CopyKey) => string;
}) {
  const sizes: TextSize[] = ["sm", "md", "lg"];
  const labels: Record<TextSize, CopyKey> = {
    sm: "a11yTextSmall",
    md: "a11yTextMedium",
    lg: "a11yTextLarge",
  };
  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      className="flex gap-1.5 rtl:flex-row-reverse"
    >
      {sizes.map((sz) => (
        <button
          key={sz}
          type="button"
          role="radio"
          aria-checked={value === sz}
          onClick={() => onChange(sz)}
          className={`min-h-9 flex-1 rounded-full border px-2 py-1.5 font-sans text-[10px] font-semibold tracking-wide transition-colors sm:text-[11px] ${
            value === sz
              ? "border-charcoal/35 bg-charcoal text-white"
              : "border-white/15 bg-white/20 text-charcoal hover:bg-white/35"
          }`}
        >
          {t(labels[sz])}
        </button>
      ))}
    </div>
  );
}

function ChannelTray({
  channels,
  onPick,
  reduceMotion,
  t,
}: {
  channels: Channel[];
  onPick: () => void;
  reduceMotion: boolean | null;
  t: (k: CopyKey) => string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {channels.map((ch) => (
        <div key={ch.id} className="group relative">
          <span
            className="pointer-events-none absolute bottom-full left-1/2 z-[10060] mb-2 hidden max-w-[220px] -translate-x-1/2 rounded-lg border border-white/20 bg-charcoal/95 px-2 py-1 text-center font-sans text-[10px] font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 md:block whitespace-nowrap"
            role="tooltip"
          >
            {t(ch.labelKey)}
          </span>
          <motion.a
            href={ch.href}
            {...(ch.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={`relative flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-white/15 bg-white/25 p-2 shadow-[0_6px_20px_rgba(0,0,0,0.08)] backdrop-blur-md transition-colors hover:bg-white/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal/25 ${CHANNEL_GLOW[ch.id] ?? ""}`}
            aria-label={t(ch.labelKey)}
            onClick={onPick}
            whileTap={{ scale: 0.94 }}
            {...(reduceMotion
              ? {}
              : {
                  whileHover: { y: -3, scale: 1.04 },
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 22,
                  },
                })}
          >
            {ch.node}
          </motion.a>
        </div>
      ))}
    </div>
  );
}

export function FloatingContactHub() {
  const { t, lang } = useLang();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);

  const [textSize, setTextSize] = useState<TextSize>("md");
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [negativeContrast, setNegativeContrast] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [bigCursor, setBigCursor] = useState(false);
  const [stopAnimations, setStopAnimations] = useState(false);
  const [readableFont, setReadableFont] = useState(false);

  const contactMenuTitleId = useId();
  const socialMenuTitleId = useId();
  const a11yMenuTitleId = useId();
  const sectionTextId = useId();
  const sectionDisplayId = useId();
  const sectionNavId = useId();
  const sectionReadingId = useId();

  const contactChannels = useMemo(() => buildContactChannels(), []);
  const socialChannels = useMemo(() => buildSocialChannels(), []);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      setTextSize(readTextSize());
      setHighContrast(readStoredBool(A11Y_CONTRAST));
      setGrayscale(readStoredBool(CLS_GRAYSCALE_FLAG));
      setNegativeContrast(readStoredBool(LS_NEGATIVE));
      setUnderlineLinks(readStoredBool(A11Y_UNDERLINE));
      setBigCursor(readStoredBool(CLS_BIG_CURSOR));
      setStopAnimations(readStoredBool(CLS_STOP_ANIM));
      setReadableFont(readStoredBool(CLS_READABLE));
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(CLS_TEXT_SM, CLS_TEXT_LG);
    if (textSize === "sm") document.documentElement.classList.add(CLS_TEXT_SM);
    if (textSize === "lg") document.documentElement.classList.add(CLS_TEXT_LG);
    writeTextSize(textSize);
  }, [textSize]);

  useEffect(() => {
    document.documentElement.classList.toggle(A11Y_CONTRAST, highContrast);
    writeStoredBool(A11Y_CONTRAST, highContrast);
  }, [highContrast]);

  useEffect(() => {
    writeStoredBool(CLS_GRAYSCALE_FLAG, grayscale);
  }, [grayscale]);

  useEffect(() => {
    writeStoredBool(LS_NEGATIVE, negativeContrast);
  }, [negativeContrast]);

  useEffect(() => {
    const parts: string[] = [];
    if (highContrast) parts.push("contrast(1.14)", "saturate(1.06)");
    if (grayscale) parts.push("grayscale(1)");
    if (negativeContrast) parts.push("invert(1)", "hue-rotate(180deg)");
    document.body.style.filter = parts.length ? parts.join(" ") : "";
    return () => {
      document.body.style.filter = "";
    };
  }, [highContrast, grayscale, negativeContrast]);

  useEffect(() => {
    document.documentElement.classList.toggle(A11Y_UNDERLINE, underlineLinks);
    writeStoredBool(A11Y_UNDERLINE, underlineLinks);
  }, [underlineLinks]);

  useEffect(() => {
    document.documentElement.classList.toggle(CLS_BIG_CURSOR, bigCursor);
    writeStoredBool(CLS_BIG_CURSOR, bigCursor);
  }, [bigCursor]);

  useEffect(() => {
    document.documentElement.classList.toggle(CLS_STOP_ANIM, stopAnimations);
    writeStoredBool(CLS_STOP_ANIM, stopAnimations);
  }, [stopAnimations]);

  useEffect(() => {
    document.documentElement.classList.toggle(CLS_READABLE, readableFont);
    writeStoredBool(CLS_READABLE, readableFont);
  }, [readableFont]);

  const closeAll = useCallback(() => {
    setContactOpen(false);
    setSocialOpen(false);
    setA11yOpen(false);
  }, []);

  const toggleA11y = useCallback(() => {
    setContactOpen(false);
    setSocialOpen(false);
    setA11yOpen((o) => !o);
  }, []);

  const toggleSocial = useCallback(() => {
    setContactOpen(false);
    setA11yOpen(false);
    setSocialOpen((o) => !o);
  }, []);

  const toggleContact = useCallback(() => {
    setSocialOpen(false);
    setA11yOpen(false);
    setContactOpen((o) => !o);
  }, []);

  useEffect(() => {
    if (!contactOpen && !socialOpen && !a11yOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [contactOpen, socialOpen, a11yOpen, closeAll]);

  const overlayOpen = contactOpen || socialOpen || a11yOpen;
  const menuTransition = useMemo(
    () => (reduceMotion ? { duration: 0.2 } : menuSpring),
    [reduceMotion],
  );
  const fadeTransition = useMemo(
    () => (reduceMotion ? { duration: 0.15 } : { duration: 0.22 }),
    [reduceMotion],
  );

  const menuMotion = useMemo(
    () => ({
      initial: reduceMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            y: 28,
            scale: 0.94,
            x: lang === "ar" ? 16 : -16,
          },
      animate: { opacity: 1, y: 0, scale: 1, x: 0 },
      exit: reduceMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            y: 14,
            scale: 0.95,
            x: lang === "ar" ? 10 : -10,
          },
      transition: menuTransition,
    }),
    [reduceMotion, lang, menuTransition],
  );

  const tree = (
    <>
      <AnimatePresence>
        {overlayOpen ? (
          <motion.button
            key="hub-backdrop"
            type="button"
            aria-label={t("hubAriaCloseAll")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fadeTransition}
            className="aswar-floating-hub-backdrop pointer-events-auto z-[9998] bg-charcoal/[0.07] backdrop-blur-[2px]"
            onClick={closeAll}
          />
        ) : null}
      </AnimatePresence>

      <div className="aswar-floating-hub-root z-[9999] flex flex-col items-start gap-2.5">
        <div className="pointer-events-auto flex flex-col gap-2.5">
          {/* Accessibility */}
          <div className="flex w-full flex-col items-start gap-1.5">
            <AnimatePresence>
              {a11yOpen ? (
                <motion.div
                  key="a11y-menu"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={a11yMenuTitleId}
                  {...menuMotion}
                  className={trayPanel}
                >
                  <p
                    id={a11yMenuTitleId}
                    className={
                      lang === "ar"
                        ? "mb-2 font-arabic text-xs font-semibold leading-[1.72] text-charcoal"
                        : "mb-2 font-serif text-[10px] font-semibold uppercase tracking-[0.24em] text-charcoal sm:text-[11px]"
                    }
                  >
                    {t("a11yMenuTitle")}
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <SectionLabel id={sectionTextId} lang={lang}>
                        {t("hubSectionA11yText")}
                      </SectionLabel>
                      <TextSizeRadios
                        value={textSize}
                        onChange={setTextSize}
                        labelledBy={sectionTextId}
                        t={t}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <SectionLabel id={sectionDisplayId} lang={lang}>
                        {t("hubSectionA11yDisplay")}
                      </SectionLabel>
                      <div className="flex flex-col gap-1.5">
                        <ToggleRow
                          label={t("a11yHighContrast")}
                          checked={highContrast}
                          onChange={setHighContrast}
                        />
                        <ToggleRow
                          label={t("a11yGrayscale")}
                          checked={grayscale}
                          onChange={setGrayscale}
                        />
                        <ToggleRow
                          label={t("a11yNegativeContrast")}
                          checked={negativeContrast}
                          onChange={setNegativeContrast}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <SectionLabel id={sectionNavId} lang={lang}>
                        {t("hubSectionA11yNav")}
                      </SectionLabel>
                      <div className="flex flex-col gap-1.5">
                        <ToggleRow
                          label={t("a11yUnderlineLinks")}
                          checked={underlineLinks}
                          onChange={setUnderlineLinks}
                        />
                        <ToggleRow
                          label={t("a11yBigCursor")}
                          checked={bigCursor}
                          onChange={setBigCursor}
                        />
                        <ToggleRow
                          label={t("a11yStopAnimations")}
                          checked={stopAnimations}
                          onChange={setStopAnimations}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <SectionLabel id={sectionReadingId} lang={lang}>
                        {t("hubSectionA11yReading")}
                      </SectionLabel>
                      <ToggleRow
                        label={t("a11yReadableFont")}
                        checked={readableFont}
                        onChange={setReadableFont}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className={hitWrap}>
              <motion.button
                type="button"
                onClick={toggleA11y}
                aria-expanded={a11yOpen}
                aria-haspopup="dialog"
                aria-label={
                  a11yOpen ? t("hubAriaA11yClose") : t("hubAriaA11yOpen")
                }
                whileTap={{ scale: 0.94 }}
                transition={pillTap}
                className={`${glassFab} ${fabGlowSilver}`}
              >
                <UserRound className="h-5 w-5" strokeWidth={1.25} aria-hidden />
              </motion.button>
            </div>
          </div>

          {/* Social */}
          <div className="flex w-full flex-col items-start gap-1.5">
            <AnimatePresence>
              {socialOpen ? (
                <motion.div
                  key="social-menu"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={socialMenuTitleId}
                  {...menuMotion}
                  className={trayPanel}
                >
                  <p
                    id={socialMenuTitleId}
                    className={
                      lang === "ar"
                        ? "mb-2 font-arabic text-xs font-semibold leading-[1.72] text-charcoal"
                        : "mb-2 font-serif text-[9px] font-semibold uppercase tracking-[0.22em] text-charcoal/60 sm:text-[10px]"
                    }
                  >
                    {t("hubSocialMenuTitle")}
                  </p>
                  <ChannelTray
                    channels={socialChannels}
                    onPick={() => setSocialOpen(false)}
                    reduceMotion={reduceMotion}
                    t={t}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className={hitWrap}>
              <motion.button
                type="button"
                onClick={toggleSocial}
                aria-expanded={socialOpen}
                aria-haspopup="dialog"
                aria-label={
                  socialOpen ? t("hubAriaSocialClose") : t("hubAriaSocialOpen")
                }
                whileTap={{ scale: 0.94 }}
                transition={pillTap}
                className={`${glassFab} ${fabGlowPlatinum}`}
              >
                <motion.span
                  aria-hidden
                  animate={{ rotate: socialOpen ? 45 : 0 }}
                  transition={pillTap}
                  className="flex items-center justify-center text-charcoal"
                >
                  <Plus className="h-5 w-5" strokeWidth={1.35} />
                </motion.span>
              </motion.button>
            </div>
          </div>

          {/* Contact */}
          <div className="flex w-full flex-col items-start gap-1.5">
            <AnimatePresence>
              {contactOpen ? (
                <motion.div
                  key="contact-menu"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={contactMenuTitleId}
                  {...menuMotion}
                  className={trayPanel}
                >
                  <p
                    id={contactMenuTitleId}
                    className={
                      lang === "ar"
                        ? "mb-2 font-arabic text-xs font-semibold leading-[1.72] text-charcoal"
                        : "mb-2 font-serif text-[9px] font-semibold uppercase tracking-[0.22em] text-charcoal/60 sm:text-[10px]"
                    }
                  >
                    {t("hubContactMenuTitle")}
                  </p>
                  <ChannelTray
                    channels={contactChannels}
                    onPick={() => setContactOpen(false)}
                    reduceMotion={reduceMotion}
                    t={t}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className={hitWrap}>
              <motion.button
                type="button"
                onClick={toggleContact}
                aria-expanded={contactOpen}
                aria-haspopup="dialog"
                aria-label={
                  contactOpen ? t("hubAriaClose") : t("hubAriaOpen")
                }
                whileTap={{ scale: 0.94 }}
                transition={pillTap}
                className={`${glassFab} ring-1 ring-white/15 ${fabGlowGoldStrong}`}
              >
                <span className="flex h-5 w-5 items-center justify-center">
                  {contactOpen ? (
                    <X className="h-5 w-5" strokeWidth={1.25} aria-hidden />
                  ) : (
                    <MessageCircle
                      className="h-5 w-5"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                  )}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (!mounted) return null;

  return createPortal(tree, document.body);
}
