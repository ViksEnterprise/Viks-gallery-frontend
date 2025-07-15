/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,tsx}"
  ],
  theme: {
    extend: {
      width: {
        '120': '70rem',
        '121': '270rem',
        '3p': '30%'
      },
      colors: {
        'deep-blue': '#090351',
        'abt-blue': '#09067C',
        'tes-col': '#EBEBF1',
        'auth': '#0A078E',
        'bdr': '#969696',
        'label': '#8986AB',
        'ec': '#EEECEC',
        'danger': 'red',
        'ab-bg-color': 'hsla(0, 0.00%, 0.00%, 0.73)'
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
