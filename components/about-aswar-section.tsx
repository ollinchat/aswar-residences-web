"use client";

import { Building2, Eye, Shield } from "lucide-react";
import { AswarMonogramWatermark } from "@/components/aswar-monogram-watermark";
import { LuxuryRevealItem, LuxuryStagger } from "@/components/luxury-reveal";
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
      className="relative scroll-mt-24 overflow-hidden border-t border-charcoal/10 bg-white px-6 py-32 md:px-14 md:py-40"
      aria-labelledby="about-aswar-heading"
    >
      <AswarMonogramWatermark />
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
              className={`mt-7 text-[11px] font-extralight uppercase leading-relaxed tracking-[0.28em] text-[#0f172a]/48 md:text-[12px] ${lang === "ar" ? "font-arabic normal-case tracking-normal" : "font-urbanist"}`}
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

        <LuxuryStagger>
          <ul className="mt-16 grid gap-px border border-charcoal/10 bg-charcoal/10 sm:grid-cols-3">
            {PILLARS.map(({ key, Icon }) => (
              <LuxuryRevealItem key={key}>
                <li className="flex flex-col gap-4 bg-white px-6 py-8 md:px-8 md:py-10">
                  <Icon
                    width={28}
                    height={28}
                    strokeWidth={1}
                    color={ICON_COLOR}
                    aria-hidden
                  />
                  <p
                    className={`text-sm font-extralight tracking-[0.14em] text-[#0f172a] md:text-base ${serif}`}
                  >
                    {t(key)}
                  </p>
                </li>
              </LuxuryRevealItem>
            ))}
          </ul>
        </LuxuryStagger>
      </div>
    </section>
  );
}
