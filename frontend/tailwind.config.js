/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{jsx, js, css}', './src/**/*.{jsx, js, css}', './src/**/**/*.{jsx, js, css}', './src/*.{jsx, js, css}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark", "cupcake", "night"],
  }
}

