"use client";

import Image from "next/image";
import {
  HERITAGE_MASONRY_IMAGES,
  HERITAGE_SLIDER_IMAGES,
} from "@/lib/heritage-gallery";
import { REMOTE_IMAGE_BLUR_DATA_URL } from "@/lib/image-blur-placeholder";

type Variant = "slider" | "masonry";

export function HeritageProjectGallery({ variant = "slider" }: { variant?: Variant }) {
  if (variant === "slider") {
    return (
      <div
        className="-mx-1 flex gap-4 overflow-x-auto overscroll-x-contain pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory md:mx-0 [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label="Project photography"
      >
        {HERITAGE_SLIDER_IMAGES.map((img, i) => (
          <div
            key={img.src}
            className="relative h-[200px] w-[min(78vw,300px)] shrink-0 snap-center overflow-hidden rounded-sm bg-charcoal/[0.06] sm:h-[240px] sm:w-[min(70vw,340px)] md:h-[260px] md:w-[300px]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width:768px) 78vw, 300px"
              className="object-cover"
              placeholder="blur"
              blurDataURL={REMOTE_IMAGE_BLUR_DATA_URL}
              priority={i < 2}
            />
          </div>
        ))}
      </div>
    );
  }

  const [a, b, c] = HERITAGE_MASONRY_IMAGES;

  return (
    <div
      className="grid grid-cols-3 gap-2 sm:gap-2.5"
      aria-label="Project photography"
    >
      <div className="relative col-span-2 row-span-2 min-h-[160px] overflow-hidden rounded-sm bg-charcoal/[0.06] sm:min-h-[200px] md:min-h-[220px]">
        <Image
          src={a.src}
          alt={a.alt}
          fill
          sizes="(max-width:768px) 66vw, 440px"
          className="object-cover"
          placeholder="blur"
          blurDataURL={REMOTE_IMAGE_BLUR_DATA_URL}
          priority
        />
      </div>
      <div className="relative min-h-[76px] overflow-hidden rounded-sm bg-charcoal/[0.06] sm:min-h-[96px]">
        <Image
          src={b.src}
          alt={b.alt}
          fill
          sizes="(max-width:768px) 33vw, 200px"
          className="object-cover"
          placeholder="blur"
          blurDataURL={REMOTE_IMAGE_BLUR_DATA_URL}
        />
      </div>
      <div className="relative min-h-[76px] overflow-hidden rounded-sm bg-charcoal/[0.06] sm:min-h-[96px]">
        <Image
          src={c.src}
          alt={c.alt}
          fill
          sizes="(max-width:768px) 33vw, 200px"
          className="object-cover"
          placeholder="blur"
          blurDataURL={REMOTE_IMAGE_BLUR_DATA_URL}
        />
      </div>
    </div>
  );
}
