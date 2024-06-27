/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: 'rgb(210, 5, 4)'
      },
      backgroundImage: {
        'register-banner': "url('/src/assets/images/register-background.jpg')"
      }
    }
  },
  plugins: []
}
