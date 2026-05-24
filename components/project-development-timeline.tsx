"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LuxuryRevealItem, LuxuryStagger } from "@/components/luxury-reveal";
import { useLang } from "@/components/language-provider";
import { fillImageParentStyle } from "@/lib/image-layout";
import {
  CURRENT_TIMELINE_STAGE_ID,
  PROJECT_TIMELINE_STAGES,
  timelineStageIndex,
  type TimelineStage,
} from "@/lib/project-timeline";

function initialStage(): TimelineStage {
  return (
    PROJECT_TIMELINE_STAGES.find((s) => s.id === CURRENT_TIMELINE_STAGE_ID) ??
    PROJECT_TIMELINE_STAGES[0]!
  );
}

export function ProjectDevelopmentTimeline() {
  const { t, lang } = useLang();
  const reduceMotion = useReducedMotion();
  const serif = lang === "ar" ? "font-arabic" : "font-playfair";
  const [activeStep, setActiveStep] = useState<TimelineStage>(initialStage);

  const activeIndex = useMemo(
    () => PROJECT_TIMELINE_STAGES.findIndex((s) => s.id === activeStep.id),
    [activeStep.id],
  );

  const renderTransition = reduceMotion
    ? { duration: 0.12 }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

  const panelTransition = reduceMotion
    ? { duration: 0.12 }
    : { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <section
      id="project-timeline"
      className="scroll-mt-24 overflow-hidden border-t border-charcoal/10 bg-[#FAFAFA] px-6 py-32 md:px-14 md:py-40"
      aria-labelledby="project-timeline-heading"
    >
      <div className="mx-auto max-w-7xl">
        <LuxuryStagger className="mb-16 text-center md:mb-20 lg:text-start">
          <LuxuryRevealItem>
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-[#9A8550]">
              {t("timelineKicker")}
            </p>
          </LuxuryRevealItem>
          <LuxuryRevealItem>
            <h2
              id="project-timeline-heading"
              className={`mt-3 text-[clamp(2rem,4vw,3rem)] font-extralight tracking-[0.12em] text-[#0f172a] ${serif}`}
            >
              {t("timelineTitle")}
            </h2>
          </LuxuryRevealItem>
          <LuxuryRevealItem>
            <p
              className={`mx-auto mt-5 max-w-2xl text-[11px] font-extralight uppercase leading-relaxed tracking-[0.28em] text-[#0f172a]/48 lg:mx-0 ${lang === "ar" ? "font-arabic normal-case tracking-normal" : "font-urbanist"}`}
            >
              {t("timelineSubtitle")}
            </p>
          </LuxuryRevealItem>
        </LuxuryStagger>

        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative flex flex-col justify-center gap-3 lg:col-span-4">
            <div
              className="absolute start-[23px] top-8 bottom-8 hidden w-px bg-charcoal/10 md:block"
              aria-hidden
            />

            {PROJECT_TIMELINE_STAGES.map((step, idx) => {
              const isSelected = step.id === activeStep.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(step)}
                  className="group relative z-10 flex items-center gap-6 rounded-none p-5 text-start transition-colors duration-300 hover:bg-white/70"
                >
                  <div className="relative flex items-center justify-center">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full border font-mono text-xs transition-all duration-500 ${
                        isSelected
                          ? "border-[#9A8550] bg-[#9A8550] text-white shadow-md shadow-[#9A8550]/20"
                          : "border-charcoal/15 bg-white text-charcoal/40 group-hover:border-charcoal/30"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    {isSelected && !reduceMotion ? (
                      <span
                        className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9A8550]/20"
                        aria-hidden
                      />
                    ) : null}
                  </div>

                  <div className="flex flex-col">
                    <span
                      className={`mb-0.5 font-mono text-xs uppercase tracking-wider ${
                        isSelected ? "text-[#9A8550]" : "text-charcoal/40"
                      }`}
                    >
                      {t(step.dateKey)}
                    </span>
                    <h3
                      className={`text-lg font-extralight tracking-[0.06em] transition-colors duration-300 ${serif} ${
                        isSelected
                          ? "font-medium text-[#0f172a]"
                          : "text-charcoal/50 group-hover:text-charcoal/80"
                      }`}
                    >
                      {t(step.labelKey)}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 overflow-hidden rounded-[4px] border border-charcoal/10 bg-white shadow-xl shadow-charcoal/[0.06] md:grid-cols-12 lg:col-span-8">
            <div
              className={`relative flex min-h-[350px] items-center justify-center overflow-hidden bg-zinc-950 p-8 md:col-span-6 md:min-h-[480px] bg-gradient-to-tr ${activeStep.bgGradient}`}
            >
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-[#9A8550]/10 opacity-60"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute start-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9A8550]/10 blur-3xl"
                aria-hidden
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={
                    reduceMotion ? false : { opacity: 0, scale: 0.92, y: 20 }
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={
                    reduceMotion ? undefined : { opacity: 0, scale: 0.95, y: -20 }
                  }
                  transition={renderTransition}
                  className="relative z-10 flex h-full w-full items-center justify-center"
                  style={{ position: "relative" }}
                >
                  <div
                    className="relative aspect-[4/5] w-full max-h-[420px]"
                    style={fillImageParentStyle}
                  >
                    <Image
                      src={activeStep.imageSrc}
                      alt={t(activeStep.labelKey)}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
                      quality={75}
                      priority={activeStep.id === CURRENT_TIMELINE_STAGE_ID}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col justify-between bg-white p-8 md:col-span-6 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={reduceMotion ? false : { opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -15 }}
                  transition={panelTransition}
                  className="flex h-full flex-col justify-between"
                >
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-[2px] bg-charcoal/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-charcoal/55">
                        {t("timelinePhaseLabel")}{" "}
                        {String(activeIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-xs text-[#9A8550]">
                        {t(activeStep.dateKey)}
                      </span>
                    </div>
                    <h4
                      className={`mb-4 text-2xl font-extralight tracking-[0.1em] text-[#0f172a] ${serif}`}
                    >
                      {t(activeStep.labelKey)}
                    </h4>
                    <p
                      className={`mb-8 text-sm font-extralight leading-relaxed text-charcoal/55 ${lang === "ar" ? "font-arabic text-end" : "font-urbanist"}`}
                      dir={lang === "ar" ? "rtl" : "ltr"}
                    >
                      {t(activeStep.descriptionKey)}
                    </p>
                  </div>

                  <div className="mt-auto border-t border-charcoal/10 pt-6">
                    <p
                      className={`mb-4 font-mono text-[11px] uppercase tracking-wider text-charcoal/40 ${lang === "ar" ? "font-arabic" : ""}`}
                    >
                      {t("timelineCapitalMatrix")}
                    </p>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-5">
                      <div>
                        <dt className="mb-0.5 font-mono text-[10px] uppercase text-charcoal/40">
                          {t("timelineOriginalEntry")}
                        </dt>
                        <dd className="font-sans text-lg font-extralight text-[#0f172a]">
                          {activeStep.financials.entryPrice}
                        </dd>
                      </div>
                      <div>
                        <dt className="mb-0.5 font-mono text-[10px] uppercase text-charcoal/40">
                          {t("timelineEstMarketValue")}
                        </dt>
                        <dd className="font-sans text-lg font-medium text-[#0f172a]">
                          {activeStep.financials.estimatedValue}
                        </dd>
                      </div>
                      <div>
                        <dt className="mb-0.5 font-mono text-[10px] uppercase text-charcoal/40">
                          {t("timelineAvgPriceSqFt")}
                        </dt>
                        <dd className="font-mono text-sm font-extralight text-charcoal/70">
                          {activeStep.financials.avgPricePerSqFt}
                        </dd>
                      </div>
                      <div>
                        <dt className="mb-0.5 font-mono text-[10px] uppercase text-charcoal/40">
                          {t("timelineRoiGrowth")}
                        </dt>
                        <dd className="font-mono text-sm font-semibold text-[#9A8550]">
                          {activeStep.financials.growthPercentage}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
