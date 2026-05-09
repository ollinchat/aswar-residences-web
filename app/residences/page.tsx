import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Residences | ASWAR 01",
  description:
    "Explore ultra-luxury residences at ASWAR 01 — Dubai’s most refined private address.",
};

export default function ResidencesPage() {
  return (
    <>
      <SiteNavbar variant="solid" />
      <main className="bg-parchment px-6 pb-32 pt-32 text-charcoal md:px-12 md:pt-40">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-charcoal/45">
          Residences
        </p>
        <h1 className="mt-6 max-w-3xl font-serif text-4xl font-medium tracking-tight md:text-6xl">
          A private collection of sky homes
        </h1>
        <p className="mt-8 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-wider text-charcoal/50">
          Floor plans, finishes, and availability will be published in line with
          RERA registration. This page reserves the narrative structure for
          your sales team.
        </p>
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
