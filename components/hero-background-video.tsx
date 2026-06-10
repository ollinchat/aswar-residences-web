"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_VIDEO_POSTER, HERO_VIDEO_SOURCES } from "@/lib/hero-videos";

const CROSSFADE_MS = 1200;

export function HeroBackgroundVideo() {
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);
  const [activeSlot, setActiveSlot] = useState<"a" | "b">("a");
  const [videoIndex, setVideoIndex] = useState(0);
  const fadingRef = useRef(false);

  const refs = { a: videoRefA, b: videoRefB } as const;

  const playSlot = useCallback(async (slot: "a" | "b", index: number) => {
    const el = refs[slot].current;
    if (!el) return;
    const src = HERO_VIDEO_SOURCES[index]!;
    if (el.dataset.src !== src) {
      el.src = src;
      el.dataset.src = src;
      el.load();
    }
    try {
      await el.play();
    } catch {
      /* autoplay policy or load race */
    }
  }, []);

  useEffect(() => {
    void playSlot("a", 0);
  }, [playSlot]);

  useEffect(() => {
    const inactive = activeSlot === "a" ? videoRefB : videoRefA;
    inactive.current?.pause();
  }, [activeSlot]);

  const advanceSequence = useCallback(() => {
    if (fadingRef.current) return;

    const nextIndex = (videoIndex + 1) % HERO_VIDEO_SOURCES.length;
    const nextSlot = activeSlot === "a" ? "b" : "a";

    fadingRef.current = true;
    void playSlot(nextSlot, nextIndex).then(() => {
      setActiveSlot(nextSlot);
      setVideoIndex(nextIndex);
      window.setTimeout(() => {
        fadingRef.current = false;
      }, CROSSFADE_MS);
    });
  }, [activeSlot, playSlot, videoIndex]);

  const videoClass = (slot: "a" | "b") =>
    `absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
      activeSlot === slot ? "opacity-100" : "opacity-0"
    }`;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ position: "absolute" }}
      aria-hidden
    >
      <video
        ref={videoRefA}
        className={videoClass("a")}
        style={{ position: "absolute" }}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={HERO_VIDEO_POSTER}
        onEnded={activeSlot === "a" ? advanceSequence : undefined}
      />
      <video
        ref={videoRefB}
        className={videoClass("b")}
        style={{ position: "absolute" }}
        muted
        playsInline
        preload="metadata"
        poster={HERO_VIDEO_POSTER}
        onEnded={activeSlot === "b" ? advanceSequence : undefined}
      />
    </div>
  );
}
