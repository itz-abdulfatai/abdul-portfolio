/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        tertiary: 'var(--tertiary-color)',
        highlight: 'var(--highlight-color)',
        x: 'var(--x-color)',
        x2: 'var(--x2-color)',
        x3: 'var(--x3-color)',
      },
    },
  },
  plugins: [],
}