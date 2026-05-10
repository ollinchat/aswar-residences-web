import type { CopyKey } from "@/lib/i18n";

/** Grid order for the right-hand list (matches product copy flow). */
export const AMENITY_LIST_ORDER = [
  "amenityFurnishedUnits",
  "amenityAdultKidsPools",
  "amenityGymJogTrack",
  "amenityYogaMultipurposeDecks",
  "amenityBbqFirePit",
  "amenityKidsPlayground",
  "amenityReadingBeanBags",
  "amenityCabanasWetDecks",
  "amenityCourtyardWaterGarden",
  "amenityMultipurposeHallLawn",
  "amenityRooftopOpenArea",
] as const satisfies readonly CopyKey[];

export type AmenityListKey = (typeof AMENITY_LIST_ORDER)[number];

/** Overlay positions (% of building image box). `focusRotateY` = snap angle (deg) when amenity is selected from list or hotspot. */
export type AmenityHotspot = {
  key: AmenityListKey;
  top: string;
  left: string;
  focusRotateY: number;
};

export const AMENITY_HOTSPOTS: AmenityHotspot[] = [
  { key: "amenityRooftopOpenArea", top: "9%", left: "46%", focusRotateY: 14 },
  { key: "amenityAdultKidsPools", top: "17%", left: "54%", focusRotateY: 10 },
  { key: "amenityGymJogTrack", top: "30%", left: "36%", focusRotateY: -6 },
  { key: "amenityYogaMultipurposeDecks", top: "26%", left: "56%", focusRotateY: 8 },
  { key: "amenityFurnishedUnits", top: "42%", left: "40%", focusRotateY: -4 },
  { key: "amenityBbqFirePit", top: "46%", left: "34%", focusRotateY: -10 },
  { key: "amenityCabanasWetDecks", top: "36%", left: "50%", focusRotateY: 4 },
  { key: "amenityReadingBeanBags", top: "50%", left: "52%", focusRotateY: 6 },
  { key: "amenityCourtyardWaterGarden", top: "58%", left: "44%", focusRotateY: -2 },
  { key: "amenityMultipurposeHallLawn", top: "66%", left: "48%", focusRotateY: 2 },
  { key: "amenityKidsPlayground", top: "74%", left: "30%", focusRotateY: -12 },
];
