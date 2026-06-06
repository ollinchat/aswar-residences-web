"use client";

import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import type { CopyKey, Lang } from "@/lib/i18n";
import { AMENITY_ICONS } from "@/lib/amenity-icons";
import { useLang } from "@/components/language-provider";
import {
  AMENITY_LIST_ORDER,
  type AmenityListKey,
} from "@/lib/amenity-hotspots";
import { LuxuryRevealItem, LuxuryStagger } from "@/components/luxury-reveal";
import { AMENITY_VISUALS, type AmenityVisualMedia } from "@/lib/amenity-visuals";
import {
  fillImageParentAbsoluteStyle,
  fillImageParentStyle,
} from "@/lib/image-layout";

const ICON_COLOR = "#9A8550";

const AMENITY_DESC = {
  amenityPoolCabanas: "amenityPoolCabanasDesc",
  amenityRooftopLounge: "amenityRooftopLoungeDesc",
  amenityYogaDeck: "amenityYogaDeckDesc",
  amenityGym: "amenityGymDesc",
  amenityJoggingTrack: "amenityJoggingTrackDesc",
} as const satisfies Record<AmenityListKey, CopyKey>;

const ICON_STROKE = 1;

const IMAGE_SIZES_STAGE =
  "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px";
const IMAGE_SIZES_STRIP = "96px";
const AUTO_ADVANCE_MS = 5500;
const FILMSTRIP_MARQUEE_COPIES = 2;

function amenityAlt(media: AmenityVisualMedia, lang: Lang): string {
  return lang === "ar" ? media.altAr : media.altEn;
}

function stripImageSrc(media: AmenityVisualMedia): string {
  return media.kind === "video" ? media.poster : media.src;
}

