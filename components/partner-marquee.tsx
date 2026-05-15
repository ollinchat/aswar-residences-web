"use client";

const PLACEHOLDERS = [
  "Sami Najami",
  "ASWAR Development",
  "Ras Al Khor",
  "Dubai Land",
  "Premium Partners",
  "Global Capital",
];

export function PartnerMarquee() {
  const doubled = [...PLACEHOLDERS, ...PLACEHOLDERS];

  return (
    <div className="relative overflow-hidden bg-white py-10 md:py-12">
      <div className="flex w-max animate-marquee gap-16 grayscale md:gap-24 will-change-transform">
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="whitespace-nowrap font-serif text-xl font-light tracking-[0.28em] text-charcoal/45 opacity-70 md:text-2xl"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
