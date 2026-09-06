/** @type {import('tailwindcss').Config} */
export const tailwindPreset = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16"
        },
        surface: {
          0: "#020617",
          50: "#0b1329",
          100: "#0f172a",
          200: "#1e293b",
          300: "#334155"
        },
        accent: {
          gold: "#fbbf24",
          cyan: "#06b6d4",
          amber: "#f59e0b"
        }
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.04em", fontWeight: "800" }],
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }]
      },
      fontFamily: {
        display: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"]
      },
      transitionTimingFunction: {
        "hero-ease": "cubic-bezier(0.16, 1, 0.3, 1)",
        "smooth-out": "cubic-bezier(0.25, 1, 0.5, 1)"
      }
    }
  },
  plugins: []
};
