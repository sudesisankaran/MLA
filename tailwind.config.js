/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tvk: {
          maroon: {
            950: '#3D0000',
            900: '#5C0000',
            800: '#7A0000',
            700: '#990000',
            600: '#B30000',
            500: '#CC0000',
            100: '#FFE5E5',
            50: '#FFF5F5',
          },
          gold: {
            900: '#78350F',
            800: '#92400E',
            700: '#B45309',
            600: '#D97706',
            500: '#F59E0B',
            400: '#FBBF24',
            300: '#FCD34D',
            200: '#FDE68A',
            100: '#FEF3C7',
            50: '#FFFBEB',
          },
          dark: {
            950: '#090D16',
            900: '#0F172A',
            800: '#1E293B',
            700: '#334155',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Tamil', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'sans-serif'],
      },
      boxShadow: {
        'tvk': '0 4px 20px -2px rgba(153, 0, 0, 0.25)',
        'gold': '0 4px 20px -2px rgba(245, 158, 11, 0.3)',
      }
    },
  },
  plugins: [],
}

