import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/site-navbar";
import { ASWAR_SITE } from "@/lib/site-location";

export const metadata: Metadata = {
  title: "Location | ASWAR",
  description:
    "ASWAR in Ras Al Khor Industrial Area, near Meydan Horizon — E44 access and Dubai skyline views.",
};

export default function LocationPage() {
  const { lat, lng, label, addressLine, googleEmbedQuery } = ASWAR_SITE;
  const embedSrc = `https://maps.google.com/maps?q=${googleEmbedQuery}&ll=${lat},${lng}&z=14&output=embed`;

  return (
    <>
      <SiteNavbar variant="solid" />
      <main className="bg-parchment px-6 pb-32 pt-32 text-charcoal md:px-12 md:pt-40">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-charcoal/45">
          Location
        </p>
        <h1 className="mt-6 max-w-3xl font-serif text-4xl font-extralight tracking-[0.12em] md:text-6xl">
          {label}
        </h1>
        <p className="mt-8 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-wider text-charcoal/50">
          {addressLine}. A 2,365.95 sqm corner plot on the Meydan horizon with
          views toward the Dubai skyline and direct connectivity via Emirates
          Road (E44).
        </p>
        <div className="mt-14 overflow-hidden rounded-none border border-charcoal/10">
          <iframe
            title={label}
            src={embedSrc}
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
