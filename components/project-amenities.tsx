"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CopyKey } from "@/lib/i18n";
import { AMENITY_ICONS } from "@/lib/amenity-icons";
import { useLang } from "@/components/language-provider";
import {
  AMENITY_LIST_ORDER,
  type AmenityListKey,
} from "@/lib/amenity-hotspots";

const GOLD = "#9A8550";

const AMENITY_DESC = {
  amenityFurnishedUnits: "amenityFurnishedUnitsDesc",
  amenityAdultKidsPools: "amenityAdultKidsPoolsDesc",
  amenityGymJogTrack: "amenityGymJogTrackDesc",
  amenityYogaMultipurposeDecks: "amenityYogaMultipurposeDecksDesc",
  amenityBbqFirePit: "amenityBbqFirePitDesc",
  amenityKidsPlayground: "amenityKidsPlaygroundDesc",
  amenityReadingBeanBags: "amenityReadingBeanBagsDesc",
  amenityCabanasWetDecks: "amenityCabanasWetDecksDesc",
  amenityCourtyardWaterGarden: "amenityCourtyardWaterGardenDesc",
  amenityMultipurposeHallLawn: "amenityMultipurposeHallLawnDesc",
  amenityRooftopOpenArea: "amenityRooftopOpenAreaDesc",
} as const satisfies Record<AmenityListKey, CopyKey>;

const ICON_STROKE = 1;

export function ProjectAmenities() {
  const { t, lang } = useLang();
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="w-full border-t border-charcoal/[0.06] bg-[#F9F9F9] py-10 md:py-12"
      aria-label={t("amenitiesTitle")}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-8">
        <header className="mb-6 text-center md:mb-8">
          <h2
            className={`text-[clamp(1.5rem,3.2vw,2rem)] font-normal tracking-tight text-[#0f172a] ${lang === "ar" ? "font-arabic" : "font-playfair"}`}
          >
            {t("amenitiesTitle")}
          </h2>
          <p
            className={`mx-auto mt-2 max-w-lg text-[9px] font-light uppercase tracking-[0.2em] text-[#0f172a]/42 md:text-[10px] ${lang === "ar" ? "font-arabic" : "font-urbanist"}`}
          >
            {t("amenitiesRibbonKicker")}
          </p>
        </header>

        <ul
          role="list"
          className="flex w-full list-none flex-wrap justify-center gap-4 p-0 lg:gap-5"
        >
          {AMENITY_LIST_ORDER.map((key) => {
            const Icon = AMENITY_ICONS[key];
            return (
              <li
                key={key}
                className="w-full min-w-0 max-w-md shrink-0 sm:max-w-none md:w-[calc((100%-1rem)/2)] md:max-w-none lg:w-[calc((100%-3.75rem)/4)]"
              >
                <motion.article
                  className="group relative flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 border border-[#0f172a]/[0.08] bg-white px-5 py-4 text-center md:gap-3.5 md:px-5 md:py-4"
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -2,
                          boxShadow: "0 10px 22px rgba(15, 23, 42, 0.07)",
                        }
                  }
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                >
                  <Icon
                    width={32}
                    height={32}
                    strokeWidth={ICON_STROKE}
                    color={GOLD}
                    className="shrink-0 transition-transform duration-200 ease-out group-hover:scale-[1.04]"
                    aria-hidden
                  />

                  <h3
                    className={`line-clamp-2 max-w-[24ch] text-[12px] font-normal leading-snug tracking-tight text-[#0f172a] md:text-[13px] ${lang === "ar" ? "font-arabic" : "font-playfair"}`}
                  >
                    {t(key)}
                  </h3>

                  <p
                    className={`line-clamp-3 max-w-[34ch] text-[10px] font-light leading-relaxed text-[#0f172a]/55 sm:text-[10.5px] ${lang === "ar" ? "font-arabic leading-[1.68]" : "font-urbanist"}`}
                  >
                    {t(AMENITY_DESC[key])}
                  </p>
                </motion.article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
