/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderColor: ["responsive", "hover", "focus", "focus-visible"],
      ringColor: ["responsive", "hover", "focus", "focus-visible"],
    },
  },
  plugins: [],
};
