/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '320px',
        'xs': '480px',
      },
    },
  },
  plugins: [],
}

// https://tailwindcss.com/docs/content-configuration
