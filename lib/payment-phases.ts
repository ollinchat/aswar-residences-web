import type { CopyKey } from "@/lib/i18n";

/** Illustrative construction-style payment split (EN/AR via `titleKey`). */
export type PaymentPhaseRow = { titleKey: CopyKey; pct: number };

export const PAYMENT_PHASES: readonly PaymentPhaseRow[] = [
  { titleKey: "paymentPhaseDown", pct: 25 },
  { titleKey: "paymentPhaseConstruction", pct: 35 },
  { titleKey: "paymentPhaseHandover", pct: 40 },
];
