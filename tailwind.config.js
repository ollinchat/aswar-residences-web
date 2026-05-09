/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        charcoal: "#1A1C1E",
        parchment: "#F4F1EA",
        champagne: "#D4AF37",
      },
    },
  },
};
