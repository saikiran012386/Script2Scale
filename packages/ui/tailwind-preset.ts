/** @type {import('tailwindcss').Config} */
export const tailwindPreset = {
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: { DEFAULT: "#FFC300", light: "#FFD84D", dark: "#E6AF00" },
          orange: { DEFAULT: "#FF6B00", light: "#FF8C33", dark: "#E65C00" },
          black: { DEFAULT: "#0A0A0A" },
          white: { DEFAULT: "#FFFFFF" }
        },
        surface: {
          0: "#020617",
          50: "#0b1329",
          100: "#0f172a",
          200: "#1e293b",
          300: "#334155"
        },
        accent: {
          gold: "#FFC300",
          orange: "#FF6B00",
          amber: "#FF8C33"
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
