"use client";

import { useState, useMemo, useEffect } from "react";
import type { CopyKey, Lang } from "@/lib/i18n";

const MIN_INITIAL_DOWN = 550_000;
const TERM_YEARS = [3, 5, 7, 10] as const;
const MIN_LOAN_AFTER_DOWN = 50_000;

const labelClass =
  "font-sans text-[8px] font-medium uppercase tracking-[0.2em] text-zinc-500 rtl:font-arabic rtl:normal-case rtl:tracking-normal rtl:leading-[1.72]";

type PaymentCalculatorProps = {
  lang: Lang;
  t: (key: CopyKey) => string;
  initialPurchasePrice: number;
  currency?: string;
};

function formatMoney(n: number, lang: Lang, currency: string) {
  const locale =
    lang === "ar"
      ? currency === "AED"
        ? "ar-AE"
        : "ar-SA"
      : currency === "AED"
        ? "en-AE"
        : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

/** `text-base` (16px) avoids iOS focus zoom; `min-h-[48px]` for touch targets. */
const inputClass =
  "min-h-[48px] rounded-lg border border-zinc-200/90 bg-zinc-50 px-3 py-2.5 font-sans text-base tabular-nums text-zinc-900 outline-none transition-[background-color,border-color,box-shadow] placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:ring-1 focus:ring-zinc-900/10";

export function PaymentCalculator({
  lang,
  t,
  initialPurchasePrice,
  currency = "AED",
}: PaymentCalculatorProps) {
  const [purchasePrice, setPurchasePrice] = useState(initialPurchasePrice);
  const [initialDown, setInitialDown] = useState(MIN_INITIAL_DOWN);
  const [termYears, setTermYears] = useState<(typeof TERM_YEARS)[number]>(5);

  /** Parent passes `key={initialPurchasePrice}` so state resets when the default price changes. */
  useEffect(() => {
    void initialPurchasePrice;
  }, [initialPurchasePrice]);

  const maxInitialDown = useMemo(() => {
    const cap = Math.floor(purchasePrice - MIN_LOAN_AFTER_DOWN);
    return Math.max(MIN_INITIAL_DOWN, cap);
  }, [purchasePrice]);

  const effectiveInitialDown = useMemo(
    () =>
      Math.min(Math.max(initialDown, MIN_INITIAL_DOWN), maxInitialDown),
    [initialDown, maxInitialDown],
  );

  const remainingBalance = Math.max(0, purchasePrice - effectiveInitialDown);
  const nMonths = Math.max(1, Math.round(termYears * 12));
  const monthlyPayment =
    nMonths > 0 ? remainingBalance / nMonths : 0;

  const sliderMax = maxInitialDown;
  const sliderMin = MIN_INITIAL_DOWN;

  const handlePurchaseChange = (raw: number) => {
    const p = Math.max(MIN_INITIAL_DOWN + MIN_LOAN_AFTER_DOWN, raw);
    setPurchasePrice(p);
    const cap = Math.floor(p - MIN_LOAN_AFTER_DOWN);
    const mx = Math.max(MIN_INITIAL_DOWN, cap);
    setInitialDown((d) => Math.min(d, mx));
  };

  const downStartingFormatted = formatMoney(MIN_INITIAL_DOWN, lang, currency);

  return (
    <div
      className="w-full max-w-full overflow-hidden rounded-2xl bg-gradient-to-br from-amber-200/50 via-amber-100/40 to-amber-300/45 p-[0.5px] shadow-[0_20px_50px_rgba(180,160,120,0.15)] backdrop-blur-xl"
      role="presentation"
    >
      <div
        className="rounded-[calc(1rem-0.5px)] bg-white/95 px-3 py-5 backdrop-blur-xl sm:px-4 md:px-5 md:py-6"
        role="region"
        aria-labelledby="payment-calc-heading"
      >
        <div className="border-b border-zinc-200/80 pb-4">
          <h2
            id="payment-calc-heading"
            className="font-serif text-lg font-light tracking-tight text-zinc-900 md:text-xl rtl:font-arabic rtl:leading-[1.72]"
          >
            {t("paymentCalcTitle")}
          </h2>
          <p className="mt-1.5 max-w-md font-sans text-[10px] font-medium uppercase leading-relaxed tracking-[0.14em] text-zinc-500 rtl:font-arabic rtl:normal-case rtl:tracking-wide rtl:leading-[1.72]">
            {t("paymentCalcSubtitle")}
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-5">
          <label className="block space-y-1.5">
            <span className={labelClass}>{t("financingPurchasePrice")}</span>
            <input
              type="number"
              min={MIN_INITIAL_DOWN + MIN_LOAN_AFTER_DOWN}
              step={50_000}
              value={purchasePrice}
              onChange={(e) =>
                handlePurchaseChange(Number(e.target.value) || 0)
              }
              className={`w-full ${inputClass}`}
            />
          </label>

          <div className="space-y-2">
            <div className="flex flex-wrap items-start justify-between gap-2 gap-y-1">
              <div className="min-w-0 space-y-0.5">
                <span className={`block ${labelClass}`}>
                  {t("paymentLblDownPayment")}
                </span>
                <p className="font-sans text-[9px] font-medium tabular-nums text-zinc-500 rtl:font-arabic rtl:leading-[1.72]">
                  {t("paymentCalcDownStartsAt")}{" "}
                  <span className="text-zinc-900">{downStartingFormatted}</span>
                </p>
              </div>
              <input
                type="number"
                min={sliderMin}
                max={sliderMax}
                step={10_000}
                value={effectiveInitialDown}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (Number.isNaN(v)) return;
                  setInitialDown(Math.min(Math.max(v, sliderMin), sliderMax));
                }}
                className={`w-full max-w-[11rem] text-end sm:w-40 rtl:text-start ${inputClass}`}
                aria-label={t("paymentLblDownPayment")}
              />
            </div>
            <div
              className="flex min-h-[48px] items-center py-1"
              dir="ltr"
            >
              <input
                type="range"
                min={sliderMin}
                max={sliderMax}
                step={10_000}
                value={effectiveInitialDown}
                onChange={(e) => setInitialDown(Number(e.target.value))}
                aria-valuemin={sliderMin}
                aria-valuemax={sliderMax}
                aria-valuenow={effectiveInitialDown}
                aria-label={t("paymentLblDownPayment")}
                className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-700 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-zinc-500 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
              />
            </div>
            <p className="font-sans text-[8px] tabular-nums text-zinc-400">
              {formatMoney(sliderMin, lang, currency)} —{" "}
              {formatMoney(sliderMax, lang, currency)}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className={`block ${labelClass}`}>
              {t("paymentLblLoanTerm")}
            </span>
            <div
              className="grid grid-cols-1 gap-2 md:grid-cols-4"
              role="group"
              aria-label={t("paymentLblLoanTerm")}
            >
              {TERM_YEARS.map((y) => {
                const active = termYears === y;
                return (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setTermYears(y)}
                    className={`min-h-[44px] rounded-lg border px-3 py-2.5 font-sans text-[10px] font-medium tracking-[0.12em] transition-[color,box-shadow,border-color,background] sm:text-[11px] ${
                      active
                        ? "border-zinc-400/80 bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/90"
                        : "border-zinc-200/90 bg-zinc-50 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700"
                    }`}
                  >
                    <span className="tabular-nums">{y}</span>{" "}
                    <span className="font-normal text-zinc-500 rtl:font-arabic rtl:leading-[1.72]">
                      {t("paymentLblYears")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-zinc-200/90" aria-hidden />

          <div>
            <p className="font-sans text-[8px] font-medium uppercase tracking-[0.2em] text-zinc-500 rtl:font-arabic rtl:normal-case rtl:tracking-normal rtl:leading-[1.72]">
              {t("paymentCalcFinancingSummary")}
            </p>
            <dl className="mt-3 space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-zinc-200/80 pb-2.5">
                <dt className={labelClass}>{t("paymentLblRemainingBalance")}</dt>
                <dd className="font-sans text-base font-semibold tabular-nums text-zinc-900">
                  {formatMoney(Math.round(remainingBalance), lang, currency)}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <dt className={labelClass}>
                  {t("paymentLblMonthlyInstallment")}
                </dt>
                <dd className="font-sans text-xl font-semibold tabular-nums tracking-tight text-zinc-900">
                  {formatMoney(Math.round(monthlyPayment), lang, currency)}
                </dd>
              </div>
            </dl>
          </div>

          <p className="border-t border-zinc-200/80 pt-3 font-sans text-[9px] font-normal leading-relaxed text-zinc-500 rtl:font-arabic rtl:leading-[1.72]">
            {t("paymentCalcFinalPriceDisclaimer")}
          </p>
        </div>
      </div>
    </div>
  );
}
