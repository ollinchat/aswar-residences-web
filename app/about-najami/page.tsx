import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "About Sami Najami | ASWAR 01",
  description:
    "Sami Najami — engineering and contracting excellence behind ASWAR 01.",
};

export default function AboutNajamiPage() {
  return (
    <>
      <SiteNavbar variant="solid" />
      <main className="bg-paper px-6 pb-32 pt-32 text-ink md:px-12 md:pt-40">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink/45">
          Heritage
        </p>
        <h1 className="mt-6 max-w-3xl font-serif text-4xl font-medium tracking-tight md:text-6xl">
          Sami Najami
        </h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-ink/45">
          Engineering · Contracting · Parent organisation
        </p>
        <div className="mt-12 max-w-md rounded-sm border border-ink/10 bg-paper p-8">
          <Image
            src="/partners/sami-najami-logo.svg"
            alt="Sami Najami"
            width={280}
            height={48}
            className="h-auto w-full"
          />
        </div>
        <div className="mt-12 max-w-2xl space-y-6 font-serif text-lg leading-relaxed text-ink/85">
          <p>
            Sami Najami provides the engineering rigour and delivery certainty
            that allow ASWAR International Development to present residences
            with quiet confidence — structure, façade, and programme unified
            under one contracting philosophy.
          </p>
          <p>
            For corporate history, active projects, and group credentials,
            visit the official portal.
          </p>
        </div>
        <a
          href="https://www.sami-najami.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex font-mono text-[10px] uppercase tracking-[0.25em] text-champagne hover:text-ink"
        >
          sami-najami.com ↗
        </a>
        <div className="mt-14">
          <Link
            href="/"
            className="inline-flex font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50 hover:text-ink"
          >
            ← Back to home
          </Link>
        </div>
      </main>
    </>
  );
}
