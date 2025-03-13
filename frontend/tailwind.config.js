/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Primary: "#2B262F",
        Secondary: "#D7E0FF",
      },
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: ["dark"],
  },
}

