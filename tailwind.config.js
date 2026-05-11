/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        g1: "#0d3b1e",
        g2: "#1a5c2e",
        g3: "#2d8a4e",
        g4: "#4caf50",
        g5: "#a8d5a2",
        y1: "#f5c518",
        y2: "#fde980",
        y3: "#fff8d6",
        cr: "#fafaf8",
        soil: "#2a1a0e",
        soil2: "#3d2b1f",
        bd: "#d4e8c2",
        mu: "#5a6b52",
        tx: "#1a2018",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        dm: ['"DM Sans"', "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideLeft: {
          from: { opacity: "0", transform: "translateX(40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          from: { opacity: "0", transform: "translateX(-40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.92)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glow: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(245,197,24,0)" },
          "50%": { boxShadow: "0 0 0 6px rgba(245,197,24,0.18)" },
        },
        pulse2: {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" },
        },
        navSlide: {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        pageIn: {
          from: { opacity: "0", transform: "translateY(20px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both",
        fadeIn: "fadeIn 0.5s ease both",
        slideLeft: "slideLeft 0.5s cubic-bezier(0.22,1,0.36,1) both",
        slideRight: "slideRight 0.5s cubic-bezier(0.22,1,0.36,1) both",
        scaleIn: "scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) both",
        ticker: "ticker 22s linear infinite",
        glow: "glow 2.5s infinite",
        pulse2: "pulse2 3s ease-in-out infinite",
        navSlide: "navSlide 0.5s cubic-bezier(0.22,1,0.36,1) both",
        pageIn: "pageIn 0.45s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};
