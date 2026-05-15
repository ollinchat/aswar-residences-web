/**
 * ASWAR site — Ras Al Khor Industrial Area, adjacent to Meydan Horizon (E44 corridor).
 * Coordinates align with the Meydan / Ras Al Khor fringe used in sales materials.
 */
export const ASWAR_SITE = {
  /** [latitude, longitude] for Leaflet & embeds */
  center: [25.1689, 55.3286] as [number, number],
  lat: 25.1689,
  lng: 55.3286,
  mapZoom: 14,
  label: "Ras Al Khor Industrial Area, Dubai",
  addressLine: "Ras Al Khor Industrial Area · Near Meydan Horizon",
  mapsQuery: "Ras+Al+Khor+Industrial+Area+1+Dubai",
  googleEmbedQuery: "Ras+Al+Khor+Industrial+Area+Dubai+Meydan",
} as const;
