/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "36em", // 576px
      sm: "48em", // 768px
      md: "62em", // 992px
      lg: "75em", // 1200px
      xl: "88em", // 1408px
    },
    colors: {
      transparent: "transparent",
      "primary-color": "#60a5fa",
      gray: {
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
      emphasis: "#fef08a",
      white: "#fff",
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
