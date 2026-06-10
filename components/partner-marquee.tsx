"use client";

import Image from "next/image";
import { useLang } from "@/components/language-provider";
import { fillImageParentStyle } from "@/lib/image-layout";
import { PREMIUM_PARTNER_LOGOS } from "@/lib/premium-partners";

const MARQUEE_COPIES = 2;
const LOGO_FRAME_HEIGHT_PX = 40;
const LOGO_FRAME_WIDTH_PX = 160;

function PartnerLogoImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative shrink-0"
      style={{
        ...fillImageParentStyle,
        width: LOGO_FRAME_WIDTH_PX,
        height: LOGO_FRAME_HEIGHT_PX,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${LOGO_FRAME_WIDTH_PX}px`}
        className="object-contain object-center opacity-60 contrast-125 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </div>
  );
}

export function PartnerMarquee() {
  const { t, lang } = useLang();
  const titleClass =
    lang === "ar"
      ? "font-arabic normal-case tracking-normal"
      : "font-urbanist uppercase tracking-widest";

  const trackLogos = Array.from({ length: MARQUEE_COPIES }, () => PREMIUM_PARTNER_LOGOS).flat();

  return (
    <section
      className="relative border-t border-charcoal/[0.06] bg-white py-10 md:py-12"
      style={{ position: "relative" }}
      aria-labelledby="premium-partners-heading"
    >
      <p
        id="premium-partners-heading"
        className={`mb-8 px-6 text-center text-xs text-neutral-400 ${titleClass}`}
      >
        {t("partnersGridTitle")}
      </p>

      <div
        className="partner-marquee-wrap relative overflow-hidden"
        style={{ position: "relative" }}
      >
        <div
          className="relative flex w-max flex-row flex-nowrap gap-16 animate-marquee hover:[animation-play-state:paused] md:gap-24"
          style={{ position: "relative" }}
        >
          {trackLogos.map((logo, index) => {
            const { src, altKey } = logo;
            const href = "href" in logo ? logo.href : undefined;
            const label = t(altKey);
            const image = <PartnerLogoImage src={src} alt={label} />;

            return (
              <div
                key={`${src}-${index}`}
                className="relative flex shrink-0 items-center justify-center"
                style={{ position: "relative" }}
              >
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center"
                    aria-label={label}
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
