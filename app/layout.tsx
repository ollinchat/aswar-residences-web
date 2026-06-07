import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Geist_Mono,
  Inter,
  Playfair_Display,
  Tajawal,
  Urbanist,
} from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { resolveSiteUrl } from "@/lib/site-url";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const tajawal = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ASWAR 01 | Ultra-Luxury Residences Dubai",
  description:
    "ASWAR luxury residences in Ras Al Khor, near Meydan — 1BR and 2BR homes with Dubai skyline views, curated amenities, and architectural excellence.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    url: siteUrl,
    title: "ASWAR 01 | International Development",
    description:
      "Invest in Dubai's future. Discover visionary living spaces.",
    images: ["/aswar-hero-preview.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASWAR 01 | International Development",
    description:
      "Invest in Dubai's future. Discover visionary living spaces.",
    images: ["/aswar-hero-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} ${cormorant.variable} ${tajawal.variable} ${playfair.variable} ${urbanist.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=localStorage.getItem("aswar-lang");if(l==="ar"){var r=document.documentElement;r.lang="ar";r.dir="rtl";r.classList.add("lang-ar");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="relative flex min-h-full flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
