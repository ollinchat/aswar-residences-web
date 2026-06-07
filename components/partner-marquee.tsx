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
        <div className="flex w-max flex-row flex-nowrap gap-16 animate-marquee hover:[animation-play-state:paused] md:gap-24">
          {trackLogos.map((logo, index) => {
            const { src, altKey } = logo;
            const href = "href" in logo ? logo.href : undefined;
            const image = (
              <Image
                src={src}
                alt={t(altKey)}
                width={160}
                height={40}
                className="h-10 w-auto max-w-none object-contain opacity-60 contrast-125 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                style={{ width: "auto", height: "auto" }}
              />
            );

            return (
              <div
                key={`${src}-${index}`}
                className="flex shrink-0 items-center justify-center"
              >
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center"
                    aria-label={t(altKey)}
                  >
                    {image}
                  </a>
                ) : (
                  image
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
