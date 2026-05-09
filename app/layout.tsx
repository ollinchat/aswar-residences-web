import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://aswar.ae";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ASWAR 01 | Ultra-Luxury Residences Dubai",
  description:
    "Experience a new standard of architectural excellence. ASWAR 01 offers premium 1-5 bedroom residences and penthouses in the heart of Dubai.",
  openGraph: {
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
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
