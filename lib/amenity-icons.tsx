import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  BookOpen,
  Building2,
  Dumbbell,
  Flame,
  Flower2,
  Sparkles,
  ToyBrick,
  Umbrella,
  Users,
  Waves,
} from "lucide-react";
import type { AmenityListKey } from "@/lib/amenity-hotspots";

/** Line icons for amenities ribbon & detail cards (thin stroke via strokeWidth on use). */
export const AMENITY_ICONS: Record<AmenityListKey, LucideIcon> = {
  amenityFurnishedUnits: Armchair,
  amenityAdultKidsPools: Waves,
  amenityGymJogTrack: Dumbbell,
  amenityYogaMultipurposeDecks: Sparkles,
  amenityBbqFirePit: Flame,
  amenityKidsPlayground: ToyBrick,
  amenityReadingBeanBags: BookOpen,
  amenityCabanasWetDecks: Umbrella,
  amenityCourtyardWaterGarden: Flower2,
  amenityMultipurposeHallLawn: Users,
  amenityRooftopOpenArea: Building2,
};
