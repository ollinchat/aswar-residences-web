"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { CircleUser, MessageCircle, Phone, X } from "lucide-react";
import type { ReactNode } from "react";
import {
  BrandIconGmail,
  BrandIconInstagram,
  BrandIconMessenger,
  BrandIconTelegram,
  BrandIconWhatsApp,
} from "@/components/contact-brand-icons";
import { useLang } from "@/components/language-provider";
import type { CopyKey } from "@/lib/i18n";

const A11Y_TEXT = "aswar-a11y-text";
const A11Y_CONTRAST = "aswar-a11y-contrast";
const A11Y_UNDERLINE = "aswar-a11y-underline";

const spring = { type: "spring" as const, stiffness: 420, damping: 28 };

type Channel = {
  id: string;
  href: string;
  external?: boolean;
  labelKey: CopyKey;
  node: ReactNode;
};

function buildChannels(): Channel[] {
  const wa =
    process.env.NEXT_PUBLIC_CONTACT_WHATSAPP?.replace(/\D/g, "") ||
    "971400000000";
  const tel = process.env.NEXT_PUBLIC_CONTACT_PHONE_E164 || "+9714000000000";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sales@aswar.ae";
  const mMessenger =
    process.env.NEXT_PUBLIC_CONTACT_MESSENGER_USERNAME || "meta";
  const ig = process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM || "aswar";
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
      id: "phone",
      href: tel.startsWith("tel:") ? tel : `tel:${tel}`,
      labelKey: "hubToolPhone",
      node: (
        <Phone
          className="h-[19px] w-[19px] text-charcoal"
          strokeWidth={1.35}
          aria-hidden
        />
      ),
    },
    {
      id: "email",
      href: `mailto:${email}`,
      labelKey: "hubToolEmail",
      node: <BrandIconGmail />,
    },
    {
      id: "messenger",
      href: `https://m.me/${mMessenger}`,
      external: true,
      labelKey: "hubToolMessenger",
      node: <BrandIconMessenger />,
    },
    {
      id: "instagram",
      href: `https://www.instagram.com/${ig}/`,
      external: true,
      labelKey: "hubToolInstagram",
      node: <BrandIconInstagram />,
    },
    {
      id: "telegram",
      href: `https://t.me/${tg}`,
      external: true,
      labelKey: "hubToolTelegram",
      node: <BrandIconTelegram />,
    },
  ];
}

function readStored(key: string): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(key) === "1";
}

