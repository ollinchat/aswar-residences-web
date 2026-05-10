/** District gallery — Dubai landmarks (Opera, Downtown, leisure, Business Bay canal). */

export type DistrictAttraction = { src: string; alt: string };

/** Retina-friendly crop; `w=1200` balances quality and payload on mobile. */
const landmark = (photoId: string, alt: string): DistrictAttraction => ({
  src: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=80`,
  alt,
});

export const DISTRICT_ATTRACTIONS_ALL: DistrictAttraction[] = [
  landmark(
    "photo-1580674285054-bed31e145f59",
    "Dubai Opera and fountain district",
  ),
  landmark(
    "photo-1512453979798-5ea266f8880c",
    "Downtown Dubai skyline toward Burj Khalifa",
  ),
  landmark(
    "photo-1596462502278-27bfdc403348",
    "Resort parks and leisure attractions",
  ),
  landmark(
    "photo-1528702748617-c64d49f918af",
    "Business Bay water canal and bridges",
  ),
  landmark(
    "photo-1502672260266-1c1ef2d93688",
    "Bright luxury residence interior",
  ),
  landmark(
    "photo-1600566753190-17f0baa2a6c3",
    "Sunlit living room with neutral palette",
  ),
  landmark(
    "photo-1600585154084-4e5fe7c39198",
    "Double-height living with floor-to-ceiling glass",
  ),
  landmark(
    "photo-1496568816309-51d7c20e3b21",
    "Night city lights across the water",
  ),
  landmark(
    "photo-1503387762-592deb58ef4e",
    "Architectural concrete and glass detail",
  ),
  landmark(
    "photo-1493809842364-78817add7ffb",
    "Skyline silhouette at sunset",
  ),
  landmark(
    "photo-1600585154340-be6161a56a0c",
    "Minimal interior with warm daylight",
  ),
  landmark(
    "photo-1600607687644-c7171b42498f",
    "Waterfront towers and promenade",
  ),
];

export const DISTRICT_ATTRACTIONS_INITIAL = 4;
export const DISTRICT_ATTRACTIONS_PAGE = 4;
