import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeritageProjectGallery } from "@/components/heritage-project-gallery";
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
      <main className="bg-parchment px-6 pb-32 pt-32 text-charcoal md:px-12 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-charcoal/45">
            Heritage
          </p>
          <div className="mt-8 max-w-md rounded-lg border border-charcoal/[0.08] bg-white px-5 py-4 md:mt-10 md:max-w-lg md:px-6 md:py-5">
            <Image
              src="/partners/sami-najami-logo.png"
              alt="Sami Najami Engineering & Projects L.T.D"
              width={560}
              height={160}
              className="h-auto w-full object-contain object-start"
              sizes="(max-width: 768px) 100vw, 32rem"
              priority
            />
          </div>
          <h1 className="mt-8 max-w-3xl font-serif text-4xl font-medium tracking-tight md:mt-10 md:text-6xl">
            Sami Najami
          </h1>
          <p className="mt-4 max-w-xl font-mono text-[11px] uppercase tracking-widest text-charcoal/45">
            Engineering · Contracting · Parent organisation
          </p>

          <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
            <HeritageProjectGallery variant="slider" />

            <div className="max-w-2xl space-y-8 font-serif text-lg leading-relaxed text-charcoal/85 md:text-xl md:leading-relaxed">
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
              className="inline-flex font-mono text-[10px] uppercase tracking-[0.25em] text-champagne hover:text-charcoal"
            >
              sami-najami.com ↗
            </a>
          </div>

          <div className="mt-20">
            <Link
              href="/"
              className="inline-flex font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/50 hover:text-charcoal"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
