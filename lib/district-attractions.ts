/**
 * District Highlights — portrait tiles (`aspect-[3/4]`, `object-cover` in `app/page.tsx`).
 */
import type { CopyKey } from "@/lib/i18n";

export type DistrictAttraction = {
  src: string;
  alt: string;
  titleKey: CopyKey;
  kickerKey: CopyKey;
};

const attraction = (
  photoId: string,
  alt: string,
  titleKey: CopyKey,
  kickerKey: CopyKey,
): DistrictAttraction => ({
  src: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=80`,
  alt,
  titleKey,
  kickerKey,
});

export const DISTRICT_ATTRACTIONS_ALL: DistrictAttraction[] = [
  attraction(
    "photo-1512453979798-5ea266f8880c",
    "Downtown Dubai and Burj Khalifa area — aerial city centre energy",
    "districtHlDowntownTitle",
    "districtHlDowntownKicker",
  ),
  attraction(
    "photo-1546412414-8035e1776c9a",
    "Dubai Marina — waterfront towers and turquoise water",
    "districtHlMarinaTitle",
    "districtHlMarinaKicker",
  ),
  attraction(
    "photo-1582650625119-3a31f8fa2699",
    "Entertainment and theme parks — Ferris wheel and resort energy",
    "districtHlLeisureTitle",
    "districtHlLeisureKicker",
  ),
  attraction(
    "photo-1608991156162-3c55b3cf05d3",
    "Dubai at night — stadium-scale skyline and city lights",
    "districtHlNightTitle",
    "districtHlNightKicker",
  ),
  attraction(
    "photo-1516624683217-bf02fc6b6b7c",
    "Nature and wildlife — safari and open landscape",
    "districtHlNatureTitle",
    "districtHlNatureKicker",
  ),
];

export const DISTRICT_ATTRACTIONS_INITIAL = 4;
export const DISTRICT_ATTRACTIONS_PAGE = 4;
