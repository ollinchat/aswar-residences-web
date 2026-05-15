import type { CopyKey } from "@/lib/i18n";

/** Core amenities from ASWAR sales materials (PDF). */
export const AMENITY_LIST_ORDER = [
  "amenityPoolCabanas",
  "amenityRooftopLounge",
  "amenityYogaDeck",
  "amenityGym",
  "amenityJoggingTrack",
] as const satisfies readonly CopyKey[];

export type AmenityListKey = (typeof AMENITY_LIST_ORDER)[number];
