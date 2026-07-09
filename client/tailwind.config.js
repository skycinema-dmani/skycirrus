/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0B0B',
        charcoal: '#1A1A1A',
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E8C547',
          dark: '#B8941F',
        },
        bronze: '#B77A3A',
        cream: '#F6F2EB',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        luxury: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        gold: '0 0 40px rgba(212, 175, 55, 0.15)',
      },
    },
  },
  plugins: [],
};
