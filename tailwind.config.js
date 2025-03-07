/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles reset
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
