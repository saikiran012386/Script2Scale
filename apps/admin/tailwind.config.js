const { tailwindPreset } = require("@script2scale/ui/tailwind-preset");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindPreset],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
