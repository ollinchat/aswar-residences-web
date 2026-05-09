"use client";

import { useMemo, useState } from "react";
import type { CopyKey, Lang } from "@/lib/i18n";
import { monthlyMortgagePayment } from "@/lib/financing-math";

const MIN_INITIAL_DOWN = 550_000;
const TERM_YEARS = [3, 5, 7, 10] as const;
const MIN_LOAN_AFTER_DOWN = 50_000;

const labelClass =
  "font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-amber-800/55 rtl:font-arabic rtl:normal-case rtl:tracking-normal rtl:leading-[1.72]";

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

const inputClass =
  "rounded-lg border border-zinc-200/90 bg-zinc-50 px-3 py-2.5 font-sans text-sm tabular-nums text-zinc-900 outline-none transition-[background-color,border-color,box-shadow] placeholder:text-zinc-400 focus:border-amber-300/70 focus:bg-white focus:shadow-[0_0_0_1px_rgba(217,119,6,0.12)]";

export function PaymentCalculator({
  lang,
  t,
  initialPurchasePrice,
  currency = "AED",
}: PaymentCalculatorProps) {
  const [purchasePrice, setPurchasePrice] = useState(initialPurchasePrice);
  const [initialDown, setInitialDown] = useState(MIN_INITIAL_DOWN);
  const [termYears, setTermYears] = useState<(typeof TERM_YEARS)[number]>(5);
  const [annualRatePct, setAnnualRatePct] = useState(4);

  const maxInitialDown = useMemo(() => {
    const cap = Math.floor(purchasePrice - MIN_LOAN_AFTER_DOWN);
    return Math.max(MIN_INITIAL_DOWN, cap);
  }, [purchasePrice]);

  const effectiveInitialDown = useMemo(
    () =>
      Math.min(Math.max(initialDown, MIN_INITIAL_DOWN), maxInitialDown),
    [initialDown, maxInitialDown],
  );

  const loanPrincipal = Math.max(0, purchasePrice - effectiveInitialDown);

  const monthlyPayment = useMemo(
    () => monthlyMortgagePayment(loanPrincipal, annualRatePct, termYears),
    [loanPrincipal, annualRatePct, termYears],
  );

  const nMonths = Math.max(1, Math.round(termYears * 12));
  const totalRepayment = monthlyPayment * nMonths;
  const totalInterest = Math.max(0, totalRepayment - loanPrincipal);

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
      className="rounded-2xl bg-gradient-to-br from-amber-200/50 via-amber-100/40 to-amber-300/45 p-[0.5px] shadow-[0_20px_50px_rgba(180,160,120,0.15)] backdrop-blur-xl"
      role="presentation"
    >
      <div
        className="rounded-[calc(1rem-0.5px)] bg-white/95 px-6 py-6 backdrop-blur-xl md:px-8 md:py-8"
        role="region"
        aria-labelledby="payment-calc-heading"
      >
        <div className="border-b border-zinc-200/80 pb-5">
          <h2
            id="payment-calc-heading"
            className="font-serif text-xl font-light tracking-tight text-zinc-900 md:text-2xl rtl:font-arabic rtl:leading-[1.72]"
          >
            {t("paymentCalcTitle")}
          </h2>
          <p className="mt-2 max-w-lg font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.16em] text-zinc-600 rtl:font-arabic rtl:normal-case rtl:tracking-wide rtl:leading-[1.72]">
            {t("paymentCalcSubtitle")}
          </p>
        </div>

        <div className="mt-6 space-y-7">
          <label className="block space-y-2">
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

          <div className="space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-2 gap-y-1">
              <div className="min-w-0 space-y-1">
                <span className={`block ${labelClass}`}>
                  {t("paymentLblDownPayment")}
                </span>
                <p className="font-sans text-[10px] font-medium tabular-nums text-zinc-500 rtl:font-arabic rtl:leading-[1.72]">
                  {t("paymentCalcDownStartsAt")}{" "}
                  <span className="text-amber-800/70">{downStartingFormatted}</span>
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
                className={`w-36 text-end sm:w-44 rtl:text-start ${inputClass} py-1.5 text-xs`}
                aria-label={t("paymentLblDownPayment")}
              />
            </div>
            <div dir="ltr">
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
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-amber-600 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-amber-300/80 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(180,83,9,0.25)]"
              />
            </div>
            <p className="font-sans text-[9px] tabular-nums text-zinc-400">
              {formatMoney(sliderMin, lang, currency)} —{" "}
              {formatMoney(sliderMax, lang, currency)}
            </p>
          </div>

          <div className="space-y-2">
            <span className={`block ${labelClass}`}>
              {t("paymentLblLoanTerm")}
            </span>
            <div
              className="grid grid-cols-2 gap-2 sm:grid-cols-4"
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
                    className={`min-h-[40px] rounded-lg border px-2 py-2 font-sans text-[10px] font-medium tracking-[0.14em] transition-[color,box-shadow,border-color,background] sm:text-[11px] ${
                      active
                        ? "border-amber-300/70 bg-white text-zinc-900 shadow-[0_0_20px_rgba(217,119,6,0.12)] ring-1 ring-amber-200/50"
                        : "border-zinc-200/90 bg-zinc-50/80 text-zinc-500 hover:border-amber-200/40 hover:text-zinc-700"
                    }`}
                  >
                    <span className="tabular-nums">{y}</span>{" "}
                    <span
                      className={`font-normal ${active ? "text-amber-900/55" : "text-zinc-400"} rtl:font-arabic rtl:leading-[1.72]`}
                    >
                      {t("paymentLblYears")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <label className="block space-y-2">
            <span className={labelClass}>{t("paymentLblInterestRate")}</span>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="number"
                min={0}
                max={20}
                step={0.05}
                value={annualRatePct}
                onChange={(e) =>
                  setAnnualRatePct(
                    Math.min(20, Math.max(0, Number(e.target.value) || 0)),
                  )
                }
                className={`w-full max-w-[140px] ${inputClass}`}
              />
              <span className="font-sans text-xs tabular-nums text-amber-800/60 rtl:font-arabic rtl:leading-[1.72]">
                % {t("paymentCalcRatePaHint")}
              </span>
            </div>
          </label>

          <div className="h-px bg-zinc-200/90" aria-hidden />

          <div>
            <p className="font-serif text-[11px] font-normal uppercase tracking-[0.2em] text-amber-900/50 rtl:font-arabic rtl:normal-case rtl:tracking-wide rtl:leading-[1.72]">
              {t("paymentCalcFinancingSummary")}
            </p>
            <dl className="mt-4 space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-zinc-200/80 pb-3">
                <dt className={labelClass}>{t("paymentLblLoanPrincipal")}</dt>
                <dd className="font-sans text-lg font-semibold tabular-nums text-zinc-900">
                  {formatMoney(Math.round(loanPrincipal), lang, currency)}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-zinc-200/80 pb-3">
                <dt className={labelClass}>
                  {t("paymentLblMonthlyInstallment")}
                </dt>
                <dd className="font-sans text-2xl font-semibold tabular-nums tracking-tight text-zinc-900">
                  {formatMoney(Math.round(monthlyPayment), lang, currency)}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-zinc-200/80 pb-3">
                <dt className={labelClass}>{t("paymentLblTotalInterest")}</dt>
                <dd className="font-sans text-base font-semibold tabular-nums text-zinc-900">
                  {formatMoney(Math.round(totalInterest), lang, currency)}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <dt className={labelClass}>{t("paymentLblTotalRepayment")}</dt>
                <dd className="font-sans text-lg font-semibold tabular-nums text-zinc-900">
                  {formatMoney(Math.round(totalRepayment), lang, currency)}
                </dd>
              </div>
            </dl>
          </div>

          <p className="font-sans text-[10px] font-normal leading-relaxed text-zinc-500 rtl:font-arabic rtl:leading-[1.72]">
            {t("paymentCalcAmortNote")}
          </p>
        </div>
      </div>
    </div>
  );
}
