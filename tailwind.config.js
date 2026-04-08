const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        dourado: '#f8cc1b',        // ou amber-400
      }
    },
  },
  plugins: [flowbite.plugin(),],
}

