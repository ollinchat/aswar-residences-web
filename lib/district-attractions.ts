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

const districtImage = (file: string) =>
  `/images/district/${encodeURIComponent(file)}`;

export const DISTRICT_ATTRACTIONS_ALL: DistrictAttraction[] = [
  {
    src: districtImage("Ras Al Khor Wildlife Sanctuary.png"),
    alt: "Ras Al Khor Wildlife Sanctuary — flamingos and Dubai skyline at golden hour",
    titleKey: "districtHlSanctuaryTitle",
    kickerKey: "districtHlSanctuaryKicker",
    descKey: "districtHlSanctuaryDesc",
  },
  {
    src: districtImage("Meydan Racecourse.png"),
    alt: "Meydan Racecourse — world-class horse racing under evening lights",
    titleKey: "districtHlMeydanTitle",
    kickerKey: "districtHlMeydanKicker",
    descKey: "districtHlMeydanDesc",
  },
  {
    src: districtImage("Dubai Creek Harbour.png"),
    alt: "Dubai Creek Harbour towers and waterfront skyline at dusk",
    titleKey: "districtHlCreekTowerTitle",
    kickerKey: "districtHlCreekTowerKicker",
    descKey: "districtHlCreekTowerDesc",
  },
  {
    src: districtImage("Downtown Dubai.png"),
    alt: "Downtown Dubai skyline with Burj Khalifa — city centre panorama",
    titleKey: "districtHlDowntownTitle",
    kickerKey: "districtHlDowntownKicker",
    descKey: "districtHlDowntownDesc",
  },
  {
    src: unsplashImage("photo-1497366216548-37526070297c", 1600, 75),
    alt: "Dubai Design District — contemporary architecture and creative workspace",
    titleKey: "districtHlD3Title",
    kickerKey: "districtHlD3Kicker",
    descKey: "districtHlD3Desc",
  },
  {
    src: unsplashImage("photo-1507525428034-b723cf961d3e", 1600, 75),
    alt: "Jumeirah Beach — pristine sands and turquoise waters at golden hour",
    titleKey: "districtHlJumeirahBeachTitle",
    kickerKey: "districtHlJumeirahBeachKicker",
    descKey: "districtHlJumeirahBeachDesc",
  },
];

export const DISTRICT_ATTRACTIONS_INITIAL = 6;
export const DISTRICT_ATTRACTIONS_PAGE = 6;
