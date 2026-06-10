"use client";

import Image from "next/image";
import { fillImageParentStyle } from "@/lib/image-layout";

const FLOOR_PLAN_SRC: Record<string, string> = {
  "1br": "/images/residences/1BR.PNG",
  "2br": "/images/residences/2BR.PNG",
};

/** Floor plan visuals per unit type — sourced from `public/images/residences/`. */
export function EngineeringFloorPlan({ unitId }: { unitId: string }) {
  const src = FLOOR_PLAN_SRC[unitId];

  if (!src) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-none border border-charcoal/[0.08] bg-white p-6 md:p-8">
        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-charcoal/40">
          Floor plan unavailable
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-none border border-charcoal/[0.08] bg-white p-4 md:p-6">
      <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.35em] text-charcoal/40">
        Floor plan · {unitId.toUpperCase()}
      </p>
      <div
        className="relative aspect-[4/3] w-full min-h-[min(72vh,820px)] bg-white"
        style={fillImageParentStyle}
      >
        <Image
          src={src}
          alt={`${unitId.toUpperCase()} floor plan`}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 65vw"
          quality={90}
        />
      </div>
    </div>
  );
}
