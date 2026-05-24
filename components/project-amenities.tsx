"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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

const IMAGE_SIZES_STAGE = "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px";
const IMAGE_SIZES_STRIP = "(max-width: 768px) 128px, 160px";

function amenityAlt(media: AmenityVisualMedia, lang: Lang): string {
  return lang === "ar" ? media.altAr : media.altEn;
}

function stripImageSrc(media: AmenityVisualMedia): string {
  return media.kind === "video" ? media.poster : media.src;
}

function AmenityBackgroundMedia({
  media,
  inView,
  reduceMotion,
  lang,
  animationDelay,
  imageSizes,
  eager = false,
}: {
  media: AmenityVisualMedia;
  inView: boolean;
  reduceMotion: boolean | null;
  lang: Lang;
  animationDelay: string;
  imageSizes: string;
  eager?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideo = media.kind === "video" && inView && !reduceMotion;
  const burnClass =
    reduceMotion || (media.kind === "video" && showVideo)
      ? ""
      : "amenity-ken-burns-inner";

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !showVideo) return;
    void el.play().catch(() => {});
  }, [showVideo]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || media.kind !== "video") return;
    if (!inView || reduceMotion) el.pause();
  }, [inView, reduceMotion, media]);

  const wrapStyle = { animationDelay };

  if (media.kind === "image") {
    return (
      <div
        className="absolute inset-0 overflow-hidden rounded-none"
        style={fillImageParentAbsoluteStyle}
      >
        <div
          className={`relative h-full w-full ${burnClass}`}
          style={
            reduceMotion
              ? fillImageParentStyle
              : { ...fillImageParentStyle, ...wrapStyle }
          }
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
          style={
            reduceMotion
              ? fillImageParentStyle
              : { ...fillImageParentStyle, ...wrapStyle }
          }
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
      <div className={`relative h-full w-full ${burnClass}`} style={wrapStyle}>
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={media.src}
          poster={media.poster}
          muted
          playsInline
          loop
          preload="auto"
          aria-label={posterAlt}
        />
      </div>
    </div>
  );
}

function FilmstripTile({
  amenityKey,
  isActive,
  onSelect,
}: {
  amenityKey: AmenityListKey;
  isActive: boolean;
  onSelect: (key: AmenityListKey) => void;
}) {
  const { t, lang } = useLang();
  const media = AMENITY_VISUALS[amenityKey];
  const Icon = AMENITY_ICONS[amenityKey];
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { amount: 0.15, margin: "40px" });
  const src = stripImageSrc(media);
  const label = `${t(amenityKey)}: ${t(AMENITY_DESC[amenityKey])}`;

  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      aria-current={isActive ? "true" : undefined}
      onClick={() => onSelect(amenityKey)}
      className={`group relative aspect-square w-32 shrink-0 overflow-hidden rounded-none border-0 bg-white outline-none transition-[opacity,transform] duration-300 focus-visible:ring-2 focus-visible:ring-charcoal/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-36 md:w-40 ${
        isActive
          ? "z-[1] scale-100 opacity-100"
          : "scale-[0.98] opacity-70"
      }`}
    >
      {inView ? (
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes={IMAGE_SIZES_STRIP}
          quality={75}
          loading="lazy"
          fetchPriority="low"
        />
      ) : (
        <div className="absolute inset-0 bg-white" aria-hidden />
      )}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] min-h-[46%] bg-gradient-to-t from-white via-white/88 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute end-1.5 top-1.5 z-[2] md:end-2 md:top-2">
        <Icon
          width={15}
          height={15}
          strokeWidth={ICON_STROKE}
          color={ICON_COLOR}
          className="drop-shadow-none"
          aria-hidden
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-end justify-end px-1.5 pb-1 md:px-2 md:pb-2">
        <p
          className={`line-clamp-2 w-full text-center text-[11px] font-medium leading-snug tracking-wide text-[#0f172a] md:text-[12px] ${lang === "ar" ? "font-arabic" : "font-playfair"}`}
        >
          {t(amenityKey)}
        </p>
      </div>
    </button>
  );
}

