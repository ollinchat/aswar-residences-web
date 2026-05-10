"use client";

import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  BookOpen,
  Building2,
  Dumbbell,
  Flame,
  Sparkles,
  Sun,
  Trees,
  Umbrella,
  Waves,
  Droplets,
} from "lucide-react";
import { useLang } from "@/components/language-provider";
import type { CopyKey } from "@/lib/i18n";

const AMENITIES: { key: CopyKey; icon: LucideIcon }[] = [
  { key: "amenityFurnishedUnits", icon: Armchair },
  { key: "amenityAdultKidsPools", icon: Waves },
  { key: "amenityGymJogTrack", icon: Dumbbell },
  { key: "amenityYogaMultipurposeDecks", icon: Sparkles },
  { key: "amenityBbqFirePit", icon: Flame },
  { key: "amenityKidsPlayground", icon: Trees },
  { key: "amenityReadingBeanBags", icon: BookOpen },
  { key: "amenityCabanasWetDecks", icon: Umbrella },
  { key: "amenityCourtyardWaterGarden", icon: Droplets },
  { key: "amenityMultipurposeHallLawn", icon: Building2 },
  { key: "amenityRooftopOpenArea", icon: Sun },
];

export function ProjectAmenities() {
  const { t } = useLang();

  return (
    <div className="mt-20 border-t border-charcoal/[0.06] px-1 pt-16 md:mt-24 md:px-2 md:pt-20 lg:pt-24">
      <header className="mb-12 flex flex-col items-stretch gap-6 md:mb-14 lg:mb-16">
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10">
          <span
            className="h-px min-w-[2.5rem] flex-1 max-w-[4.5rem] bg-gradient-to-l from-transparent to-charcoal/25 sm:max-w-[7rem] md:max-w-[10rem]"
            aria-hidden
          />
          <h3 className="shrink-0 text-center font-serif text-[clamp(1.35rem,2.2vw,1.85rem)] font-light tracking-[0.02em] text-charcoal">
            {t("amenitiesTitle")}
          </h3>
          <span
            className="h-px min-w-[2.5rem] flex-1 max-w-[4.5rem] bg-gradient-to-r from-transparent to-charcoal/25 sm:max-w-[7rem] md:max-w-[10rem]"
            aria-hidden
          />
        </div>
      </header>

      <ul className="mx-auto grid max-w-[1400px] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {AMENITIES.map(({ key, icon: Icon }) => (
          <li key={key} className="min-w-0">
            <div
              className="group flex h-full min-h-[7.5rem] flex-col gap-3 rounded-sm border border-gray-100 bg-[#FAF9F7] p-4 shadow-[0_1px_2px_rgba(26,28,30,0.04)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-neutral-200/90 hover:bg-white hover:shadow-[0_12px_28px_-8px_rgba(26,28,30,0.12),0_4px_12px_-4px_rgba(26,28,30,0.06)] sm:min-h-[7.75rem] sm:p-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-champagne/15 bg-champagne/[0.06] text-[#9A8550] transition-colors duration-300 group-hover:border-champagne/25 group-hover:bg-champagne/[0.1] group-hover:text-champagne">
                <Icon
                  className="h-[18px] w-[18px] shrink-0"
                  strokeWidth={1.2}
                  aria-hidden
                />
              </span>
              <p className="flex-1 font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.14em] text-charcoal/78 sm:text-[11px] sm:tracking-[0.16em] rtl:normal-case rtl:text-[12px] rtl:font-arabic rtl:leading-[1.65] rtl:tracking-normal">
                {t(key)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
