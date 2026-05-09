/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        /** Primary brand — Aswar Gold */
        "aswar-gold": "#C5A059",
        /** Global palette (luxury neutrals) */
        ink: "#0F0F0F",
        parchment: "#FAF7F2",
        champagne: "#F3EDE4",
        stone: "#8A8580",
        mist: "#E8E6E3",
      },
    },
  },
};
