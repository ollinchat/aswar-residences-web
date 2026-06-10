import type { AmenityListKey } from "@/lib/amenity-hotspots";

export type AmenityVisualMedia =
  | {
      kind: "image";
      src: string;
      altEn: string;
      altAr: string;
    }
  | {
      kind: "video";
      src: string;
      poster: string;
      altEn: string;
      altAr: string;
    };

const AMENITY_IMG = (file: string) =>
  `/images/amenities/${encodeURIComponent(file)}`;

export const AMENITY_VISUALS: Record<AmenityListKey, AmenityVisualMedia> = {
  amenityPoolCabanas: {
    kind: "image",
    src: AMENITY_IMG("Pool with Cabanas.PNG"),
    altEn: "Infinity pool with cabanas, marble deck, and Dubai skyline at golden hour",
    altAr: "مسبح لا متناهٍ مع كبائن ورخام وأفق دبي عند الغروب",
  },
  amenityRooftopLounge: {
    kind: "image",
    src: AMENITY_IMG("Rooftop Lounge.PNG"),
    altEn: "Rooftop lounge with glass façade and Dubai skyline at golden hour",
    altAr: "صالة سطح بواجهة زجاجية وأفق دبي عند الغروب",
  },
  amenityYogaDeck: {
    kind: "image",
    src: AMENITY_IMG("Yoga Deck.PNG"),
    altEn: "Yoga deck with reformers, mats, and Dubai skyline at golden hour",
    altAr: "سطح يوغا مع أجهزة رياضية وسجاد وأفق دبي عند الغروب",
  },
  amenityGym: {
    kind: "image",
    src: AMENITY_IMG("Gym.PNG"),
    altEn: "Boutique fitness studio with premium equipment and Dubai skyline views",
    altAr: "صالة لياقة بوتيكية بمعدات فاخرة وإطلالة على أفق دبي",
  },
  amenityJoggingTrack: {
    kind: "image",
    src: AMENITY_IMG("Jogging Track.PNG"),
    altEn: "Landscaped jogging path with glass tower backdrop at golden hour",
    altAr: "مسار جري منسّق مع أبراج زجاجية عند الغروب",
  },
};
