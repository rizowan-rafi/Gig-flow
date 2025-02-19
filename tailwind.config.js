/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  theme: {
    extend: {
      colors: {
        primary: '#59ba4a',
        secondary: '#92e486',
        accent: '#67ef52',
        background: '#f6f9f6',
        text: '#070807',
      },
      
    },
  },
  plugins: [
    require('daisyui'),
  ],
  darkMode: 'class',
}