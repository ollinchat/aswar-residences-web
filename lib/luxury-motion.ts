/** Shared “expensive” motion curve for editorial reveals. */
export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export const LUXURY_DURATION = 1.2;

export const LUXURY_STAGGER = 0.18;

export const luxuryItemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE },
  },
} as const;

export const luxuryContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: LUXURY_STAGGER,
      delayChildren: 0.12,
    },
  },
} as const;
