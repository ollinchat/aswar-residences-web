import { unsplashImage } from "@/lib/unsplash-image";

/** Compact home masonry — luxury built form */
export const HERITAGE_MASONRY_IMAGES = [
  {
    src: unsplashImage("photo-1600585154526-990dced4db0d", 1800, 75),
    alt: "Luxury residence interior — marble, glass, and soft natural light",
  },
  {
    src: unsplashImage("photo-1600607687939-ce8a6c25118c", 1800, 75),
    alt: "Contemporary tower façade with gold-hour glazing",
  },
  {
    src: unsplashImage("photo-1480714378408-67cf0d13bc1b", 1800, 75),
    alt: "Cinematic Dubai architectural skyline at dusk",
  },
] as const;

/** About page horizontal strip — architecture & lifestyle */
export const HERITAGE_SLIDER_IMAGES = [
  ...HERITAGE_MASONRY_IMAGES,
  {
    src: unsplashImage("photo-1600566753190-17f0baa2a6c3", 1800, 75),
    alt: "Premium living room with designer finishes and city views",
  },
  {
    src: unsplashImage("photo-1600047509807-ba8f99d2cdde", 1800, 75),
    alt: "Glass-walled penthouse lounge overlooking the skyline",
  },
  {
    src: unsplashImage("photo-1600585154340-be6161a56a0c", 1800, 75),
    alt: "Resort-grade pool terrace with cabanas and calm water",
  },
] as const;

/** @deprecated use HERITAGE_SLIDER_IMAGES or HERITAGE_MASONRY_IMAGES */
export const HERITAGE_GALLERY_IMAGES = HERITAGE_SLIDER_IMAGES;