function writeStored(key: string, on: boolean) {
  if (typeof window === "undefined") return;
  if (on) window.localStorage.setItem(key, "1");
  else window.localStorage.removeItem(key);
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
      className="flex w-full items-center justify-between gap-4 rounded-[2px] border border-charcoal/[0.06] bg-white/90 px-3 py-2.5 text-start transition-colors hover:bg-white"
    >
      <span className="font-sans text-[11px] font-medium tracking-wide text-charcoal">
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

export function FloatingContactHub() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  const [contactOpen, setContactOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);
  const [textLarge, setTextLarge] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);

  const contactMenuTitleId = useId();
  const a11yMenuTitleId = useId();
  const channels = useMemo(() => buildChannels(), []);

  useEffect(() => {
    const t0 = readStored(A11Y_TEXT);
    const c0 = readStored(A11Y_CONTRAST);
    const u0 = readStored(A11Y_UNDERLINE);
    queueMicrotask(() => {
      setTextLarge(t0);
      setHighContrast(c0);
      setUnderlineLinks(u0);
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle(A11Y_TEXT, textLarge);
    writeStored(A11Y_TEXT, textLarge);
  }, [textLarge]);

  useEffect(() => {
    document.documentElement.classList.toggle(A11Y_CONTRAST, highContrast);
    writeStored(A11Y_CONTRAST, highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.classList.toggle(A11Y_UNDERLINE, underlineLinks);
    writeStored(A11Y_UNDERLINE, underlineLinks);
  }, [underlineLinks]);

  const closeAll = useCallback(() => {
    setContactOpen(false);
    setA11yOpen(false);
  }, []);

  const toggleContact = useCallback(() => {
    setA11yOpen(false);
    setContactOpen((o) => !o);
  }, []);

  const toggleA11y = useCallback(() => {
    setContactOpen(false);
    setA11yOpen((o) => !o);
  }, []);

  useEffect(() => {
    if (!contactOpen && !a11yOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [contactOpen, a11yOpen, closeAll]);

  const overlayOpen = contactOpen || a11yOpen;

  const transition = reduceMotion
    ? { duration: 0.2 }
    : { type: "spring" as const, stiffness: 380, damping: 26, mass: 0.85 };

  const fabShell =
    "border border-charcoal/[0.08] bg-white/95 text-charcoal shadow-[0_8px_32px_-12px_rgba(26,28,30,0.28)] backdrop-blur-md backdrop-saturate-150 transition-shadow hover:shadow-[0_12px_36px_-12px_rgba(26,28,30,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal/25";

  return (
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
            transition={reduceMotion ? { duration: 0.15 } : transition}
            className="pointer-events-auto fixed inset-0 z-[84] bg-charcoal/[0.06] backdrop-blur-[2px]"
            onClick={closeAll}
          />
        ) : null}
      </AnimatePresence>

      {/*
        Physical left edge (left-6) — not logical start — so position stays the same in RTL (Arabic).
      */}
      <div className="pointer-events-none fixed bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] left-6 z-[85] flex flex-col items-start gap-3 md:bottom-[max(2rem,env(safe-area-inset-bottom,0px))] md:left-8">
        {/* Accessibility */}
        <div className="pointer-events-auto flex flex-col items-start gap-2">
          <AnimatePresence>
            {a11yOpen ? (
              <motion.div
                key="a11y-menu"
                role="dialog"
                aria-modal="true"
                aria-labelledby={a11yMenuTitleId}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.94, y: 10 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.94, y: 8 }
                }
                transition={transition}
                className="w-[min(100vw-3rem,220px)] rounded-[2px] border border-charcoal/[0.08] bg-white/95 p-2.5 shadow-[0_12px_40px_-14px_rgba(26,28,30,0.22)] backdrop-blur-md backdrop-saturate-150"
              >
                <p
                  id={a11yMenuTitleId}
                  className="border-b border-charcoal/[0.06] pb-2 font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-charcoal/45"
                >
                  {t("a11yMenuTitle")}
                </p>
                <div className="mt-2 flex flex-col gap-1.5">
                  <ToggleRow
                    label={t("a11yIncreaseText")}
                    checked={textLarge}
                    onChange={setTextLarge}
                  />
                  <ToggleRow
                    label={t("a11yHighContrast")}
                    checked={highContrast}
                    onChange={setHighContrast}
                  />
                  <ToggleRow
                    label={t("a11yUnderlineLinks")}
                    checked={underlineLinks}
                    onChange={setUnderlineLinks}
                  />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={toggleA11y}
            aria-expanded={a11yOpen}
            aria-haspopup="dialog"
            aria-label={a11yOpen ? t("hubAriaA11yClose") : t("hubAriaA11yOpen")}
            whileTap={{ scale: 0.96 }}
            transition={spring}
            className={`flex h-12 w-12 items-center justify-center rounded-full ${fabShell}`}
          >
            <CircleUser className="h-6 w-6" strokeWidth={1.25} aria-hidden />
          </motion.button>
        </div>

        {/* Contact */}
        <div className="pointer-events-auto flex flex-col items-start gap-2">
          <AnimatePresence>
            {contactOpen ? (
              <motion.div
                key="hub-menu"
                role="dialog"
                aria-modal="true"
                aria-labelledby={contactMenuTitleId}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.94, y: 12 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.94, y: 10 }
                }
                transition={transition}
                className="flex flex-col-reverse gap-2 rounded-[2px] border border-charcoal/[0.08] bg-white/95 p-2.5 shadow-[0_12px_40px_-14px_rgba(26,28,30,0.22)] backdrop-blur-md backdrop-saturate-150"
              >
                <p id={contactMenuTitleId} className="sr-only">
                  {t("hubMenuTitle")}
                </p>
                {channels.map((ch, index) => (
                  <motion.div
                    key={ch.id}
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 12, scale: 0.96 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 8, scale: 0.96 }
                    }
                    transition={{
                      ...transition,
                      delay: reduceMotion ? 0 : index * 0.04,
                    }}
                    className="group relative flex items-center justify-start"
                  >
                    <span
                      className="pointer-events-none absolute left-full top-1/2 z-10 ml-3 hidden max-w-[200px] -translate-y-1/2 rounded-[2px] border border-charcoal/[0.08] bg-charcoal px-2.5 py-1.5 text-start font-sans text-[10px] font-medium leading-snug tracking-wide text-white opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 md:block whitespace-nowrap"
                      role="tooltip"
                    >
                      {t(ch.labelKey)}
                    </span>
                    <a
                      href={ch.href}
                      title={t(ch.labelKey)}
                      {...(ch.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="flex h-11 w-11 items-center justify-center rounded-[2px] bg-white shadow-[inset_0_0_0_1px_rgba(26,28,30,0.06)] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal/25"
                      aria-label={t(ch.labelKey)}
                      onClick={() => setContactOpen(false)}
                    >
                      {ch.node}
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={toggleContact}
            aria-expanded={contactOpen}
            aria-haspopup="dialog"
            aria-label={
              contactOpen ? t("hubAriaClose") : t("hubAriaOpen")
            }
            whileTap={{ scale: 0.96 }}
            transition={spring}
            className={`flex h-14 w-14 items-center justify-center rounded-full ${fabShell}`}
          >
            <motion.span
              animate={{ rotate: contactOpen ? 90 : 0 }}
              transition={spring}
              className="flex items-center justify-center"
            >
              {contactOpen ? (
                <X className="h-6 w-6" strokeWidth={1} aria-hidden />
              ) : (
                <MessageCircle className="h-6 w-6" strokeWidth={1} aria-hidden />
              )}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </>
  );
}
