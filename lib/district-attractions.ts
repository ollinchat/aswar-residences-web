/** District gallery — reliable Unsplash crops (Dubai / waterfront / luxury). */

export type DistrictAttraction = { src: string; alt: string };

const u = (photoId: string, w = 1920) =>
  `https://images.unsplash.com/${photoId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${w}&q=85`;

export const DISTRICT_ATTRACTIONS_ALL: DistrictAttraction[] = [
  {
    src: u("photo-1512453979798-5ea266f8880c"),
    alt: "Dubai skyline toward Business Bay",
  },
  {
    src: u("photo-1582672060674-884a8839a85f"),
    alt: "Waterfront promenade at golden hour",
  },
  {
    src: u("photo-1518684079-b4a468aebefc"),
    alt: "Contemporary boulevard and towers",
  },
  {
    src: u("photo-1526498460520-4c246339543c"),
    alt: "Urban beach and city backdrop",
  },
  {
    src: u("photo-1503387762-592deb58ef4e"),
    alt: "Architectural concrete and glass detail",
  },
  {
    src: u("photo-1502672260266-1c1ef2d93688"),
    alt: "Bright open-plan apartment interior",
  },
  {
    src: u("photo-1496568816309-51d7c20e3b21"),
    alt: "Night city lights across the water",
  },
  {
    src: u("photo-1578895678588-2e8d8434d53f"),
    alt: "Marina walkways and yachts",
  },
  {
    src: u("photo-1600585154084-4e5fe7c39198"),
    alt: "Double-height living with floor-to-ceiling glass",
  },
  {
    src: u("photo-1600566753190-17f0baa2a6c3"),
    alt: "Sunlit living room with neutral palette",
  },
  {
    src: u("photo-1493809842364-78817add7ffb"),
    alt: "Skyline silhouette at sunset",
  },
  {
    src: u("photo-1541976670076-97cf35056154"),
    alt: "Sculptural staircase and atrium light",
  },
];

export const DISTRICT_ATTRACTIONS_INITIAL = 4;
export const DISTRICT_ATTRACTIONS_PAGE = 4;
