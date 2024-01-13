/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      height: {
        custom: '85vh',
      },
    },
  },
  plugins: [require("daisyui")],
}

