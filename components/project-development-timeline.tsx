"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LuxuryRevealItem, LuxuryStagger } from "@/components/luxury-reveal";
import { useLang } from "@/components/language-provider";
import {
  CURRENT_TIMELINE_STAGE_ID,
  PROJECT_TIMELINE_STAGES,
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

  const panelTransition = reduceMotion
    ? { duration: 0.12 }
    : { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <section
      id="project-timeline"
      className="scroll-mt-24 overflow-hidden border-t border-charcoal/10 bg-[#FAFAFA] px-6 py-32 md:px-14 md:py-40"
      aria-labelledby="project-timeline-heading"
    >
      <div className="mx-auto max-w-6xl">
        <LuxuryStagger className="mb-16 text-center md:mb-20">
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
              className={`mx-auto mt-5 max-w-2xl text-[11px] font-extralight uppercase leading-relaxed tracking-[0.28em] text-[#0f172a]/48 ${lang === "ar" ? "font-arabic normal-case tracking-normal" : "font-urbanist"}`}
            >
              {t("timelineSubtitle")}
            </p>
          </LuxuryRevealItem>
        </LuxuryStagger>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <nav
            className="relative mx-auto w-full max-w-md lg:col-span-5 lg:mx-0 lg:max-w-none"
            aria-label={t("timelineTitle")}
          >
            <div
              className="absolute start-[23px] top-8 bottom-8 hidden w-px bg-charcoal/10 lg:block"
              aria-hidden
            />

            <ul className="flex flex-col gap-1">
              {PROJECT_TIMELINE_STAGES.map((step, idx) => {
                const isSelected = step.id === activeStep.id;
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => setActiveStep(step)}
                      aria-current={isSelected ? "step" : undefined}
                      className="group relative z-10 flex w-full items-center gap-6 rounded-none p-5 text-start transition-colors duration-300 hover:bg-white/80"
                    >
                      <div className="relative flex shrink-0 items-center justify-center">
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

                      <div className="min-w-0 flex flex-col">
                        <span
                          className={`mb-0.5 font-mono text-xs uppercase tracking-wider ${
                            isSelected ? "text-[#9A8550]" : "text-charcoal/40"
                          }`}
                        >
                          {t(step.dateKey)}
                        </span>
                        <span
                          className={`text-lg font-extralight tracking-[0.06em] transition-colors duration-300 ${serif} ${
                            isSelected
                              ? "font-medium text-[#0f172a]"
                              : "text-charcoal/50 group-hover:text-charcoal/80"
                          }`}
                        >
                          {t(step.labelKey)}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-[4px] border border-charcoal/10 bg-white shadow-xl shadow-charcoal/[0.06]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={panelTransition}
                  className="flex flex-col p-8 md:p-12 lg:p-14"
                >
                  <div className="mb-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                    <span className="rounded-[2px] bg-charcoal/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-charcoal/55">
                      {t("timelinePhaseLabel")}{" "}
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs text-[#9A8550]">
                      {t(activeStep.dateKey)}
                    </span>
                  </div>

                  <h3
                    className={`mb-5 text-center text-[clamp(1.5rem,3vw,2.25rem)] font-extralight tracking-[0.1em] text-[#0f172a] lg:text-start ${serif}`}
                  >
                    {t(activeStep.labelKey)}
                  </h3>

                  <p
                    className={`mx-auto mb-12 max-w-xl text-center text-sm font-extralight leading-relaxed text-charcoal/55 lg:mx-0 lg:max-w-none lg:text-start ${lang === "ar" ? "font-arabic" : "font-urbanist"}`}
                    dir={lang === "ar" ? "rtl" : "ltr"}
                  >
                    {t(activeStep.descriptionKey)}
                  </p>

                  <div className="border-t border-charcoal/10 pt-8">
                    <p
                      className={`mb-6 text-center font-mono text-[11px] uppercase tracking-wider text-charcoal/40 lg:text-start ${lang === "ar" ? "font-arabic" : ""}`}
                    >
                      {t("timelineCapitalMatrix")}
                    </p>
                    <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
                      <div className="text-center lg:text-start">
                        <dt className="mb-1 font-mono text-[10px] uppercase text-charcoal/40">
                          {t("timelineOriginalEntry")}
                        </dt>
                        <dd className="font-sans text-lg font-extralight text-[#0f172a]">
                          {activeStep.financials.entryPrice}
                        </dd>
                      </div>
                      <div className="text-center lg:text-start">
                        <dt className="mb-1 font-mono text-[10px] uppercase text-charcoal/40">
                          {t("timelineEstMarketValue")}
                        </dt>
                        <dd className="font-sans text-lg font-medium text-[#0f172a]">
                          {activeStep.financials.estimatedValue}
                        </dd>
                      </div>
                      <div className="text-center lg:text-start">
                        <dt className="mb-1 font-mono text-[10px] uppercase text-charcoal/40">
                          {t("timelineAvgPriceSqFt")}
                        </dt>
                        <dd className="font-mono text-sm font-extralight text-charcoal/70">
                          {activeStep.financials.avgPricePerSqFt}
                        </dd>
                      </div>
                      <div className="text-center lg:text-start">
                        <dt className="mb-1 font-mono text-[10px] uppercase text-charcoal/40">
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
