import type { Lang } from "@/lib/i18n";

export type AreaMetric = "sqft" | "sqm";

const SQFT_TO_SQM = 0.09290304;

export function sqftToSqm(sqft: number): number {
  return Math.round(sqft * SQFT_TO_SQM * 10) / 10;
}

export function formatAreaValue(
  sqft: number,
  metric: AreaMetric,
  lang: Lang,
): string {
  const loc = lang === "ar" ? "ar-AE" : "en-US";
  if (metric === "sqft") {
    return `${sqft.toLocaleString(loc)} SQ.FT`;
  }
  const m2 = sqftToSqm(sqft);
  const s =
    Math.abs(m2 - Math.round(m2)) < 0.05
      ? String(Math.round(m2))
      : m2.toFixed(1).replace(/\.0$/, "");
  return `${Number(s).toLocaleString(loc)} SQ.M`;
}