function AmenityStage({
  amenityKey,
  index,
}: {
  amenityKey: AmenityListKey;
  index: number;
}) {
  const { t, lang } = useLang();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.12, margin: "0px 0px -10% 0px" });
  const media = AMENITY_VISUALS[amenityKey];
  const Icon = AMENITY_ICONS[amenityKey];
  const descKey = AMENITY_DESC[amenityKey];
  const delaySec = `${(index % 7) * 2.6}s`;

  const crossfade = reduceMotion
    ? { duration: 0.12 }
    : { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={crossfade}
      className="absolute inset-0 overflow-hidden rounded-none"
      style={{ position: "absolute" }}
    >
      <AmenityBackgroundMedia
        media={media}
        inView={inView}
        reduceMotion={reduceMotion}
        lang={lang}
        animationDelay={delaySec}
        imageSizes={IMAGE_SIZES_STAGE}
        eager
      />
      <div
        className="absolute inset-y-0 start-0 z-[2] flex w-1/3 min-w-0 flex-col justify-center gap-3 rounded-none border-e border-white/35 bg-gradient-to-r from-white/75 to-transparent px-4 py-6 backdrop-blur-2xl md:gap-4 md:px-6 md:py-8"
      >
        <Icon
          width={40}
          height={40}
          strokeWidth={ICON_STROKE}
          color={ICON_COLOR}
          className="shrink-0"
          aria-hidden
        />
        <h3
          className={`text-start text-[clamp(1rem,2.1vw,1.28rem)] font-light leading-snug tracking-wider text-[#0f172a] ${lang === "ar" ? "font-arabic" : "font-playfair"}`}
        >
          {t(amenityKey)}
        </h3>
        <p
          className={`line-clamp-3 text-start text-[10px] font-extralight leading-relaxed text-[#0f172a]/90 md:text-[11px] lg:text-xs ${lang === "ar" ? "font-arabic normal-case tracking-normal" : "font-urbanist uppercase tracking-[0.14em]"}`}
        >
          {t(descKey)}
        </p>
      </div>
    </motion.div>
  );
}

export function ProjectAmenities() {
  const { t, lang } = useLang();
  const reduceMotion = useReducedMotion();
  const [featuredKey, setFeaturedKey] = useState<AmenityListKey>(
    AMENITY_LIST_ORDER[0],
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setFeaturedKey((prev) => {
        const i = AMENITY_LIST_ORDER.indexOf(prev);
        return AMENITY_LIST_ORDER[(i + 1) % AMENITY_LIST_ORDER.length]!;
      });
    }, 5000);
    return () => clearInterval(id);
  }, [featuredKey]);

  const onPromote = useCallback((key: AmenityListKey) => {
    setFeaturedKey(key);
  }, []);

  const featuredIndex = AMENITY_LIST_ORDER.indexOf(featuredKey);

  return (
    <section
      className="relative w-full border-t border-charcoal/10 bg-white py-32 md:py-40"
      aria-label={t("amenitiesTitle")}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-8">
        <LuxuryStagger className="mb-6 text-center md:mb-8">
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
            className="relative flex flex-col gap-px md:gap-px shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
            style={{ position: "relative" }}
          >
            <div
              className="relative w-full min-h-[200px] overflow-hidden rounded-none border border-charcoal/10 bg-[#fafafa] [aspect-ratio:21/9] max-h-[500px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]"
              style={{ position: "relative" }}
              role="region"
              aria-label={t(featuredKey)}
            >
              <AnimatePresence mode="sync" initial={false}>
                <AmenityStage
                  key={featuredKey}
                  amenityKey={featuredKey}
                  index={featuredIndex}
                />
              </AnimatePresence>
            </div>

            <div
              className="relative aswar-amenity-filmstrip-wrap min-h-32 overflow-hidden rounded-none bg-white py-0 sm:min-h-36 md:min-h-40"
              style={{ position: "relative" }}
              dir="ltr"
              role="group"
              aria-label={t("amenitiesTitle")}
            >
              <div className="aswar-amenity-filmstrip-track">
                {[0, 1, 2].map((segment) => (
                  <div
                    key={segment}
                    className="aswar-amenity-filmstrip-segment flex shrink-0 pe-px"
                  >
                    {AMENITY_LIST_ORDER.map((amenityKey) => (
                      <FilmstripTile
                        key={`${segment}-${amenityKey}`}
                        amenityKey={amenityKey}
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
