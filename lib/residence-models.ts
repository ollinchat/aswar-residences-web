export type ResidenceModel = {
  id: string;
  label: string;
  /** Numeric areas for Sq.Ft / Sq.M toggle */
  areas: {
    totalSqft: number;
    balconySqft: number;
  };
  specs: {
    parkingBays: number;
    elevator: boolean;
    accessibility: boolean;
    /** High-end interior specification */
    furnishing: "full";
  };
  images: string[];
  pano: string;
  booking: {
    availableUnits: number;
    totalUnits: number;
    priceMin: number;
    priceMax: number;
  };
};

export const RESIDENCE_MODELS: ResidenceModel[] = [
  {
    id: "studio",
    label: "Studio",
    areas: { totalSqft: 548, balconySqft: 52 },
    specs: {
      parkingBays: 1,
      elevator: true,
      accessibility: true,
      furnishing: "full",
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=88",
    ],
    pano: "/hero-360-panorama.jpg",
    booking: { availableUnits: 14, totalUnits: 42, priceMin: 1_100_000, priceMax: 1_550_000 },
  },
  {
    id: "1br",
    label: "1BR",
    areas: { totalSqft: 892, balconySqft: 118 },
    specs: {
      parkingBays: 1,
      elevator: true,
      accessibility: true,
      furnishing: "full",
    },
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=88",
    ],
    pano: "/hero-360-panorama.jpg",
    booking: { availableUnits: 11, totalUnits: 56, priceMin: 1_650_000, priceMax: 2_350_000 },
  },
  {
    id: "2br",
    label: "2BR",
    areas: { totalSqft: 1420, balconySqft: 186 },
    specs: {
      parkingBays: 2,
      elevator: true,
      accessibility: true,
      furnishing: "full",
    },
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1800&q=88",
    ],
    pano: "/hero-360-panorama.jpg",
    booking: { availableUnits: 9, totalUnits: 48, priceMin: 2_750_000, priceMax: 3_950_000 },
  },
  {
    id: "3br",
    label: "3BR",
    areas: { totalSqft: 2180, balconySqft: 240 },
    specs: {
      parkingBays: 2,
      elevator: true,
      accessibility: true,
      furnishing: "full",
    },
    images: [
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1800&q=88",
    ],
    pano: "/hero-360-panorama.jpg",
    booking: { availableUnits: 6, totalUnits: 32, priceMin: 4_100_000, priceMax: 5_850_000 },
  },
  {
    id: "penthouse",
    label: "Penthouse",
    areas: { totalSqft: 4850, balconySqft: 620 },
    specs: {
      parkingBays: 3,
      elevator: true,
      accessibility: true,
      furnishing: "full",
    },
    images: [
      "https://images.unsplash.com/photo-1600047509355-9dc75507daeb?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=88",
    ],
    pano: "/hero-360-panorama.jpg",
    booking: { availableUnits: 3, totalUnits: 8, priceMin: 8_200_000, priceMax: 16_500_000 },
  },
];
