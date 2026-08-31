import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#FAF6FF", // Soft Lilac Porcelain White
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F7F2FF",
          elevated: "#EFE5FF",
          border: "#E9D8FD",
          highlight: "#C084FC",
        },
        slate: {
          950: "#0F172A", // Deep Charcoal Heading ("Hi, iam")
          900: "#1E293B",
          800: "#334155",
          700: "#475569",
          600: "#64748B", // Medium Muted Subtext
          500: "#94A3B8",
        },
        brand: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#A855F7", // Vivid Orchid Violet (from "Kazi")
          600: "#9333EA", // Electric Orchid
          700: "#7E22CE",
          800: "#6B21A8",
          900: "#581C87",
          950: "#1E0A3C",
          orchid: "#A855F7",
          charcoal: "#0F172A",
          muted: "#64748B",
          neon: "#A855F7",
          glow: "#C084FC",
          white: "#FFFFFF",
        },
        cyan: {
          neon: "#9333EA",
        },
        purple: {
          neon: "#A855F7",
          glow: "#F3E8FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
        serif: ["var(--font-display)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "neon-green": "0 0 25px -4px rgba(168, 85, 247, 0.25), 0 0 10px 0 rgba(147, 51, 234, 0.15)",
        "neon-cyan": "0 0 25px -4px rgba(168, 85, 247, 0.2), 0 0 10px 0 rgba(192, 132, 252, 0.1)",
        "neon-purple": "0 0 30px -4px rgba(168, 85, 247, 0.3), 0 0 14px 2px rgba(192, 132, 252, 0.2)",
        "violet-white": "0 10px 30px -5px rgba(168, 85, 247, 0.2), 0 4px 12px 0 rgba(147, 51, 234, 0.1)",
        "orchid-halo": "0 0 40px -5px rgba(168, 85, 247, 0.45), 0 0 15px 0 rgba(192, 132, 252, 0.3)",
        "glass": "0 8px 32px 0 rgba(168, 85, 247, 0.08)",
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(to right, rgba(168, 85, 247, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.05) 1px, transparent 1px)",
        "radial-glow": "radial-gradient(circle at 50% 45%, rgba(168, 85, 247, 0.22) 0%, rgba(243, 232, 255, 0.7) 45%, transparent 75%)",
        "radial-purple": "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.18) 0%, rgba(247, 242, 255, 0.85) 50%, transparent 80%)",
        "radial-white": "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9) 0%, rgba(233, 213, 255, 0.35) 50%, transparent 75%)",
        "lilac-ambient": "linear-gradient(135deg, #F8F2FF 0%, #F3E8FF 30%, #FDF6FF 65%, #FFFFFF 100%)",
        "orchid-gradient": "linear-gradient(135deg, #A855F7 0%, #9333EA 50%, #7E22CE 100%)",
        "orchid-fuchsia": "linear-gradient(135deg, #C084FC 0%, #A855F7 50%, #9333EA 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
