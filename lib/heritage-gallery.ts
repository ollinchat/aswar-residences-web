/**
 * Cinematic architecture & lifestyle — Ultra-HD Unsplash (`q=88`).
 */
const u = (photoId: string, w = 1800) =>
  `https://images.unsplash.com/${photoId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${w}&q=88`;

/** Compact home masonry — luxury built form */
export const HERITAGE_MASONRY_IMAGES = [
  {
    src: u("photo-1600585154526-990dced4db0d"),
    alt: "Luxury residence interior — marble, glass, and soft natural light",
  },
  {
    src: u("photo-1600607687939-ce8a6c25118c"),
    alt: "Contemporary tower façade with gold-hour glazing",
  },
  {
    src: u("photo-1480714378408-67cf0d13bc1b"),
    alt: "Cinematic Dubai architectural skyline at dusk",
  },
] as const;

/** About page horizontal strip — architecture & lifestyle */
export const HERITAGE_SLIDER_IMAGES = [
  ...HERITAGE_MASONRY_IMAGES,
  {
    src: u("photo-1600566753190-17f0baa2a6c3"),
    alt: "Premium living room with designer finishes and city views",
  },
  {
    src: u("photo-1600047509807-ba8f99d2cdde"),
    alt: "Glass-walled penthouse lounge overlooking the skyline",
  },
  {
    src: u("photo-1600585154340-be6161a56a0c"),
    alt: "Resort-grade pool terrace with cabanas and calm water",
  },
] as const;

/** @deprecated use HERITAGE_SLIDER_IMAGES or HERITAGE_MASONRY_IMAGES */
export const HERITAGE_GALLERY_IMAGES = HERITAGE_SLIDER_IMAGES;
