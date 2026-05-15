/**
 * District Highlights — portrait tiles (`aspect-[3/4]`, `object-cover` in `app/page.tsx`).
 */
import type { CopyKey } from "@/lib/i18n";

export type DistrictAttraction = {
  src: string;
  alt: string;
  titleKey: CopyKey;
  kickerKey: CopyKey;
  descKey: CopyKey;
};

const attraction = (
  photoId: string,
  alt: string,
  titleKey: CopyKey,
  kickerKey: CopyKey,
  descKey: CopyKey,
): DistrictAttraction => ({
  src: `https://images.unsplash.com/${photoId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=88`,
  alt,
  titleKey,
  kickerKey,
  descKey,
});

export const DISTRICT_ATTRACTIONS_ALL: DistrictAttraction[] = [
  attraction(
    "photo-1551884834-b42e9a02d1f3",
    "Pink flamingos at Ras Al Khor Wildlife Sanctuary wetlands",
    "districtHlSanctuaryTitle",
    "districtHlSanctuaryKicker",
    "districtHlSanctuaryDesc",
  ),
  attraction(
    "photo-1553284965-680caea199b0",
    "Meydan Racecourse — world-class horse racing under evening lights",
    "districtHlMeydanTitle",
    "districtHlMeydanKicker",
    "districtHlMeydanDesc",
  ),
  attraction(
    "photo-1518684079-3c83eb24d39d",
    "Dubai Creek Harbour skyline and waterfront towers at dusk",
    "districtHlCreekTowerTitle",
    "districtHlCreekTowerKicker",
    "districtHlCreekTowerDesc",
  ),
  attraction(
    "photo-1512453979798-5ea266f8880c",
    "Downtown Dubai skyline with Burj Khalifa — city centre panorama",
    "districtHlDowntownTitle",
    "districtHlDowntownKicker",
    "districtHlDowntownDesc",
  ),
];

export const DISTRICT_ATTRACTIONS_INITIAL = 4;
export const DISTRICT_ATTRACTIONS_PAGE = 4;
