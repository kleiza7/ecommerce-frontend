/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // varsayılan "sans" ailesini Roboto yap
      },
      fontSize: {
        's12-l16': ['12px', '16px'],
        's14-l20': ['14px', '20px'],
        's20-l28': ['20px', '28px'],
        's24-l32': ['24px', '32px'],
        's32-l40': ['32px', '40px'],
        's40-l48': ['40px', '48px'],
      },
      colors: {
        textPrimary: '#000000',
        textSecondary: '#4F4F4F',
      },
    },
  },
  plugins: [],
};
