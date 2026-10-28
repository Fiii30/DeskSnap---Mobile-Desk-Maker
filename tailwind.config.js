/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#f9f9fb",
        "surface-soft": "#f3f3f6",
        "surface-card": "#ffffff",
        "surface-muted": "#edeef0",
        ink: "#1a1c1e",
        "ink-soft": "#58423c",
        "ink-muted": "#5d5c56",
        primary: "#0051d5",
        "primary-soft": "#dbe1ff",
        "primary-deep": "#00174b",
        secondary: "#0060ac",
        danger: "#ba1a1a",
        dark: "#2f3133",
        "dark-text": "#f0f0f3",

        primary: {
          50: "#eef4ff",
          100: "#dbe7ff",
          200: "#bfd3ff",
          300: "#93b4ff",
          400: "#6089ff",
          500: "#3b62f6",
          600: "#2547eb",
          700: "#1d36d8",
          800: "#1e2fae",
          900: "#1e2d89",
          DEFAULT: "#3b62f6",
        },

        /* ===== Secondary ===== */
        secondary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          DEFAULT: "#10b981",
        },

        /* ===== Accent ===== */
        accent: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          DEFAULT: "#f43f5e",
        },

        /* ===== Status ===== */
        success: {
          DEFAULT: "#10b981",
          soft: "#d1fae5",
          dark: "#047857",
        },
        warning: {
          DEFAULT: "#f59e0b",
          soft: "#fef3c7",
          dark: "#b45309",
        },
        danger: {
          DEFAULT: "#ef4444",
          soft: "#fee2e2",
          dark: "#b91c1c",
        },
        info: {
          DEFAULT: "#3b82f6",
          soft: "#dbeafe",
          dark: "#1d4ed8",
        },

        /* ===== Border ===== */
        border: {
          DEFAULT: "#e5e7eb",
          strong: "#d1d5db",
          focus: "#3b62f6",
        },

        rarity: {
          common: {
            DEFAULT: "#64748B",
            light: "#94A3B8",
            dark: "#475569",
          },
          rare: {
            DEFAULT: "#F97316",
            light: "#FB923C",
            dark: "#C2410C",
          },
          "super-rare": {
            DEFAULT: "#8B5CF6",
            light: "#A78BFA",
            dark: "#6D28D9",
          },
          "ultra-rare": {
            DEFAULT: "#D4AF37",
            light: "#F5D67B",
            dark: "#B8860B",
          },
        },
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 18px rgba(26, 28, 30, 0.10), 0 2px 5px rgba(26, 28, 30, 0.06)",
        "card-strong":
          "0 20px 25px -5px rgba(26, 28, 30, 0.14), 0 8px 10px -6px rgba(26, 28, 30, 0.10)",
        button:
          "0 4px 6px -1px rgba(26, 28, 30, 0.08), 0 2px 4px -2px rgba(26, 28, 30, 0.06)",
      },
      spacing: {
        "card-front-h": "285px",
        "card-front-w": "215px",
        "card-back-h": "265px",
        "card-back-w": "200px",
        "card-art-tcg": "150px",
        "card-art-moment": "155px",
        "card-offset-x": "1.25rem",
        "card-offset-y": "0.375rem",
        "card-showcase": "310px",
        "card-w": "63mm",
        "card-h": "88mm",
      },
      fontSize: {
        "card-icon": ["20px", { lineHeight: "14px" }],
        "card-title": ["10px", { lineHeight: "14px" }],
        "card-small": ["9px", { lineHeight: "12px" }],
        "card-tiny": ["8px", { lineHeight: "11px" }],
        "card-micro": ["7px", { lineHeight: "10px" }],
      },
    },
  },
  plugins: [],
};
