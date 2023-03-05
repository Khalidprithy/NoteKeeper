/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#92d6e5",

          "secondary": "#ea8759",

          "accent": "#f92585",

          "neutral": "#252837",

          "base-100": "#ECF0F3",

          "info": "#B1C3E7",

          "success": "#16a34a",

          "warning": "#BF7A12",

          "error": "#E4352F",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}