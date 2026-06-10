"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeritageProjectGallery } from "@/components/heritage-project-gallery";
import { LuxuryRevealItem, LuxuryStagger } from "@/components/luxury-reveal";
import { useLang } from "@/components/language-provider";
import type { CopyKey } from "@/lib/i18n";

const HERITAGE_TAG_KEYS = [
  "heritageTagEngineering",
  "heritageTagHighRise",
  "heritageTagGovernance",
] as const satisfies readonly CopyKey[];

export function SamiNajamiHeritage() {
  const { t, lang } = useLang();
  const reduceMotion = useReducedMotion();
  const [bioExpanded, setBioExpanded] = useState(false);
  const serif = lang === "ar" ? "font-arabic" : "font-playfair";
  const bodyFont = lang === "ar" ? "font-arabic" : "font-urbanist";
  const rtl = lang === "ar";

  const expandTransition = reduceMotion
    ? { duration: 0.12 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      id="heritage"
      className="border-t border-charcoal/[0.06] bg-white px-6 py-16 text-charcoal md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <LuxuryStagger className="mx-auto mb-10 max-w-4xl text-center md:mb-12">
          <LuxuryRevealItem>
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-[#9A8550]">
              {t("heritageTitle")}
            </p>
          </LuxuryRevealItem>
          <LuxuryRevealItem>
            <h2
              className={`mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-extralight tracking-[0.14em] text-[#0f172a] ${serif}`}
            >
              {t("heritageName")}
            </h2>
          </LuxuryRevealItem>
        </LuxuryStagger>

        <article className="mx-auto w-full max-w-4xl rounded-[4px] border border-charcoal/[0.08] bg-[#F7F6F4] p-8 shadow-[0_20px_48px_rgba(15,23,42,0.07),0_4px_16px_rgba(15,23,42,0.04)] md:p-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:items-start md:gap-12 lg:gap-14">
            <div className="flex flex-col items-center md:items-start">
              <p className="w-full text-center font-mono text-[9px] uppercase tracking-[0.45em] text-charcoal/38 md:text-start">
                {t("engineeringSealTitle")}
              </p>

              <a
                href="https://www.sami-najami.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block w-full max-w-[340px] rounded-[2px] border border-charcoal/[0.08] bg-white px-6 py-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-opacity hover:opacity-90 md:max-w-none md:px-7 md:py-7"
                aria-label="Sami Najami — official site"
              >
                <Image
                  src="/partners/sami-najami-logo.png"
                  alt="Sami Najami Engineering & Projects L.T.D"
                  width={560}
                  height={160}
                  className="h-auto w-full object-contain object-center md:object-start"
                  sizes="(max-width: 768px) 300px, 280px"
                />
              </a>

              <p
                className={`mt-4 text-center font-mono text-[8px] uppercase tracking-[0.5em] text-charcoal/28 md:text-start ${rtl ? "font-arabic" : ""}`}
              >
                {t("engineeringSealParent")}
              </p>
            </div>

            <div className="min-w-0">
              <ul
                className="flex flex-wrap justify-center gap-2 md:justify-start md:gap-2.5"
                aria-label={t("heritageTags")}
              >
                {HERITAGE_TAG_KEYS.map((tagKey) => (
                  <li key={tagKey}>
                    <span
                      className={`inline-flex items-center rounded-full border border-[#9A8550]/28 bg-white/90 px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-charcoal/58 shadow-[inset_0_0_0_1px_rgba(154,133,80,0.08)] md:text-[10px] ${rtl ? "font-arabic normal-case tracking-normal" : ""}`}
                    >
                      {t(tagKey)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-[2px] border border-charcoal/[0.06] bg-white/70 px-5 py-6 md:px-6 md:py-7">
                <p
                  className={`text-[14px] font-normal leading-[1.72] text-charcoal/68 md:text-[15px] md:leading-[1.78] ${bodyFont}`}
                  dir={rtl ? "rtl" : "ltr"}
                >
                  {t("heritageBioTeaser")}
                </p>

                <AnimatePresence initial={false}>
                  {bioExpanded ? (
                    <motion.div
                      key="bio-extended"
                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, height: 0, marginTop: 0 }
                      }
                      animate={{
                        opacity: 1,
                        height: "auto",
                        marginTop: 16,
                      }}
                      exit={
                        reduceMotion
                          ? undefined
                          : { opacity: 0, height: 0, marginTop: 0 }
                      }
                      transition={expandTransition}
                      className="overflow-hidden"
                    >
                      <p
                        className={`text-[14px] font-normal leading-[1.72] text-charcoal/58 md:text-[15px] md:leading-[1.78] ${bodyFont}`}
                        dir={rtl ? "rtl" : "ltr"}
                      >
                        {t("heritageBioExtended")}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setBioExpanded((prev) => !prev)}
                  aria-expanded={bioExpanded}
                  className={`group mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#9A8550] transition-colors hover:text-[#7d6b40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A8550]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${rtl ? "font-arabic" : ""}`}
                >
                  {bioExpanded ? t("heritageReadLess") : t("heritageReadMore")}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-500 ${bioExpanded ? "rotate-180" : ""}`}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start md:gap-4">
                <a
                  href="https://www.sami-najami.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-[2px] border border-charcoal/12 bg-[#0a0a0a]/90 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-xl transition-colors hover:bg-zinc-950/85"
                >
                  {t("heritageSite")} ↗
                </a>
                <a
                  href="/partners/sami-najami-brand.pdf"
                  download
                  className="inline-flex rounded-[2px] border border-charcoal/15 bg-white px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/70 transition-colors hover:border-charcoal/30 hover:text-charcoal"
                >
                  {t("downloadPdf")}
                </a>
              </div>
            </div>
          </div>
        </article>

        <div className="mx-auto mt-14 w-full max-w-6xl md:mt-16">
          <HeritageProjectGallery variant="masonry" />
        </div>
      </div>
    </section>
  );
}
