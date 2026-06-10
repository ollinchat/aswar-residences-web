"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeritageProjectGallery } from "@/components/heritage-project-gallery";
import { LuxuryRevealItem, LuxuryStagger } from "@/components/luxury-reveal";
import { useLang } from "@/components/language-provider";

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
      className="border-t border-charcoal/[0.06] bg-white px-6 py-12 text-charcoal md:px-12 md:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <LuxuryStagger className="mx-auto mb-8 max-w-4xl text-center">
          <LuxuryRevealItem>
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-[#9A8550]">
              {t("heritageTitle")}
            </p>
          </LuxuryRevealItem>
          <LuxuryRevealItem>
            <h2
              className={`mt-2 text-[clamp(1.65rem,3.2vw,2.25rem)] font-extralight tracking-[0.14em] text-[#0f172a] ${serif}`}
            >
              {t("heritageName")}
            </h2>
          </LuxuryRevealItem>
        </LuxuryStagger>

        <article className="mx-auto w-full max-w-4xl rounded-[4px] border border-charcoal/[0.08] bg-[#F7F6F4] p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] md:p-7">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-10">
            <div className="flex flex-col items-center md:items-start">
              <p className="font-mono text-[8px] uppercase tracking-[0.42em] text-charcoal/36">
                {t("engineeringSealTitle")}
              </p>

              <a
                href="https://www.sami-najami.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block w-full max-w-[260px] rounded-[2px] border border-charcoal/[0.08] bg-white px-4 py-4 transition-opacity hover:opacity-90 md:max-w-none"
                aria-label="Sami Najami — official site"
              >
                <Image
                  src="/partners/sami-najami-logo.png"
                  alt="Sami Najami Engineering & Projects L.T.D"
                  width={560}
                  height={160}
                  className="h-auto w-full object-contain object-center md:object-start"
                  sizes="(max-width: 768px) 240px, 220px"
                />
              </a>

              <p
                className={`mt-2 font-mono text-[7px] uppercase tracking-[0.48em] text-charcoal/26 ${rtl ? "font-arabic" : ""}`}
              >
                {t("engineeringSealParent")}
              </p>
            </div>

            <div className="flex min-w-0 flex-col justify-center border-charcoal/[0.06] md:border-s md:ps-8 lg:ps-10">
              <p
                className={`text-[14px] font-normal leading-[1.68] text-charcoal/70 md:text-[15px] md:leading-[1.72] ${bodyFont}`}
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
                      marginTop: 12,
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
                      className={`text-[14px] font-normal leading-[1.68] text-charcoal/58 md:text-[15px] md:leading-[1.72] ${bodyFont}`}
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
                className={`mt-4 inline-flex w-fit items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9A8550] transition-colors hover:text-[#7d6b40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A8550]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F6F4] ${rtl ? "font-arabic" : ""}`}
              >
                {bioExpanded ? t("heritageReadLess") : t("heritageReadMore")}
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-500 ${bioExpanded ? "rotate-180" : ""}`}
                  strokeWidth={1.5}
                  aria-hidden
                />
              </button>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <a
                  href="https://www.sami-najami.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-[2px] border border-charcoal/12 bg-[#0a0a0a]/90 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-zinc-950/85"
                >
                  {t("heritageSite")} ↗
                </a>
                <a
                  href="/partners/sami-najami-brand.pdf"
                  download
                  className="inline-flex rounded-[2px] border border-charcoal/15 bg-white px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-charcoal/65 transition-colors hover:border-charcoal/30 hover:text-charcoal"
                >
                  {t("downloadPdf")}
                </a>
              </div>
            </div>
          </div>
        </article>

        <div className="mx-auto mt-10 w-full max-w-6xl md:mt-12">
          <HeritageProjectGallery variant="masonry" />
        </div>
      </div>
    </section>
  );
}
