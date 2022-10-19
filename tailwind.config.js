/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto']
      },
      colors: {
        'black-900': '#101315',
        'black-800': '#15191c',

        'gray-500': '#76797b',
        'gray-800': '#212a2d',

        'yellow-300': '#fcd834'
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(90deg,#f48836,#f4364c)',
        'orange-text-gradient': 'linear-gradient(98deg,#f48836,#f4364c 100%)',
        'main': 'url(/assets/images/bg-dark.svg)'
      },
      boxShadow: {
        'header' : '0 10px 36px 0 rgb(0 0 0 / 51%)'
      }
    },
  },
  plugins: [],
}
