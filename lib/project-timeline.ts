import type { CopyKey } from "@/lib/i18n";
import { sqmToSqft } from "@/lib/area-format";

export type TimelineStageId =
  | "land"
  | "groundbreaking"
  | "foundation"
  | "structural"
  | "handover";

export type TimelineStageStatus = "completed" | "current" | "upcoming";

export type TimelineFinancials = {
  avgPricePerSqFt: string;
  entryPrice: string;
  estimatedValue: string;
  growthPercentage: string;
};

export type TimelineStage = {
  id: TimelineStageId;
  labelKey: CopyKey;
  descriptionKey: CopyKey;
  dateKey: CopyKey;
  /** Transparent building render — drop PNG at this path (SVG placeholders ship until then). */
  imageSrc: string;
  /** Tailwind gradient utilities for the render stage backdrop. */
  bgGradient: string;
  financials: TimelineFinancials;
};

/** 1BR launch pricing from `lib/residence-models.ts` — indicative ROI reference unit. */
const ENTRY_AED = 1_650_000;
const HANDOVER_AED = 2_350_000;
const REF_SQFT = sqmToSqft((75 + 77) / 2);

function formatAedMillions(amount: number): string {
  const m = amount / 1_000_000;
  return m % 1 === 0 ? `AED ${m.toFixed(0)}M` : `AED ${m.toFixed(2)}M`;
}

function formatAedPerSqFt(amount: number): string {
  return `AED ${Math.round(amount / REF_SQFT).toLocaleString("en-US")}`;
}

function formatGrowth(from: number, to: number): string {
  if (to <= from) return "0%";
  return `+${(((to - from) / from) * 100).toFixed(1)}%`;
}

function financialsAt(estimatedValue: number): TimelineFinancials {
  return {
    entryPrice: formatAedMillions(ENTRY_AED),
    estimatedValue: formatAedMillions(estimatedValue),
    avgPricePerSqFt: formatAedPerSqFt(estimatedValue),
    growthPercentage: formatGrowth(ENTRY_AED, estimatedValue),
  };
}

/**
 * Indicative capital appreciation by phase (1BR reference, off-plan entry AED 1.65M).
 * Update `estimatedValue` per stage when sales releases new official price bands.
 *
 * Replace `.svg` with `.png` when studio transparent renders land in
 * `public/images/timeline/` (building-phase1.png … building-final.png).
 */
export const PROJECT_TIMELINE_STAGES: TimelineStage[] = [
  {
    id: "land",
    labelKey: "timelineStageLand",
    descriptionKey: "timelineStageLandDesc",
    dateKey: "timelineStageLandDate",
    imageSrc: "/images/timeline/building-phase1.svg",
    bgGradient: "from-[#111111] to-[#1c1a16]",
    financials: financialsAt(ENTRY_AED),
  },
  {
    id: "groundbreaking",
    labelKey: "timelineStageGroundbreaking",
    descriptionKey: "timelineStageGroundbreakingDesc",
    dateKey: "timelineStageGroundbreakingDate",
    imageSrc: "/images/timeline/building-phase2.svg",
    bgGradient: "from-[#161512] to-[#22201b]",
    financials: financialsAt(1_780_000),
  },
  {
    id: "foundation",
    labelKey: "timelineStageFoundation",
    descriptionKey: "timelineStageFoundationDesc",
    dateKey: "timelineStageFoundationDate",
    imageSrc: "/images/timeline/building-phase3.svg",
    bgGradient: "from-[#1a1815] to-[#282520]",
    financials: financialsAt(2_050_000),
  },
  {
    id: "structural",
    labelKey: "timelineStageStructural",
    descriptionKey: "timelineStageStructuralDesc",
    dateKey: "timelineStageStructuralDate",
    imageSrc: "/images/timeline/building-phase4.svg",
    bgGradient: "from-[#1c1a16] to-[#2d2922]",
    financials: financialsAt(2_200_000),
  },
  {
    id: "handover",
    labelKey: "timelineStageHandover",
    descriptionKey: "timelineStageHandoverDesc",
    dateKey: "timelineStageHandoverDate",
    imageSrc: "/images/timeline/building-final.svg",
    bgGradient: "from-[#0f0e0d] to-[#1a1815]",
    financials: financialsAt(HANDOVER_AED),
  },
];

/** Current construction phase — update when the project advances. */
export const CURRENT_TIMELINE_STAGE_ID: TimelineStageId = "foundation";

export function timelineStageIndex(id: TimelineStageId): number {
  return PROJECT_TIMELINE_STAGES.findIndex((s) => s.id === id);
}

export function timelineStageStatus(
  stageIndex: number,
  currentIndex: number,
): TimelineStageStatus {
  if (stageIndex < currentIndex) return "completed";
  if (stageIndex === currentIndex) return "current";
  return "upcoming";
}
