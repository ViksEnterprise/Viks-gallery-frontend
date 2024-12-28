/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,tsx}"
  ],
  theme: {
    extend: {
      width: {
        '120': '67rem',
        '121': '270rem'
      },
      colors: {
        'deep-blue': '#090351',
        'abt-blue': '#09067C',
        'tes-col': '#EBEBF1'
      },
      fontSize: {
        'xl-15': ['15px', {
          lineHeight: '1.21rem'
        }]
      },
    },
  },
  plugins: [],
}