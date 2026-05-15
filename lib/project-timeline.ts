import type { CopyKey } from "@/lib/i18n";

export type TimelineStageId =
  | "land"
  | "foundation"
  | "structural"
  | "interior"
  | "handover";

export type TimelineStage = {
  id: TimelineStageId;
  labelKey: CopyKey;
  descriptionKey: CopyKey;
};

export const PROJECT_TIMELINE_STAGES: TimelineStage[] = [
  {
    id: "land",
    labelKey: "timelineStageLand",
    descriptionKey: "timelineStageLandDesc",
  },
  {
    id: "foundation",
    labelKey: "timelineStageFoundation",
    descriptionKey: "timelineStageFoundationDesc",
  },
  {
    id: "structural",
    labelKey: "timelineStageStructural",
    descriptionKey: "timelineStageStructuralDesc",
  },
  {
    id: "interior",
    labelKey: "timelineStageInterior",
    descriptionKey: "timelineStageInteriorDesc",
  },
  {
    id: "handover",
    labelKey: "timelineStageHandover",
    descriptionKey: "timelineStageHandoverDesc",
  },
];

/** Current construction phase — update when the project advances. */
export const CURRENT_TIMELINE_STAGE_ID: TimelineStageId = "foundation";
