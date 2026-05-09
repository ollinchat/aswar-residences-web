import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Location | ASWAR 01",
  description: "ASWAR 01 in Business Bay, Dubai — connectivity, views, and context.",
};

export default function LocationPage() {
  return (
    <>
      <SiteNavbar variant="solid" />
      <main className="bg-paper px-6 pb-32 pt-32 text-ink md:px-12 md:pt-40">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink/45">
          Location
        </p>
        <h1 className="mt-6 max-w-3xl font-serif text-4xl font-medium tracking-tight md:text-6xl">
          Business Bay, at the centre of the new Dubai
        </h1>
        <p className="mt-8 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-wider text-ink/50">
          Replace this copy with approved district storytelling, commute times,
          and landmark distances once finalised.
        </p>
        <div className="mt-14 overflow-hidden rounded-sm border border-ink/10">
          <iframe
            title="Business Bay, Dubai"
            src="https://maps.google.com/maps?q=Business+Bay+Dubai&hl=en&z=14&output=embed"
            className="aspect-video h-[320px] w-full border-0 grayscale md:h-[400px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <Link
          href="/"
          className="mt-14 inline-flex font-mono text-[10px] uppercase tracking-[0.25em] text-champagne hover:text-ink"
        >
          ← Back to home
        </Link>
      </main>
    </>
  );
}
