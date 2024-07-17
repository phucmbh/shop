/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  safelist: ['bg-orange'],
  theme: {
    extend: {
      colors: {
        orange: '#fb5533'
      },
      backgroundImage: {
        'register-banner': "url('/src/assets/images/register-background.jpg')"
      }
    }
  },
  plugins: [
    ({ addComponents, theme }) => {
      addComponents({
        '.container': {
          maxWidth: theme('columns.6xl'),
          marginLeft: 'auto',
          marginRight: 'auto'
        }
      })
    }
  ]
}
