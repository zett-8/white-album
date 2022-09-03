/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      gridTemplateRows: {
        fh: 'auto 1fr auto',
      },
    },
  },
  plugins: [],
}
