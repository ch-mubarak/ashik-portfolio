import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "space-black": "#050510",
        "cyan-neon": "#00D4FF",
        "violet-neon": "#7C3AED",
        "hot-pink": "#FF2D6B",
        "emerald-neon": "#10B981",
        "amber-neon": "#F59E0B",
        "glass-surface": "rgba(255,255,255,0.04)",
        "glass-border": "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero": "linear-gradient(135deg, #00D4FF 0%, #7C3AED 50%, #FF2D6B 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(124,58,237,0.1) 100%)",
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,212,255,0.3)" },
          "50%": { boxShadow: "0 0 60px rgba(0,212,255,0.8), 0 0 100px rgba(0,212,255,0.3)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        "glass-hover": "0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 0 1px rgba(0,212,255,0.2)",
        "neon-cyan": "0 0 20px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.2)",
        "neon-violet": "0 0 20px rgba(124,58,237,0.4), 0 0 60px rgba(124,58,237,0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
