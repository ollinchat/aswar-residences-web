const GOLD = "#9A8550";

export function AswarMonogramWatermark({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className ?? ""}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 100 118"
        className="h-[min(72vw,520px)] w-[min(58vw,420px)] opacity-[0.03]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={GOLD}
          d="M50 5 L91 113 H71 L64 88 H36 L29 113 H9 Z M50 34 L43 70 H57 Z"
        />
      </svg>
    </div>
  );
}
