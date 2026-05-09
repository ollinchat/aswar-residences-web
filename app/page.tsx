"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Printer } from "lucide-react";

// קומפוננטה לניווט שקוף ומינימליסטי
const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-10 py-8 mix-blend-difference">
    <div className="text-xl font-light tracking-[0.4em] text-white">ASWAR</div>
    <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.2em] text-white/80">
      <a href="#" className="hover:text-aswar-gold transition-colors">
        The Tower
      </a>
      <a href="#" className="hover:text-aswar-gold transition-colors">
        Units
      </a>
      <a href="#" className="hover:text-aswar-gold transition-colors">
        Investment
      </a>
      <a
        href="#"
        className="border-b border-aswar-gold pb-1 text-aswar-gold"
      >
        Inquire
      </a>
    </div>
  </nav>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState("3BR");
  const units = ["1BR", "2BR", "3BR", "4BR", "5BR", "PENTHOUSE"];

  return (
    <main className="bg-white text-ink selection:bg-aswar-gold/20">
      <Navbar />

      {/* Hero Section - לבן, נקי עם דגש על ה-360 */}
      <section className="relative h-screen bg-mist p-4 md:p-6">
        <div className="relative w-full h-full bg-white border border-stone/20 rounded-sm overflow-hidden flex items-center justify-center">
          {/* רקע עם הדמיית בניין 360 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <div className="w-[40%] aspect-[1/2] border-[0.5px] border-aswar-gold/30 rounded-full flex items-center justify-center italic text-stone text-xs tracking-widest">
              [ 360° TOWER VIEWPORT ]
            </div>
          </div>

          <div className="relative z-10 text-center space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-9xl font-extralight tracking-tighter"
            >
              ASWAR{" "}
              <span className="text-aswar-gold font-normal block md:inline">
                01
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[10px] uppercase tracking-[0.5em] text-stone"
            >
              Luxury Living Redefined · Dubai, UAE
            </motion.p>
          </div>

          {/* CTA צף בתחתית ההירו */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
            <button
              type="button"
              className="px-8 py-3 bg-ink text-white text-[10px] uppercase tracking-widest rounded-sm hover:bg-aswar-gold transition-all"
            >
              Explore 360°
            </button>
          </div>
        </div>
      </section>

      {/* Property Tabs - זוויות חדות ומינימליזם */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-light tracking-tight">
              Available Units
            </h2>
            <p className="text-stone text-sm max-w-sm font-light">
              Select your preferred layout to view immersive 3D floor plans and
              high-res renders.
            </p>
          </div>

          {/* מערכת הטאבים */}
          <div className="flex flex-wrap gap-2">
            {units.map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => setActiveTab(unit)}
                className={`px-6 py-3 text-[10px] tracking-widest uppercase transition-all rounded-sm border ${
                  activeTab === unit
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-stone border-stone/20 hover:border-aswar-gold"
                }`}
              >
                {unit}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="grid md:grid-cols-12 gap-6"
          >
            {/* תמונת חדר מרכזית */}
            <div className="md:col-span-8 aspect-[16/10] bg-mist border border-stone/10 rounded-sm relative group overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center italic text-stone/40 text-xs">
                [ High-Res {activeTab} Interior Render ]
              </div>
              <div className="absolute bottom-6 left-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  className="p-3 bg-white/90 rounded-sm shadow-sm hover:text-aswar-gold"
                  aria-label="Share"
                >
                  <Share2 size={14} />
                </button>
                <button
                  type="button"
                  className="p-3 bg-white/90 rounded-sm shadow-sm hover:text-aswar-gold"
                  aria-label="Print"
                >
                  <Printer size={14} />
                </button>
              </div>
            </div>

            {/* פרטים טכניים */}
            <div className="md:col-span-4 flex flex-col justify-between space-y-6">
              <div className="p-10 bg-parchment/30 border border-stone/5 rounded-sm flex-grow">
                <h3 className="text-2xl font-light mb-8 text-ink tracking-tight">
                  {activeTab} Residence
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-stone/10 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-stone">
                      Total Area
                    </span>
                    <span className="text-sm font-medium">2,450 SQ.FT</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-stone/10 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-stone">
                      Unit Type
                    </span>
                    <span className="text-sm font-medium">Corner Suite</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-stone/10 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-stone">
                      Starting From
                    </span>
                    <span className="text-sm font-medium text-aswar-gold">
                      AED 4.2M
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="w-full py-5 bg-aswar-gold text-white text-[10px] uppercase tracking-[0.3em] rounded-sm hover:bg-ink transition-colors shadow-lg shadow-aswar-gold/10"
              >
                Download Technical Spec
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Investment Section - טבלת תשלומים נקייה */}
      <section className="py-32 bg-mist/50 border-y border-stone/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-light tracking-tight">Payment Plan</h2>
            <p className="text-stone text-sm">
              Flexible investment structures for international buyers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Down Payment", value: "20%", subtitle: "On Booking" },
              { title: "Construction", value: "40%", subtitle: "During Build" },
              { title: "Handover", value: "40%", subtitle: "On Completion" },
            ].map((box, i) => (
              <div
                key={i}
                className="bg-white p-12 border border-stone/10 rounded-sm text-center hover:border-aswar-gold/50 transition-all group"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-stone mb-4">
                  {box.title}
                </p>
                <p className="text-5xl font-extralight text-ink group-hover:text-aswar-gold transition-colors">
                  {box.value}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-stone/60 mt-4">
                  {box.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="py-20 px-10 bg-white border-t border-stone/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="text-xl font-light tracking-[0.4em] text-ink">
              ASWAR
            </div>
            <p className="text-xs text-stone leading-relaxed max-w-xs uppercase tracking-widest">
              ASWAR International Development
              <br />
              Visionary Architecture · Dubai, UAE
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-aswar-gold font-medium">
              Headquarters
            </h4>
            <p className="text-xs text-stone leading-loose">
              Business Bay, Dubai
              <br />
              United Arab Emirates
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-aswar-gold font-medium">
              Inquiries
            </h4>
            <p className="text-xs text-stone leading-loose hover:text-ink transition-colors">
              <a href="mailto:sales@aswar.ae">sales@aswar.ae</a>
              <br />
              <a href="tel:+971000000000">+971 (0) 4 000 0000</a>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-stone/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] uppercase tracking-widest text-stone/50">
            © 2026 ASWAR International Development. All rights reserved.
          </p>
          <div className="flex gap-8 text-[9px] uppercase tracking-widest text-stone/50">
            <a href="#" className="hover:text-ink">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-ink">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
