"use client";

import { useReducedMotion } from "framer-motion";
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

  return (
    <section
      id="project-timeline"
      className="scroll-mt-24 border-t border-charcoal/10 bg-[#FAFAFA] px-6 py-20 md:px-14 md:py-24"
      aria-labelledby="project-timeline-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-12 max-w-2xl md:mb-14">
          <p className="font-sans text-[9px] font-medium uppercase tracking-[0.52em] text-[#0f172a]/35">
            {t("timelineKicker")}
          </p>
          <h2
            id="project-timeline-heading"
            className={`mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal tracking-tight text-[#0f172a] ${serif}`}
          >
            {t("timelineTitle")}
          </h2>
          <p
            className={`mt-7 text-[11px] font-light uppercase leading-relaxed tracking-[0.22em] text-[#0f172a]/48 ${lang === "ar" ? "font-arabic normal-case tracking-normal" : "font-urbanist"}`}
          >
            {t("timelineSubtitle")}
          </p>
          <p
            className={`mt-6 inline-flex items-center gap-2 font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-[#9A8550] ${lang === "ar" ? "font-arabic" : ""}`}
          >
            <span
              className={`relative flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#9A8550] ${reduceMotion ? "" : "aswar-timeline-pulse"}`}
              aria-hidden
            />
            {t("timelineCurrentLabel")}: {t(currentStage.labelKey)}
          </p>
        </header>

        <ol className="relative hidden md:block">
          <div
            className="absolute start-0 end-0 top-[11px] h-px bg-charcoal/12"
            aria-hidden
          />
          <div className="grid grid-cols-5 gap-4">
            {PROJECT_TIMELINE_STAGES.map((stage, index) => {
              const isPast = index < currentIdx;
              const isCurrent = stage.id === CURRENT_TIMELINE_STAGE_ID;
              const isFuture = index > currentIdx;
              return (
                <li key={stage.id} className="relative flex flex-col items-start">
                  <div className="relative z-[1] flex w-full items-center">
                    <span
                      className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-none border ${
                        isCurrent
                          ? "border-[#9A8550] bg-white"
                          : isPast
                            ? "border-charcoal/25 bg-charcoal"
                            : "border-charcoal/15 bg-white"
                      }`}
                    >
                      {isCurrent ? (
                        <span
                          className={`h-2 w-2 rounded-full bg-[#9A8550] ${reduceMotion ? "" : "aswar-timeline-pulse"}`}
                          aria-hidden
                        />
                      ) : isPast ? (
                        <span className="h-1.5 w-1.5 bg-white" aria-hidden />
                      ) : null}
                    </span>
                  </div>
                  <h3
                    className={`mt-5 text-sm font-medium text-[#0f172a] ${serif} ${isFuture ? "text-[#0f172a]/45" : ""}`}
                  >
                    {t(stage.labelKey)}
                  </h3>
                  <p
                    className={`mt-2 text-[10px] leading-relaxed text-[#0f172a]/55 ${lang === "ar" ? "font-arabic" : "font-urbanist"}`}
                  >
                    {t(stage.descriptionKey)}
                  </p>
                </li>
              );
            })}
          </div>
        </ol>

        <ol className="relative space-y-0 md:hidden">
          {PROJECT_TIMELINE_STAGES.map((stage, index) => {
            const isCurrent = stage.id === CURRENT_TIMELINE_STAGE_ID;
            const isLast = index === PROJECT_TIMELINE_STAGES.length - 1;
            return (
              <li key={stage.id} className="relative flex gap-5 pb-10">
                {!isLast ? (
                  <span
                    className="absolute start-[10px] top-[22px] bottom-0 w-px bg-charcoal/12"
                    aria-hidden
                  />
                ) : null}
                <span
                  className={`relative z-[1] mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-none border ${
                    isCurrent
                      ? "border-[#9A8550] bg-white"
                      : index < currentIdx
                        ? "border-charcoal/25 bg-charcoal"
                        : "border-charcoal/15 bg-white"
                  }`}
                >
                  {isCurrent ? (
                    <span
                      className={`h-2 w-2 rounded-full bg-[#9A8550] ${reduceMotion ? "" : "aswar-timeline-pulse"}`}
                      aria-hidden
                    />
                  ) : index < currentIdx ? (
                    <span className="h-1.5 w-1.5 bg-white" aria-hidden />
                  ) : null}
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3
                    className={`text-sm font-medium text-[#0f172a] ${serif}`}
                  >
                    {t(stage.labelKey)}
                  </h3>
                  <p
                    className={`mt-2 text-[10px] leading-relaxed text-[#0f172a]/55 ${lang === "ar" ? "font-arabic" : "font-urbanist"}`}
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
