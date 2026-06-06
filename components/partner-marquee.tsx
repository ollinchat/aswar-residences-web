"use client";

import Image from "next/image";
import { useLang } from "@/components/language-provider";
import { PREMIUM_PARTNER_LOGOS } from "@/lib/premium-partners";

const MARQUEE_COPIES = 2;

export function PartnerMarquee() {
  const { t, lang } = useLang();
  const titleClass =
    lang === "ar"
      ? "font-arabic normal-case tracking-normal"
      : "font-urbanist uppercase tracking-widest";

  const trackLogos = Array.from({ length: MARQUEE_COPIES }, () => PREMIUM_PARTNER_LOGOS).flat();

  return (
    <section
      className="border-t border-charcoal/[0.06] bg-white py-10 md:py-12"
      aria-labelledby="premium-partners-heading"
    >
      <p
        id="premium-partners-heading"
        className={`mb-8 px-6 text-center text-xs text-neutral-400 ${titleClass}`}
      >
        {t("partnersGridTitle")}
      </p>

      <div className="partner-marquee-wrap relative overflow-hidden">
        <div
          className="partner-marquee-track flex w-max flex-row flex-nowrap items-center gap-16 whitespace-nowrap will-change-transform md:gap-24"
        >
          {trackLogos.map(({ src, altKey }, index) => (
            <div
              key={`${src}-${index}`}
              className="flex shrink-0 items-center justify-center"
            >
              <Image
                src={src}
                alt={t(altKey)}
                width={160}
                height={40}
                className="h-10 w-auto max-w-none object-contain opacity-60 contrast-125 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
