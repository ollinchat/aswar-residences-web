"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { LuxuryFadeUp, LuxuryRevealItem, LuxuryStagger } from "@/components/luxury-reveal";
import { useLang } from "@/components/language-provider";
import { fillImageParentStyle } from "@/lib/image-layout";
import { useRef } from "react";

const CEO_PORTRAIT_SRC = "/images/about/ahmad-najami-ceo.png";

export function AboutAswarSection() {
  const { t, lang } = useLang();
  const serif = lang === "ar" ? "font-arabic" : "font-playfair";
  const sansCaps =
    lang === "ar"
      ? "font-arabic normal-case tracking-normal"
      : "font-urbanist uppercase";

  const ceoRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ceoRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);
  const quoteY = useTransform(scrollYProgress, [0, 1], ["11%", "-4%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  return (
    <section
      id="about-aswar"
      className="relative scroll-mt-24 overflow-hidden border-t border-charcoal/10 bg-white"
      style={{ position: "relative" }}
      aria-labelledby="about-aswar-heading"
    >
      <div className="px-6 py-32 md:px-14 md:py-40">
        <div className="relative z-[1] mx-auto max-w-[1200px]">
          <LuxuryStagger className="max-w-2xl">
            <LuxuryRevealItem>
              <p className="font-sans text-[9px] font-extralight uppercase tracking-[0.52em] text-[#0f172a]/35">
                {t("aboutKicker")}
              </p>
            </LuxuryRevealItem>
            <LuxuryRevealItem>
              <h2
                id="about-aswar-heading"
                className={`mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] font-extralight tracking-[0.2em] text-[#0f172a] ${serif}`}
              >
                {t("aboutTitle")}
              </h2>
            </LuxuryRevealItem>
            <LuxuryRevealItem>
              <p
                className={`mt-7 text-[11px] font-extralight uppercase leading-relaxed tracking-[0.28em] text-[#0f172a]/48 md:text-[12px] ${sansCaps}`}
              >
                {t("aboutLead")}
              </p>
            </LuxuryRevealItem>
            <LuxuryRevealItem>
              <p
                className={`mt-10 max-w-3xl text-base font-extralight leading-relaxed tracking-[0.04em] text-[#0f172a]/82 md:text-lg ${serif}`}
              >
                {t("aboutBody")}
              </p>
            </LuxuryRevealItem>
          </LuxuryStagger>
        </div>
      </div>

      <aside
        ref={ceoRef}
        className="relative overflow-hidden bg-[#1a1a1a]"
        style={{ position: "relative" }}
        aria-labelledby="about-ceo-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,rgba(154,133,80,0.14),transparent_55%),radial-gradient(ellipse_70%_50%_at_85%_80%,rgba(154,133,80,0.08),transparent_50%),linear-gradient(155deg,#1a1a1a_0%,#141210_48%,#1c1814_100%)]"
          aria-hidden
        />

        <motion.div
          className="pointer-events-none absolute -start-[10%] top-[8%] h-[min(52vw,420px)] w-[min(52vw,420px)] rounded-full bg-[#9A8550]/[0.07] blur-3xl"
          style={reduceMotion ? undefined : { y: glowY }}
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-y-0 end-0 w-[min(42vw,520px)] bg-gradient-to-l from-[#f5f0e8]/[0.035] to-transparent" aria-hidden />

        <div className="relative z-[1] mx-auto max-w-[1320px] px-6 py-20 md:px-14 md:py-28 lg:py-36">
          <LuxuryStagger>
            <LuxuryRevealItem>
              <p
                className={`text-[9px] font-extralight uppercase tracking-[0.58em] text-[#9A8550]/72 ${sansCaps}`}
              >
                {t("aboutCeoKicker")}
              </p>
            </LuxuryRevealItem>
            <LuxuryRevealItem>
              <h3
                id="about-ceo-heading"
                className={`mt-4 max-w-xl text-[clamp(1.125rem,2.2vw,1.625rem)] font-extralight tracking-[0.22em] text-[#f5f0e8]/88 ${serif}`}
              >
                {t("aboutCeoHeading")}
              </h3>
            </LuxuryRevealItem>
          </LuxuryStagger>

          <div className="relative mt-14 md:mt-20 lg:mt-24">
            <p
              className={`pointer-events-none absolute -start-2 top-0 z-0 select-none text-[clamp(3rem,10vw,7rem)] font-extralight leading-none text-[#9A8550]/[0.09] md:-start-4 md:-top-4 ${serif}`}
              aria-hidden
            >
              {lang === "ar" ? "«" : "“"}
            </p>

            <div className="relative grid items-start gap-8 md:grid-cols-12 md:gap-12 lg:items-center lg:gap-14">
              <LuxuryFadeUp className="relative z-20 md:col-span-5 lg:col-span-4">
                <motion.div
                  className="relative mx-auto w-full max-w-[min(100%,300px)] md:mx-0 md:max-w-[280px] lg:max-w-[300px]"
                  style={
                    reduceMotion
                      ? { position: "relative" }
                      : { position: "relative", y: portraitY }
                  }
                >
                  <div
                    className="pointer-events-none absolute -bottom-4 -end-4 inset-3 border border-[#9A8550]/50 md:-bottom-5 md:-end-5 md:inset-4"
                    aria-hidden
                  />
                  <figure
                    className="relative aspect-[3/4] w-full overflow-hidden bg-[#2a2520] shadow-[0_28px_56px_rgba(0,0,0,0.55),0_8px_24px_rgba(154,133,80,0.12)]"
                    style={fillImageParentStyle}
                  >
                    <Image
                      src={CEO_PORTRAIT_SRC}
                      alt={t("aboutCeoPortraitAlt")}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 80vw, 340px"
                      quality={75}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/55 via-transparent to-transparent"
                      aria-hidden
                    />
                  </figure>
                </motion.div>
              </LuxuryFadeUp>

              <LuxuryFadeUp className="relative z-10 md:col-span-7 md:col-start-6 lg:col-span-8 lg:col-start-5">
                <motion.blockquote
                  className="relative border-s border-[#9A8550]/35 ps-6 md:ps-8 lg:ps-10"
                  style={
                    reduceMotion
                      ? { position: "relative" }
                      : { position: "relative", y: quoteY }
                  }
                >
                  <p
                    className={`max-w-2xl text-[clamp(1.125rem,2vw,1.75rem)] font-extralight leading-[1.6] tracking-[0.01em] text-[#f5f0e8] md:leading-relaxed ${serif}`}
                  >
                    {t("aboutCeoQuote")}
                  </p>

                  <footer className="mt-8 md:mt-10">
                    <div className="mb-5 h-px w-12 bg-[#9A8550]/45" aria-hidden />
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5f0e8] md:text-xs ${lang === "ar" ? "font-arabic normal-case tracking-normal" : "font-urbanist"}`}
                    >
                      {t("aboutCeoName")}
                    </p>
                    <p
                      className={`mt-2.5 text-[9px] font-extralight uppercase tracking-[0.32em] text-[#9A8550]/78 md:text-[10px] ${sansCaps}`}
                    >
                      {t("aboutCeoTitle")}
                    </p>
                  </footer>
                </motion.blockquote>
              </LuxuryFadeUp>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#9A8550]/35 to-transparent"
          aria-hidden
        />
      </aside>
    </section>
  );
}
