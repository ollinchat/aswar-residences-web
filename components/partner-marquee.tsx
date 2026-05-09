"use client";

const PLACEHOLDERS = [
  "Sami Najami",
  "ASWAR Development",
  "Business Bay",
  "Dubai Land",
  "Premium Partners",
  "Global Capital",
];

export function PartnerMarquee() {
  const doubled = [...PLACEHOLDERS, ...PLACEHOLDERS];

  return (
    <div className="relative overflow-hidden border-t border-ink/10 bg-paper py-10">
      <div className="flex w-max animate-marquee gap-16 md:gap-24 will-change-transform">
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="whitespace-nowrap font-serif text-xl font-light tracking-[0.2em] text-ink/35 md:text-2xl"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
