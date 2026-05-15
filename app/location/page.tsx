import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Location | ASWAR",
  description:
    "ASWAR in Ras Al Khor, near Meydan — corner positioning with Dubai skyline views and E44 connectivity.",
};

export default function LocationPage() {
  return (
    <>
      <SiteNavbar variant="solid" />
      <main className="bg-parchment px-6 pb-32 pt-32 text-charcoal md:px-12 md:pt-40">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-charcoal/45">
          Location
        </p>
        <h1 className="mt-6 max-w-3xl font-serif text-4xl font-medium tracking-tight md:text-6xl">
          Ras Al Khor, on the Meydan horizon
        </h1>
        <p className="mt-8 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-wider text-charcoal/50">
          A 2,365.95 sqm corner plot with views toward the Dubai skyline, connected
          via Emirates Road (E44) for access across the emirate.
        </p>
        <div className="mt-14 overflow-hidden rounded-none border border-charcoal/10">
          <iframe
            title="Ras Al Khor, Dubai"
            src="https://maps.google.com/maps?q=Ras+Al+Khor+Dubai&hl=en&z=13&output=embed"
            className="aspect-video h-[320px] w-full border-0 grayscale md:h-[400px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <Link
          href="/"
          className="mt-14 inline-flex font-mono text-[10px] uppercase tracking-[0.25em] text-champagne hover:text-charcoal"
        >
          ← Back to home
        </Link>
      </main>
    </>
  );
}
