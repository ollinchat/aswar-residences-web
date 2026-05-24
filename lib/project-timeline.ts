import type { CopyKey } from "@/lib/i18n";

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

/**
 * Replace `.svg` with `.png` when studio transparent renders are ready:
 * building-phase1.png … building-final.png in public/images/timeline/
 */
export const PROJECT_TIMELINE_STAGES: TimelineStage[] = [
  {
    id: "land",
    labelKey: "timelineStageLand",
    descriptionKey: "timelineStageLandDesc",
    dateKey: "timelineStageLandDate",
    imageSrc: "/images/timeline/building-phase1.svg",
    bgGradient: "from-[#111111] to-[#1c1a16]",
    financials: {
      avgPricePerSqFt: "AED 1,650",
      entryPrice: "AED 1.9M",
      estimatedValue: "AED 1.9M",
      growthPercentage: "0%",
    },
  },
  {
    id: "groundbreaking",
    labelKey: "timelineStageGroundbreaking",
    descriptionKey: "timelineStageGroundbreakingDesc",
    dateKey: "timelineStageGroundbreakingDate",
    imageSrc: "/images/timeline/building-phase2.svg",
    bgGradient: "from-[#161512] to-[#22201b]",
    financials: {
      avgPricePerSqFt: "AED 1,800",
      entryPrice: "AED 1.9M",
      estimatedValue: "AED 2.1M",
      growthPercentage: "+10.5%",
    },
  },
  {
    id: "foundation",
    labelKey: "timelineStageFoundation",
    descriptionKey: "timelineStageFoundationDesc",
    dateKey: "timelineStageFoundationDate",
    imageSrc: "/images/timeline/building-phase3.svg",
    bgGradient: "from-[#1a1815] to-[#282520]",
    financials: {
      avgPricePerSqFt: "AED 2,050",
      entryPrice: "AED 1.9M",
      estimatedValue: "AED 2.4M",
      growthPercentage: "+26.3%",
    },
  },
  {
    id: "structural",
    labelKey: "timelineStageStructural",
    descriptionKey: "timelineStageStructuralDesc",
    dateKey: "timelineStageStructuralDate",
    imageSrc: "/images/timeline/building-phase4.svg",
    bgGradient: "from-[#1c1a16] to-[#2d2922]",
    financials: {
      avgPricePerSqFt: "AED 2,400",
      entryPrice: "AED 1.9M",
      estimatedValue: "AED 2.8M",
      growthPercentage: "+47.3%",
    },
  },
  {
    id: "handover",
    labelKey: "timelineStageHandover",
    descriptionKey: "timelineStageHandoverDesc",
    dateKey: "timelineStageHandoverDate",
    imageSrc: "/images/timeline/building-final.svg",
    bgGradient: "from-[#0f0e0d] to-[#1a1815]",
    financials: {
      avgPricePerSqFt: "AED 2,850",
      entryPrice: "AED 1.9M",
      estimatedValue: "AED 3.3M",
      growthPercentage: "+73.6%",
    },
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
