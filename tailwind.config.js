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
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        /** Brand palette — Paper, Ink, Champagne only */
        paper: "#FDFDFD",
        ink: "#1A1A1A",
        champagne: "#D4AF37",
      },
    },
  },
};
