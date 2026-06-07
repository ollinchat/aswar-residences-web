/** Canonical public URL for ASWAR Residences (live marketing site). */
export const ASWAR_RESIDENCES_SITE_URL =
  "https://aswar-residences-web.vercel.app/";

export function resolveSiteUrl(envUrl?: string): string {
  const trimmed = envUrl?.replace(/\/$/, "");
  return trimmed || ASWAR_RESIDENCES_SITE_URL.replace(/\/$/, "");
}
