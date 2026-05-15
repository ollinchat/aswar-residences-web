import type { Lang } from "@/lib/i18n";

export type AreaMetric = "sqft" | "sqm";

const SQFT_TO_SQM = 0.09290304;
const SQM_TO_SQFT = 1 / SQFT_TO_SQM;

export function sqftToSqm(sqft: number): number {
  return Math.round(sqft * SQFT_TO_SQM * 10) / 10;
}

/** Inverse of `sqftToSqm` for validation / tooling (source data remains sqft). */
export function sqmToSqft(sqm: number): number {
  return Math.round(sqm * SQM_TO_SQFT * 10) / 10;
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

export function formatAreaRangeSqm(
  minSqm: number,
  maxSqm: number,
  lang: Lang,
): string {
  const loc = lang === "ar" ? "ar-AE" : "en-US";
  const min = minSqm.toLocaleString(loc);
  const max = maxSqm.toLocaleString(loc);
  return `${min}–${max} SQ.M`;
}

export function formatAreaRangeFromSqm(
  minSqm: number,
  maxSqm: number,
  metric: AreaMetric,
  lang: Lang,
): string {
  if (metric === "sqm") {
    return formatAreaRangeSqm(minSqm, maxSqm, lang);
  }
  const minFt = sqmToSqft(minSqm);
  const maxFt = sqmToSqft(maxSqm);
  const loc = lang === "ar" ? "ar-AE" : "en-US";
  return `${minFt.toLocaleString(loc)}–${maxFt.toLocaleString(loc)} SQ.FT`;
}
