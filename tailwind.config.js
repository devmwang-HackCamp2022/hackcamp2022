/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFEFD",
        bright: "#C9C5BD",
        accent: "#00C3D8",
        gray: "#545454",
        dark: "#303030",
        background: "#0B0B0C",
      },
    },
  },
  plugins: [],
}
