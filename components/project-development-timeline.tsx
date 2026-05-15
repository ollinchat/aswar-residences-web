"use client";

import { useReducedMotion } from "framer-motion";
import { LuxuryRevealItem, LuxuryStagger } from "@/components/luxury-reveal";
import { useLang } from "@/components/language-provider";
import {
  CURRENT_TIMELINE_STAGE_ID,
  PROJECT_TIMELINE_STAGES,
  type TimelineStageId,
} from "@/lib/project-timeline";

function stageIndex(id: TimelineStageId): number {
  return PROJECT_TIMELINE_STAGES.findIndex((s) => s.id === id);
}

export function ProjectDevelopmentTimeline() {
  const { t, lang } = useLang();
  const reduceMotion = useReducedMotion();
  const serif = lang === "ar" ? "font-arabic" : "font-playfair";
  const currentIdx = stageIndex(CURRENT_TIMELINE_STAGE_ID);
  const currentStage =
    PROJECT_TIMELINE_STAGES[currentIdx] ?? PROJECT_TIMELINE_STAGES[1]!;
  const completedPct =
    PROJECT_TIMELINE_STAGES.length > 1
      ? (currentIdx / (PROJECT_TIMELINE_STAGES.length - 1)) * 100
      : 0;

  return (
    <section
      id="project-timeline"
      className="scroll-mt-24 border-t border-charcoal/10 bg-[#FAFAFA] px-6 py-32 md:px-14 md:py-40"
      aria-labelledby="project-timeline-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <LuxuryStagger className="mb-14 max-w-2xl md:mb-16">
          <LuxuryRevealItem>
            <p className="font-sans text-[9px] font-extralight uppercase tracking-[0.52em] text-[#0f172a]/35">
              {t("timelineKicker")}
            </p>
          </LuxuryRevealItem>
          <LuxuryRevealItem>
            <h2
              id="project-timeline-heading"
              className={`mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] font-extralight tracking-[0.2em] text-[#0f172a] ${serif}`}
            >
              {t("timelineTitle")}
            </h2>
          </LuxuryRevealItem>
          <LuxuryRevealItem>
            <p
              className={`mt-7 text-[11px] font-extralight uppercase leading-relaxed tracking-[0.28em] text-[#0f172a]/48 ${lang === "ar" ? "font-arabic normal-case tracking-normal" : "font-urbanist"}`}
            >
              {t("timelineSubtitle")}
            </p>
          </LuxuryRevealItem>
          <LuxuryRevealItem>
            <p
              className={`mt-6 inline-flex items-center gap-2.5 font-sans text-[10px] font-extralight uppercase tracking-[0.32em] text-[#9A8550] ${lang === "ar" ? "font-arabic" : ""}`}
            >
              <span
                className={`relative flex h-2 w-2 shrink-0 rounded-full bg-[#9A8550] ${reduceMotion ? "" : "aswar-timeline-breathe"}`}
                aria-hidden
              />
              {t("timelineCurrentLabel")}: {t(currentStage.labelKey)}
            </p>
          </LuxuryRevealItem>
        </LuxuryStagger>

        <ol className="relative hidden md:block">
          <div
            className="absolute start-0 end-0 top-[11px] h-[0.5px] bg-[#9A8550]/35"
            aria-hidden
          />
          <div
            className="absolute start-0 top-[11px] h-[0.5px] bg-charcoal/20"
            style={{ width: `${completedPct}%` }}
            aria-hidden
          />
          <div className="grid grid-cols-5 gap-4">
            {PROJECT_TIMELINE_STAGES.map((stage, index) => {
              const isPast = index < currentIdx;
              const isCurrent = stage.id === CURRENT_TIMELINE_STAGE_ID;
              return (
                <li key={stage.id} className="relative flex flex-col items-start">
                  <div className="relative z-[1] flex w-full items-center">
                    <span
                      className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-none border ${
                        isCurrent
                          ? "border-[#9A8550] bg-white"
                          : isPast
                            ? "border-charcoal/22 bg-charcoal/25"
                            : "border-charcoal/12 bg-white"
                      }`}
                    >
                      {isCurrent ? (
                        <span
                          className={`h-1.5 w-1.5 rounded-full bg-[#9A8550] ${reduceMotion ? "" : "aswar-timeline-breathe"}`}
                          aria-hidden
                        />
                      ) : isPast ? (
                        <span
                          className="h-1 w-1 rounded-full bg-charcoal/40"
                          aria-hidden
                        />
                      ) : null}
                    </span>
                  </div>
                  <h3
                    className={`mt-5 text-sm font-extralight tracking-[0.12em] ${serif} ${
                      isCurrent
                        ? "text-[#0f172a]"
                        : isPast
                          ? "text-charcoal/45"
                          : "text-[#0f172a]/40"
                    }`}
                  >
                    {t(stage.labelKey)}
                  </h3>
                  <p
                    className={`mt-2 text-[10px] font-extralight leading-relaxed text-[#0f172a]/50 ${lang === "ar" ? "font-arabic" : "font-urbanist"}`}
                  >
                    {t(stage.descriptionKey)}
                  </p>
                </li>
              );
            })}
          </div>
        </ol>

        <ol className="relative space-y-0 md:hidden">
          <div
            className="absolute start-[9px] top-3 bottom-3 w-[0.5px] bg-[#9A8550]/35"
            aria-hidden
          />
          {PROJECT_TIMELINE_STAGES.map((stage, index) => {
            const isCurrent = stage.id === CURRENT_TIMELINE_STAGE_ID;
            const isPast = index < currentIdx;
            return (
              <li key={stage.id} className="relative flex gap-5 pb-12">
                <span
                  className={`relative z-[1] mt-0.5 flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-none border ${
                    isCurrent
                      ? "border-[#9A8550] bg-white"
                      : isPast
                        ? "border-charcoal/22 bg-charcoal/25"
                        : "border-charcoal/12 bg-white"
                  }`}
                >
                  {isCurrent ? (
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-[#9A8550] ${reduceMotion ? "" : "aswar-timeline-breathe"}`}
                      aria-hidden
                    />
                  ) : isPast ? (
                    <span
                      className="h-1 w-1 rounded-full bg-charcoal/40"
                      aria-hidden
                    />
                  ) : null}
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3
                    className={`text-sm font-extralight tracking-[0.1em] text-[#0f172a] ${serif} ${isPast && !isCurrent ? "text-charcoal/45" : ""}`}
                  >
                    {t(stage.labelKey)}
                  </h3>
                  <p
                    className={`mt-2 text-[10px] font-extralight leading-relaxed text-[#0f172a]/50 ${lang === "ar" ? "font-arabic" : "font-urbanist"}`}
                  >
                    {t(stage.descriptionKey)}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
