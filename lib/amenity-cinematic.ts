import {
  AMENITY_HOTSPOTS,
  AMENITY_LIST_ORDER,
  type AmenityListKey,
} from "@/lib/amenity-hotspots";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&q=82`;

/** Sleek silver/glass monolith — replace with branded 3D render when available. */
export const CINEMATIC_TOWER_SRC = u("photo-1486325212027-8081e485255e");

/** Demo loops (replace with `/amenities/*.mp4` in `public/` for production). */
const V_FLOWER =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const V_SAMPLE =
  "https://www.w3schools.com/html/mov_bbb.mp4";

export type CinematicAmenityMeta = {
  /** Higher = closer to roof in timeline (elevator up). */
  floorLevel: number;
  floorLabel: string;
  interiorSrc: string;
  /** Optional ambient loop; poster uses `interiorSrc`. */
  videoSrc: string;
  /** Focus “jump”: scale + translate on building stage. */
  focusScale: number;
  focusX: string;
  focusY: string;
};

export const CINEMATIC_BY_KEY: Record<AmenityListKey, CinematicAmenityMeta> = {
  amenityFurnishedUnits: {
    floorLevel: 5,
    floorLabel: "L24",
    interiorSrc: u("photo-1600585154340-be6161a56a0c"),
    videoSrc: V_FLOWER,
    focusScale: 1.38,
    focusX: "-16%",
    focusY: "-6%",
  },
  amenityAdultKidsPools: {
    floorLevel: 9,
    floorLabel: "L45",
    interiorSrc: u("photo-1576013551627-0cc20b96c2a7"),
    videoSrc: V_SAMPLE,
    focusScale: 1.48,
    focusX: "-22%",
    focusY: "-14%",
  },
  amenityGymJogTrack: {
    floorLevel: 6,
    floorLabel: "L32",
    interiorSrc: u("photo-1571902943202-507ec2618e8f"),
    videoSrc: V_FLOWER,
    focusScale: 1.42,
    focusX: "18%",
    focusY: "-8%",
  },
  amenityYogaMultipurposeDecks: {
    floorLevel: 7,
    floorLabel: "L38",
    interiorSrc: u("photo-1544367567-0f2fcb009e0b"),
    videoSrc: V_FLOWER,
    focusScale: 1.44,
    focusX: "-20%",
    focusY: "-12%",
  },
  amenityBbqFirePit: {
    floorLevel: 4,
    floorLabel: "L18",
    interiorSrc: u("photo-1519710164239-da123dc03ef4"),
    videoSrc: V_SAMPLE,
    focusScale: 1.36,
    focusX: "14%",
    focusY: "4%",
  },
  amenityKidsPlayground: {
    floorLevel: 1,
    floorLabel: "P1",
    interiorSrc: u("photo-1497366216548-37526070297c"),
    videoSrc: V_FLOWER,
    focusScale: 1.32,
    focusX: "12%",
    focusY: "10%",
  },
  amenityReadingBeanBags: {
    floorLevel: 5,
    floorLabel: "L26",
    interiorSrc: u("photo-1600607687939-ce8a6c25118c"),
    videoSrc: V_FLOWER,
    focusScale: 1.4,
    focusX: "-18%",
    focusY: "-4%",
  },
  amenityCabanasWetDecks: {
    floorLevel: 8,
    floorLabel: "L42",
    interiorSrc: u("photo-1566073771259-6a8506099945"),
    videoSrc: V_FLOWER,
    focusScale: 1.46,
    focusX: "-24%",
    focusY: "-10%",
  },
  amenityCourtyardWaterGarden: {
    floorLevel: 3,
    floorLabel: "L12",
    interiorSrc: u("photo-1600047509807-ba8f99d2cdde"),
    videoSrc: V_SAMPLE,
    focusScale: 1.34,
    focusX: "16%",
    focusY: "6%",
  },
  amenityMultipurposeHallLawn: {
    floorLevel: 2,
    floorLabel: "L06",
    interiorSrc: u("photo-1545324418-cc1a3fa10c00"),
    videoSrc: V_FLOWER,
    focusScale: 1.33,
    focusX: "10%",
    focusY: "8%",
  },
  amenityRooftopOpenArea: {
    floorLevel: 10,
    floorLabel: "RF",
    interiorSrc: u("photo-1600596542815-ffad4c1539a9"),
    videoSrc: V_SAMPLE,
    focusScale: 1.52,
    focusX: "-26%",
    focusY: "-18%",
  },
};

/** Timeline: roof at top → podium at bottom (elevator metaphor). */
export const TIMELINE_KEYS: AmenityListKey[] = [...AMENITY_LIST_ORDER].sort(
  (a, b) => CINEMATIC_BY_KEY[b].floorLevel - CINEMATIC_BY_KEY[a].floorLevel,
);

export function getHotspotForKey(key: AmenityListKey) {
  return AMENITY_HOTSPOTS.find((h) => h.key === key);
}
