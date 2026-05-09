"use client";

import Image from "next/image";
import { HERITAGE_GALLERY_IMAGES } from "@/lib/heritage-gallery";

type Variant = "slider" | "masonry";

export function HeritageProjectGallery({ variant = "slider" }: { variant?: Variant }) {
  const images = [...HERITAGE_GALLERY_IMAGES];

  if (variant === "slider") {
    return (
      <div
        className="-mx-1 flex gap-4 overflow-x-auto overscroll-x-contain pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory md:mx-0 [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label="Project photography"
      >
        {images.map((img) => (
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
            />
          </div>
        ))}
      </div>
    );
  }

  const [a, b, c, d, e] = images;
  const masonry = [a, b, c, d, e].filter(Boolean);

  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-3" aria-label="Project photography">
      {masonry[0] ? (
        <div className="relative col-span-2 row-span-2 min-h-[200px] overflow-hidden rounded-sm bg-charcoal/[0.06] sm:min-h-[260px] md:min-h-[300px]">
          <Image
            src={masonry[0].src}
            alt={masonry[0].alt}
            fill
            sizes="(max-width:768px) 66vw, 480px"
            className="object-cover"
          />
        </div>
      ) : null}
      {masonry[1] ? (
        <div className="relative min-h-[96px] overflow-hidden rounded-sm bg-charcoal/[0.06] sm:min-h-[124px]">
          <Image
            src={masonry[1].src}
            alt={masonry[1].alt}
            fill
            sizes="(max-width:768px) 33vw, 200px"
            className="object-cover"
          />
        </div>
      ) : null}
      {masonry[2] ? (
        <div className="relative min-h-[96px] overflow-hidden rounded-sm bg-charcoal/[0.06] sm:min-h-[124px]">
          <Image
            src={masonry[2].src}
            alt={masonry[2].alt}
            fill
            sizes="(max-width:768px) 33vw, 200px"
            className="object-cover"
          />
        </div>
      ) : null}
      {masonry[3] ? (
        <div className="relative col-span-3 min-h-[140px] overflow-hidden rounded-sm bg-charcoal/[0.06] sm:min-h-[180px]">
          <Image
            src={masonry[3].src}
            alt={masonry[3].alt}
            fill
            sizes="(max-width:768px) 100vw, 720px"
            className="object-cover"
          />
        </div>
      ) : null}
      {masonry[4] ? (
        <div className="relative col-span-3 min-h-[120px] overflow-hidden rounded-sm bg-charcoal/[0.06] sm:min-h-[140px]">
          <Image
            src={masonry[4].src}
            alt={masonry[4].alt}
            fill
            sizes="(max-width:768px) 100vw, 240px"
            className="object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}
