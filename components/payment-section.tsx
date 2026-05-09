"use client";

import { useState } from "react";
import { useLang } from "@/components/language-provider";
import type { CopyKey } from "@/lib/i18n";
import { PaymentCalculator } from "@/components/payment-calculator";

const CASH_TIERS = [20, 40, 50] as const;
type CashTier = (typeof CASH_TIERS)[number];

function cashBenefitKey(pct: CashTier): CopyKey {
  if (pct === 20) return "paymentCashBenefit20";
  if (pct === 40) return "paymentCashBenefit40";
  return "paymentCashBenefit50";
}

type PaymentSectionProps = {
  initialPurchasePrice: number;
  currency?: string;
};

export function PaymentSection({
  initialPurchasePrice,
  currency = "AED",
}: PaymentSectionProps) {
  const { lang, t } = useLang();
  const [tab, setTab] = useState<"cash" | "installments">("cash");
  const [cashTier, setCashTier] = useState<CashTier>(20);

  const tabBarClass =
    "flex w-full max-w-md gap-1 rounded-full border border-zinc-200/80 bg-zinc-100/60 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl sm:max-w-lg";

  const tabBtn = (active: boolean) =>
    `relative min-h-[44px] flex-1 rounded-full px-4 py-2.5 font-sans text-[10px] font-medium tracking-[0.1em] transition-[color,box-shadow,background,border-color] duration-300 sm:text-[11px] rtl:font-arabic rtl:leading-[1.72] ${
      active
        ? "border border-zinc-300/90 bg-white text-zinc-900 shadow-[0_6px_20px_rgba(0,0,0,0.06)] ring-1 ring-zinc-200/80"
        : "border border-transparent bg-transparent text-zinc-400 hover:text-zinc-600"
    }`;

  return (
    <div className="mx-auto mt-12 max-w-5xl md:mt-14">
      <div className="flex justify-center px-1">
        <div className={tabBarClass} role="tablist" aria-label={t("paymentTitle")}>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "cash"}
          id="payment-tab-cash"
          aria-controls="payment-panel-cash"
          onClick={() => setTab("cash")}
          className={tabBtn(tab === "cash")}
        >
          {t("paymentTabCash")}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "installments"}
          id="payment-tab-installments"
          aria-controls="payment-panel-installments"
          onClick={() => setTab("installments")}
          className={tabBtn(tab === "installments")}
        >
          {t("paymentTabInstallments")}
        </button>
        </div>
      </div>

      {tab === "cash" ? (
        <div
          id="payment-panel-cash"
          role="tabpanel"
          aria-labelledby="payment-tab-cash"
          className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5"
        >
          <p className="md:col-span-3 text-center font-sans text-[11px] font-medium leading-relaxed tracking-[0.08em] text-charcoal/42 uppercase rtl:normal-case rtl:font-arabic rtl:leading-[1.72]">
            {t("paymentCashIntro")}
          </p>
          {CASH_TIERS.map((pct) => {
            const active = cashTier === pct;
            return (
              <button
                key={pct}
                type="button"
                onClick={() => setCashTier(pct)}
                className={`group flex flex-col items-center rounded-2xl border px-5 py-8 text-center transition-[box-shadow,background,border-color] duration-300 md:py-10 ${
                  active
                    ? "border-zinc-300/90 bg-white/95 shadow-[0_12px_32px_rgba(0,0,0,0.06)] ring-1 ring-zinc-200/80 backdrop-blur-xl"
                    : "border-zinc-200/80 bg-zinc-50/80 backdrop-blur-md hover:border-zinc-300/80 hover:bg-white/90"
                }`}
              >
                <span className="font-serif text-[clamp(2.5rem,6vw,3.25rem)] font-extralight tabular-nums leading-none tracking-[-0.03em] text-charcoal">
                  {pct}%
                </span>
                <span className="mt-6 block h-px w-12 bg-charcoal/12 transition-colors group-hover:bg-charcoal/20" />
                <p className="mt-6 max-w-[220px] font-sans text-[11px] font-medium leading-relaxed tracking-[0.06em] text-charcoal/52 uppercase rtl:normal-case rtl:font-arabic rtl:leading-[1.72]">
                  {t(cashBenefitKey(pct))}
                </p>
              </button>
            );
          })}
        </div>
      ) : (
        <div
          id="payment-panel-installments"
          role="tabpanel"
          aria-labelledby="payment-tab-installments"
          className="mx-auto mt-10 max-w-md"
        >
          <PaymentCalculator
            lang={lang}
            t={t}
            initialPurchasePrice={initialPurchasePrice}
            currency={currency}
          />
        </div>
      )}
    </div>
  );
}
