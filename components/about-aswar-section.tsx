"use client";

import { Building2, Eye, Shield } from "lucide-react";
import { AswarMonogramWatermark } from "@/components/aswar-monogram-watermark";
import { useLang } from "@/components/language-provider";

const ICON_COLOR = "#9A8550";
const PILLARS = [
  { key: "aboutPillarPrivacy" as const, Icon: Shield },
  { key: "aboutPillarLuxury" as const, Icon: Building2 },
  { key: "aboutPillarInnovation" as const, Icon: Eye },
] as const;

export function AboutAswarSection() {
  const { t, lang } = useLang();
  const serif = lang === "ar" ? "font-arabic" : "font-playfair";

  return (
    <section
      id="about-aswar"
      className="relative scroll-mt-24 overflow-hidden border-t border-charcoal/10 bg-white px-6 py-20 md:px-14 md:py-24"
      aria-labelledby="about-aswar-heading"
    >
      <AswarMonogramWatermark />
      <div className="relative z-[1] mx-auto max-w-[1200px]">
        <header className="max-w-2xl">
          <p className="font-sans text-[9px] font-medium uppercase tracking-[0.52em] text-[#0f172a]/35">
            {t("aboutKicker")}
          </p>
          <h2
            id="about-aswar-heading"
            className={`mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal tracking-tight text-[#0f172a] ${serif}`}
          >
            {t("aboutTitle")}
          </h2>
          <p
            className={`mt-7 text-[11px] font-light uppercase leading-relaxed tracking-[0.22em] text-[#0f172a]/48 md:text-[12px] ${lang === "ar" ? "font-arabic normal-case tracking-normal" : "font-urbanist"}`}
          >
            {t("aboutLead")}
          </p>
        </header>

        <p
          className={`mt-10 max-w-3xl text-base font-light leading-relaxed text-[#0f172a]/82 md:text-lg ${serif}`}
        >
          {t("aboutBody")}
        </p>

        <ul className="mt-14 grid gap-px border border-charcoal/10 bg-charcoal/10 sm:grid-cols-3">
          {PILLARS.map(({ key, Icon }) => (
            <li
              key={key}
              className="flex flex-col gap-4 bg-white px-6 py-8 md:px-8 md:py-10"
            >
              <Icon
                width={28}
                height={28}
                strokeWidth={1}
                color={ICON_COLOR}
                aria-hidden
              />
              <p
                className={`text-sm font-medium tracking-wide text-[#0f172a] md:text-base ${serif}`}
              >
                {t(key)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
