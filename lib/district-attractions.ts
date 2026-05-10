/**
 * District Highlights — iconic Dubai (`w=1200`, `object-cover` in `app/page.tsx`).
 * Avoid legacy Unsplash IDs that 404 on the CDN (e.g. `photo-1582672060674-884a8839a85f`,
 * `photo-1518684079-b4a468aebefc`, `photo-1526498460520-4c246339543c`,
 * `photo-1600047509355-9dc75507daeb`).
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
    "photo-1546412414-8035e1776c9a",
    "Dubai Marina — waterfront towers and turquoise water",
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
