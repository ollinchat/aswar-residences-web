/** Sami Najami project photography — `public/images/heritage/` */

const heritageImage = (file: string) => `/images/heritage/${file}`;

export const HERITAGE_MASONRY_IMAGES = [
  {
    src: heritageImage("5.jpg"),
    alt: "Sami Najami — steel structure lift on a major construction site",
  },
  {
    src: heritageImage("16.jpg"),
    alt: "Sami Najami — industrial truss installation under floodlights",
  },
  {
    src: heritageImage("25.jpg"),
    alt: "Sami Najami — pipe rack lifting operations on an engineering project",
  },
] as const;

/** About page horizontal strip — same project set */
export const HERITAGE_SLIDER_IMAGES = [...HERITAGE_MASONRY_IMAGES] as const;

/** @deprecated use HERITAGE_SLIDER_IMAGES or HERITAGE_MASONRY_IMAGES */
export const HERITAGE_GALLERY_IMAGES = HERITAGE_SLIDER_IMAGES;
