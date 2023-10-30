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
        light: 'var(--light)',
        dark: 'var(--dark)',
        blue: 'var(--blue)',
        yellow: 'var(--yellow)',
        green: 'var(--green)',
        orange: 'var(--orange)',
        red: 'var(--red)',
        primary: 'var(--primary)',
      },
    }
  },
  plugins: [],
}

