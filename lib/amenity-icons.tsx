import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Dumbbell,
  Footprints,
  Sparkles,
  Umbrella,
  Waves,
} from "lucide-react";
import type { AmenityListKey } from "@/lib/amenity-hotspots";

export const AMENITY_ICONS: Record<AmenityListKey, LucideIcon> = {
  amenityPoolCabanas: Waves,
  amenityRooftopLounge: Building2,
  amenityYogaDeck: Sparkles,
  amenityGym: Dumbbell,
  amenityJoggingTrack: Footprints,
};
