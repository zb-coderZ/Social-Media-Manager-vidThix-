/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        // Premium dark theme colors
        navy: {
          950: "#0F1419", // Primary background
          900: "#1A1F2E", // Secondary background
          800: "#1F2937", // Cards, hover states
          700: "#252D3D", // Darker for interactions
        },
        // CTA engagement orange
        accent: {
          orange: "#FF6B35", // Primary CTAs (40% higher engagement)
          indigo: "#6366F1", // Primary elements
          cyan: "#00D9FF", // Interactive elements
          emerald: "#10B981", // Success states
        },
        // Legacy premium scales (keeping for compatibility)
        premium: {
          purple: {
            50: "#faf5ff",
            100: "#f3e8ff",
            200: "#e9d5ff",
            300: "#d8b4fe",
            400: "#c084fc",
            500: "#a855f7",
            600: "#9333ea",
            700: "#7e22ce",
            800: "#6b21a8",
            900: "#581c87",
          },
          blue: {
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6",
            600: "#2563eb",
            700: "#1d4ed8",
            800: "#1e40af",
            900: "#1e3a8a",
          },
        },
      },
      boxShadow: {
        // Indigo glow effects
        "glow-sm": "0 0 10px rgba(99, 102, 241, 0.3)",
        glow: "0 0 20px rgba(99, 102, 241, 0.4)",
        "glow-lg": "0 0 30px rgba(99, 102, 241, 0.5)",
        // Orange glow for CTAs
        "glow-orange": "0 0 20px rgba(255, 107, 53, 0.5)",
        "glow-orange-lg": "0 0 30px rgba(255, 107, 53, 0.6)",
        // Cyan glow for accents
        "glow-cyan": "0 0 20px rgba(0, 217, 255, 0.3)",
        "glow-cyan-lg": "0 0 30px rgba(0, 217, 255, 0.4)",
        // Premium shadow layering
        premium: "0 20px 60px rgba(0, 0, 0, 0.6)",
        "premium-lg": "0 30px 90px rgba(0, 0, 0, 0.8)",
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
        "5xl": "96px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // New premium gradients for dark theme
        "premium-gradient": "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
        "premium-orange": "linear-gradient(135deg, #FF6B35 0%, #FF8C56 100%)",
        "mesh-gradient":
          "linear-gradient(135deg, #6366F1 0%, #8B5CF6 25%, #00D9FF 50%, #06B6D4 75%, #00D9FF 100%)",
        "hero-dark": "linear-gradient(135deg, #0F1419 0%, #1A1F2E 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        // Additional smooth animations
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        float: "float 15s ease-in-out infinite",
        gradient: "gradient 8s ease infinite",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
