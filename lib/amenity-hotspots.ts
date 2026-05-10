import type { CopyKey } from "@/lib/i18n";

/** Order for the amenities showcase list (matches product copy flow). */
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
