import { sqmToSqft } from "@/lib/area-format";
import { unsplashImage } from "@/lib/unsplash-image";

export type ResidenceModel = {
  id: string;
  label: string;
  /** Authoritative gross area range from ASWAR sales materials (sqm). */
  areaSqm: { min: number; max: number };
  /** Numeric areas for Sq.Ft / Sq.M toggle (midpoint of range). */
  areas: {
    totalSqft: number;
    balconySqft: number;
  };
  spatial: {
    gardenSqft: number | null;
    kitchenSqft: number;
    livingSqft: number;
    masterBedSqft: number;
    additionalBedroomsSqft: number | null;
  };
  specs: {
    parkingBays: number;
    elevator: boolean;
    accessibility: boolean;
    furnishing: "full";
    smartHome: boolean;
    security: "24/7";
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

function modelFromSqm(
  base: Omit<ResidenceModel, "areas"> & {
    balconySqm: number;
  },
): ResidenceModel {
  const midSqm = (base.areaSqm.min + base.areaSqm.max) / 2;
  const totalSqft = sqmToSqft(midSqm);
  const balconySqft = sqmToSqft(base.balconySqm);
  const { balconySqm: _b, ...rest } = base;
  return {
    ...rest,
    areas: { totalSqft, balconySqft },
  };
}

export const RESIDENCE_MODELS: ResidenceModel[] = [
  modelFromSqm({
    id: "1br",
    label: "1BR",
    areaSqm: { min: 75, max: 77 },
    balconySqm: 11,
    spatial: {
      gardenSqft: null,
      kitchenSqft: 95,
      livingSqft: 280,
      masterBedSqft: 340,
      additionalBedroomsSqft: null,
    },
    specs: {
      parkingBays: 1,
      elevator: true,
      accessibility: true,
      furnishing: "full",
      smartHome: true,
      security: "24/7",
    },
    images: [
      unsplashImage("photo-1600585154526-990dced4db0d", 2000, 75),
      unsplashImage("photo-1600210492486-724fe5c67fb0", 2000, 75),
      unsplashImage("photo-1600566753190-17f0baa2a6c3", 2000, 75),
    ],
    pano: "/hero-360-panorama.jpg",
    booking: {
      availableUnits: 11,
      totalUnits: 56,
      priceMin: 1_650_000,
      priceMax: 2_350_000,
    },
  }),
  modelFromSqm({
    id: "2br",
    label: "2BR",
    areaSqm: { min: 130, max: 156 },
    balconySqm: 18,
    spatial: {
      gardenSqft: null,
      kitchenSqft: 125,
      livingSqft: 385,
      masterBedSqft: 320,
      additionalBedroomsSqft: 310,
    },
    specs: {
      parkingBays: 2,
      elevator: true,
      accessibility: true,
      furnishing: "full",
      smartHome: true,
      security: "24/7",
    },
    images: [
      unsplashImage("photo-1600607687644-c7171b42498f", 2000, 75),
      unsplashImage("photo-1600047509807-ba8f99d2cdde", 2000, 75),
      unsplashImage("photo-1600585154084-4e5fe7c39198", 2000, 75),
    ],
    pano: "/hero-360-panorama.jpg",
    booking: {
      availableUnits: 9,
      totalUnits: 48,
      priceMin: 2_750_000,
      priceMax: 3_950_000,
    },
  }),
];
