/**
 * District Highlights — portrait tiles (`aspect-[3/4]`, `object-cover` in `app/page.tsx`).
 */
import type { CopyKey } from "@/lib/i18n";
import { unsplashImage } from "@/lib/unsplash-image";

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
  src: unsplashImage(photoId, 1600, 75),
  alt,
  titleKey,
  kickerKey,
  descKey,
});

export const DISTRICT_ATTRACTIONS_ALL: DistrictAttraction[] = [
  attraction(
    "photo-1441974231531-c6227db76b6e",
    "Wetlands and wildlife sanctuary landscape near Ras Al Khor",
    "districtHlSanctuaryTitle",
    "districtHlSanctuaryKicker",
    "districtHlSanctuaryDesc",
  ),
  attraction(
    "photo-1544716278-ca5e3f4abd8c",
    "Meydan Racecourse — world-class horse racing under evening lights",
    "districtHlMeydanTitle",
    "districtHlMeydanKicker",
    "districtHlMeydanDesc",
  ),
  attraction(
    "photo-1486406146926-c627a92ad1ab",
    "Dubai Creek Harbour towers and waterfront skyline at dusk",
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
