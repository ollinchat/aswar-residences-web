"use client";

import type { ReactNode } from "react";

/** Stylised 2D engineering schematics — replace with CAD exports when available. */
export function EngineeringFloorPlan({ unitId }: { unitId: string }) {
  const stroke = "currentColor";
  const dim = "text-charcoal/45";

  const plans: Record<string, ReactNode> = {
    studio: (
      <svg viewBox="0 0 420 300" className="h-auto w-full text-charcoal" aria-hidden>
        <rect x="24" y="24" width="372" height="252" fill="none" stroke={stroke} strokeWidth="1.2" />
        <rect x="48" y="48" width="200" height="140" fill="none" stroke={stroke} strokeWidth="0.8" strokeDasharray="4 3" />
        <rect x="268" y="60" width="104" height="192" fill="none" stroke={stroke} strokeWidth="0.8" />
        <line x1="48" y1="120" x2="248" y2="120" stroke={stroke} strokeWidth="0.5" strokeDasharray="2 2" />
        <text x="210" y="290" textAnchor="middle" className={dim} fontSize="10" fontFamily="var(--font-geist-mono), monospace" letterSpacing="0.2em">
          STUDIO · TYPICAL CORE
        </text>
      </svg>
    ),
    "1br": (
      <svg viewBox="0 0 420 300" className="h-auto w-full text-charcoal" aria-hidden>
        <rect x="24" y="24" width="372" height="252" fill="none" stroke={stroke} strokeWidth="1.2" />
        <rect x="48" y="48" width="160" height="200" fill="none" stroke={stroke} strokeWidth="0.8" strokeDasharray="4 3" />
        <rect x="228" y="48" width="144" height="120" fill="none" stroke={stroke} strokeWidth="0.8" />
        <rect x="228" y="184" width="144" height="68" fill="none" stroke={stroke} strokeWidth="0.8" />
        <text x="210" y="290" textAnchor="middle" className={dim} fontSize="10" fontFamily="var(--font-geist-mono), monospace" letterSpacing="0.2em">
          1 BED · PARTITIONED SUITE
        </text>
      </svg>
    ),
    "2br": (
      <svg viewBox="0 0 420 300" className="h-auto w-full text-charcoal" aria-hidden>
        <rect x="24" y="24" width="372" height="252" fill="none" stroke={stroke} strokeWidth="1.2" />
        <rect x="48" y="48" width="140" height="200" fill="none" stroke={stroke} strokeWidth="0.8" />
        <rect x="204" y="48" width="168" height="92" fill="none" stroke={stroke} strokeWidth="0.8" strokeDasharray="4 3" />
        <rect x="204" y="156" width="168" height="92" fill="none" stroke={stroke} strokeWidth="0.8" strokeDasharray="4 3" />
        <text x="210" y="290" textAnchor="middle" className={dim} fontSize="10" fontFamily="var(--font-geist-mono), monospace" letterSpacing="0.2em">
          2 BED · DUAL ASPECT
        </text>
      </svg>
    ),
    "3br": (
      <svg viewBox="0 0 420 300" className="h-auto w-full text-charcoal" aria-hidden>
        <rect x="24" y="24" width="372" height="252" fill="none" stroke={stroke} strokeWidth="1.2" />
        <rect x="48" y="48" width="324" height="88" fill="none" stroke={stroke} strokeWidth="0.8" />
        <rect x="48" y="152" width="100" height="100" fill="none" stroke={stroke} strokeWidth="0.8" strokeDasharray="4 3" />
        <rect x="164" y="152" width="100" height="100" fill="none" stroke={stroke} strokeWidth="0.8" strokeDasharray="4 3" />
        <rect x="280" y="152" width="92" height="100" fill="none" stroke={stroke} strokeWidth="0.8" />
        <text x="210" y="290" textAnchor="middle" className={dim} fontSize="10" fontFamily="var(--font-geist-mono), monospace" letterSpacing="0.2em">
          3 BED · FAMILY STACK
        </text>
      </svg>
    ),
    penthouse: (
      <svg viewBox="0 0 420 300" className="h-auto w-full text-charcoal" aria-hidden>
        <rect x="24" y="24" width="372" height="252" fill="none" stroke={stroke} strokeWidth="1.2" />
        <rect x="40" y="40" width="340" height="220" fill="none" stroke={stroke} strokeWidth="0.6" strokeDasharray="6 4" />
        <rect x="56" y="56" width="140" height="188" fill="none" stroke={stroke} strokeWidth="0.8" />
        <rect x="212" y="56" width="152" height="90" fill="none" stroke={stroke} strokeWidth="0.8" />
        <rect x="212" y="162" width="152" height="82" fill="none" stroke={stroke} strokeWidth="0.8" />
        <text x="210" y="290" textAnchor="middle" className={dim} fontSize="10" fontFamily="var(--font-geist-mono), monospace" letterSpacing="0.2em">
          PENTHOUSE · DUPLEX PLATE
        </text>
      </svg>
    ),
  };

  return (
    <div className="border border-charcoal/10 bg-parchment p-6 md:p-8">
      <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.35em] text-charcoal/40">
        Engineering schematic · Not for construction
      </p>
      {plans[unitId] ?? plans.studio}
    </div>
  );
}
