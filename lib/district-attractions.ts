/**
 * District Highlights — iconic Dubai (`w=1200`, `object-cover` in `app/page.tsx`).
 * Hero: `photo-1512453979798-5ea266f8880c` (aerial Downtown / highways, verified 200).
 * Stadium/night tile uses a separate night-skyline asset so the grid has no duplicate hero.
 */

export type DistrictAttraction = { src: string; alt: string };

const landmark = (photoId: string, alt: string): DistrictAttraction => ({
  src: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=80`,
  alt,
});

export const DISTRICT_ATTRACTIONS_ALL: DistrictAttraction[] = [
  landmark(
    "photo-1512453979798-5ea266f8880c",
    "Downtown Dubai and Burj Khalifa area — aerial city centre energy",
  ),
  landmark(
    "photo-1528702748617-c64d49f918af",
    "Beach and waterfront — turquoise water and luxury towers",
  ),
  landmark(
    "photo-1582650625119-3a31f8fa2699",
    "Entertainment and theme parks — Ferris wheel and resort energy",
  ),
  landmark(
    "photo-1608991156162-3c55b3cf05d3",
    "Dubai at night — stadium-scale skyline and city lights",
  ),
  landmark(
    "photo-1516624683217-bf02fc6b6b7c",
    "Nature and wildlife — safari and open landscape",
  ),
];

export const DISTRICT_ATTRACTIONS_INITIAL = 4;
export const DISTRICT_ATTRACTIONS_PAGE = 4;
