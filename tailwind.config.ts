import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      fontFamily: {
        orbitron: ["'Orbitron'", "sans-serif"],
        geist: ["'Manrope'", "Inter", "system-ui", "sans-serif"]
      },
      colors: {
        background: "hsl(240, 10%, 4%)",
        foreground: "#f5f5f5",
        primary: {
          DEFAULT: "#22d3ee",
          foreground: "#020617"
        },
        cyan: {
          400: "#22d3ee"
        },
        fuchsia: {
          400: "#e879f9"
        },
        emerald: {
          400: "#10b981"
        }
      },
      borderRadius: {
        "3xl": "1.75rem"
      },
      keyframes: {
        "grid-fade": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "grid-fade": "grid-fade 0.8s ease-out forwards",
        marquee: "marquee 30s linear infinite"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(#ffffff10 1px, transparent 0), linear-gradient(90deg, #ffffff10 1px, transparent 0)"
      }
    }
  },
  plugins: [animatePlugin]
};

export default config;
