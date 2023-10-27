/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        light: '#EAE5DB',
        dark: '#202020',
        blue: '#bfccd2',
        yellow: '#F1AC00',
        green: '#83af80',
        orange: '#cf8a44',
        red: '#d86363',
      },
    }
  },
  plugins: [],
}

