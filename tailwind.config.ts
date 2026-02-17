import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        colorPrimary: "#ffe600",
        colorDark: "#1a1a1a",
        colorSecondaryDark: "#666666",
        colorSecondaryLight: "#e5e5e5",
        colorPrimaryDark: "#ccb800",
        colorPrimaryLight: "#fff7b3",
      },
      spacing: {
        paddingX: "clamp(1.5rem, 5vw, 3rem)",
        paddingY: "clamp(3rem, 8vh, 6rem)",
      },
      maxWidth: {
        maxWidth: "1400px",
      },
      fontFamily: {
        birthstone: ["Birthstone", "cursive"],
        explora: ["var(--font-explora)", "cursive"],
        turretRoad: ["var(--font-turret-road)", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
