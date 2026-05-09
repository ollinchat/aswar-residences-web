/**
 * Construction / architecture — reliable Unsplash IDs (`ixlib` crop).
 * Masonry (home): first 3. Slider (about): full set.
 */
const u = (photoId: string, w = 1600) =>
  `https://images.unsplash.com/${photoId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${w}&q=85`;

/** Compact home masonry — engineering & built form */
export const HERITAGE_MASONRY_IMAGES = [
  {
    src: u("photo-1504307651254-35680f356dfd"),
    alt: "Structural steel and concrete on site",
  },
  {
    src: u("photo-1541888946425-d81bb19240f5"),
    alt: "Tower crane against high-rise shell",
  },
  {
    src: u("photo-1486406146926-c627a92ad1ab"),
    alt: "Glass towers converging toward the sky",
  },
] as const;

/** About page horizontal strip — architecture & detail */
export const HERITAGE_SLIDER_IMAGES = [
  ...HERITAGE_MASONRY_IMAGES,
  {
    src: u("photo-1493809842364-78817add7ffb"),
    alt: "Modern façade rhythm and glazing",
  },
  {
    src: u("photo-1545324418-cc1a3fa10c00"),
    alt: "Residential towers at dusk",
  },
  {
    src: u("photo-1600585154340-be6161a56a0c"),
    alt: "Minimal interior with architectural light",
  },
] as const;

/** @deprecated use HERITAGE_SLIDER_IMAGES or HERITAGE_MASONRY_IMAGES */
export const HERITAGE_GALLERY_IMAGES = HERITAGE_SLIDER_IMAGES;