function AmenityBackgroundMedia({
  media,
  isActive,
  reduceMotion,
  lang,
  imageSizes,
  eager = false,
}: {
  media: AmenityVisualMedia;
  isActive: boolean;
  reduceMotion: boolean | null;
  lang: Lang;
  imageSizes: string;
  eager?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideo = media.kind === "video" && isActive && !reduceMotion;
  const burnClass =
    reduceMotion || media.kind === "video" ? "" : "amenity-ken-burns-inner";

  useEffect(() => {
    const el = videoRef.current;
    if (!el || media.kind !== "video") return;
    if (showVideo) {
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [showVideo, media.kind]);

  if (media.kind === "image") {
    return (
      <div
        className="absolute inset-0 overflow-hidden rounded-none"
        style={fillImageParentAbsoluteStyle}
      >
        <div
          className={`relative h-full w-full ${burnClass}`}
          style={fillImageParentStyle}
        >
          <Image
            src={media.src}
            alt={amenityAlt(media, lang)}
            fill
            className="object-cover"
            sizes={imageSizes}
            quality={75}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "low"}
          />
        </div>
      </div>
    );
  }

  const posterAlt = amenityAlt(media, lang);

  if (!showVideo) {
    return (
      <div
        className="absolute inset-0 overflow-hidden rounded-none"
        style={fillImageParentAbsoluteStyle}
      >
        <div
          className={`relative h-full w-full ${burnClass}`}
          style={fillImageParentStyle}
        >
          <Image
            src={media.poster}
            alt={posterAlt}
            fill
            className="object-cover"
            sizes={imageSizes}
            quality={75}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "low"}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden rounded-none">
      <div className={`relative h-full w-full ${burnClass}`} style={fillImageParentStyle}>
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={media.src}
          poster={media.poster}
          muted
          playsInline
          loop
          preload="metadata"
          aria-label={posterAlt}
        />
      </div>
    </div>
  );
}

const FilmstripTile = memo(function FilmstripTile({
  amenityKey,
  isActive,
  label,
  src,
  onSelect,
}: {
  amenityKey: AmenityListKey;
  isActive: boolean;
  label: string;
  src: string;
  onSelect: (key: AmenityListKey) => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={isActive ? "true" : undefined}
      onClick={() => onSelect(amenityKey)}
      style={fillImageParentStyle}
      className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-none border-0 bg-neutral-100 outline-none transition-[opacity,transform,box-shadow] duration-500 focus-visible:ring-2 focus-visible:ring-charcoal/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:h-24 md:w-24 ${
        isActive
          ? "scale-105 opacity-100 ring-1 ring-[#9A8550]/45 shadow-sm"
          : "scale-100 opacity-55 hover:opacity-80"
      }`}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes={IMAGE_SIZES_STRIP}
        quality={72}
        loading="lazy"
      />
    </button>
  );
});

const AmenityStage = memo(function AmenityStage({
  amenityKey,
}: {
  amenityKey: AmenityListKey;
}) {
  const { t, lang } = useLang();
  const reduceMotion = useReducedMotion();
  const media = AMENITY_VISUALS[amenityKey];
  const Icon = AMENITY_ICONS[amenityKey];
  const descKey = AMENITY_DESC[amenityKey];

  const crossfade = reduceMotion
    ? { duration: 0.15 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
      transition={crossfade}
      className="absolute inset-0 overflow-hidden rounded-none"
      style={fillImageParentAbsoluteStyle}
    >
      <AmenityBackgroundMedia
        media={media}
        isActive
        reduceMotion={reduceMotion}
        lang={lang}
        imageSizes={IMAGE_SIZES_STAGE}
        eager
      />
      <div
        className="absolute inset-y-0 start-0 z-[2] flex w-[38%] min-w-[200px] max-w-[420px] flex-col justify-center gap-4 rounded-none border-e border-white/35 bg-gradient-to-r from-white/80 to-transparent px-5 py-8 backdrop-blur-2xl md:gap-5 md:px-8 md:py-10 lg:px-10"
      >
        <Icon
          width={44}
          height={44}
          strokeWidth={ICON_STROKE}
          color={ICON_COLOR}
          className="shrink-0"
          aria-hidden
        />
        <h3
          className={`text-start text-[clamp(1.125rem,2.4vw,1.5rem)] font-light leading-snug tracking-wider text-[#0f172a] ${lang === "ar" ? "font-arabic" : "font-playfair"}`}
        >
          {t(amenityKey)}
        </h3>
        <p
          className={`line-clamp-4 text-start text-[10px] font-extralight leading-relaxed text-[#0f172a]/90 md:text-[11px] lg:text-xs ${lang === "ar" ? "font-arabic normal-case tracking-normal" : "font-urbanist uppercase tracking-[0.14em]"}`}
        >
          {t(descKey)}
        </p>
      </div>
    </motion.div>
  );
});

export function ProjectAmenities() {
  const { t, lang } = useLang();
  const reduceMotion = useReducedMotion();
  const [featuredKey, setFeaturedKey] = useState<AmenityListKey>(
    AMENITY_LIST_ORDER[0],
  );
  const [hoverPaused, setHoverPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { amount: 0.12, margin: "0px 0px -15% 0px" });

  const onPromote = useCallback((key: AmenityListKey) => {
    setFeaturedKey(key);
  }, []);

  const autoAdvanceEnabled =
    !reduceMotion && sectionInView && !hoverPaused && !tabHidden;

  useEffect(() => {
    if (!autoAdvanceEnabled) return;

    const id = window.setInterval(() => {
      setFeaturedKey((prev) => {
        const i = AMENITY_LIST_ORDER.indexOf(prev);
        return AMENITY_LIST_ORDER[(i + 1) % AMENITY_LIST_ORDER.length]!;
      });
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [autoAdvanceEnabled]);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const stripItems = useMemo(
    () =>
      AMENITY_LIST_ORDER.map((amenityKey) => ({
        amenityKey,
        src: stripImageSrc(AMENITY_VISUALS[amenityKey]),
        label: `${t(amenityKey)}: ${t(AMENITY_DESC[amenityKey])}`,
      })),
    [t, lang],
  );

  const filmstripAnimated = !reduceMotion && sectionInView;

  return (
    <section
      ref={sectionRef}
      className="relative w-full border-t border-charcoal/10 bg-white py-16 md:py-20"
      aria-label={t("amenitiesTitle")}
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
        <LuxuryStagger className="mb-5 text-center md:mb-7">
          <LuxuryRevealItem>
            <h2
              className={`text-[clamp(1.5rem,3.2vw,2rem)] font-extralight tracking-[0.2em] text-[#0f172a] md:tracking-[0.28em] ${lang === "ar" ? "font-arabic" : "font-playfair"}`}
            >
              {t("amenitiesTitle")}
            </h2>
          </LuxuryRevealItem>
          <LuxuryRevealItem>
            <p
              className={`mx-auto mt-2 max-w-lg text-[9px] font-extralight uppercase tracking-[0.28em] text-[#0f172a]/42 md:text-[10px] ${lang === "ar" ? "font-arabic" : "font-urbanist"}`}
            >
              {t("amenitiesRibbonKicker")}
            </p>
          </LuxuryRevealItem>
        </LuxuryStagger>

        <MotionConfig reducedMotion={reduceMotion ? "always" : "never"}>
          <div
            ref={sliderRef}
            className="relative flex flex-col gap-px shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
            style={{ position: "relative" }}
            onMouseEnter={() => setHoverPaused(true)}
            onMouseLeave={() => setHoverPaused(false)}
          >
            <div
              className="relative h-[min(50vh,480px)] min-h-[260px] max-h-[480px] w-full overflow-hidden rounded-none border border-charcoal/10 bg-[#fafafa] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]"
              style={{ position: "relative" }}
              role="region"
              aria-label={t(featuredKey)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <AmenityStage key={featuredKey} amenityKey={featuredKey} />
              </AnimatePresence>
            </div>

            <div
              className="aswar-amenity-filmstrip-wrap relative h-20 w-full overflow-hidden rounded-none bg-white md:h-24"
              style={{ position: "relative" }}
              dir="ltr"
              role="group"
              aria-label={t("amenitiesTitle")}
            >
              <div
                className={`aswar-amenity-filmstrip-track flex w-max min-w-max shrink-0 flex-row flex-nowrap items-center ${filmstripAnimated ? "aswar-amenity-filmstrip-track--animated" : ""}`}
              >
                {Array.from({ length: FILMSTRIP_MARQUEE_COPIES }, (_, segment) => (
                  <div
                    key={segment}
                    className="aswar-amenity-filmstrip-segment flex shrink-0 flex-row flex-nowrap items-center whitespace-nowrap"
                  >
                    {stripItems.map(({ amenityKey, src, label }) => (
                      <FilmstripTile
                        key={`${segment}-${amenityKey}`}
                        amenityKey={amenityKey}
                        src={src}
                        label={label}
                        isActive={amenityKey === featuredKey}
                        onSelect={onPromote}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionConfig>
      </div>
    </section>
  );
}
