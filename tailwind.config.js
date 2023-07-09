/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
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
        50: "#f9fafb",
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
      cyan: {
        400: "#22d3ee",
        700: "#0e7490"
      },
      yellow: {
        200: "#fef08a",
        600: "#ca8a04"
      },
      white: "#fff",
      black: "#000",
    },
    keyframes: {
      overlayShow: {
        from: { opacity: 0 },
        to: { opacity: 0.4 },
      },
      contentShow: {
        from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
        to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
      },
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
    animation: {
      overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      spin: "spin 1s linear infinite;",
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
