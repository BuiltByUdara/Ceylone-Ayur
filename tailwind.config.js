/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ayur: {
          dark: '#071A14',
          forest: '#0C2D24',
          deep: '#123A2F',
          moss: '#1B4D3E',
          emerald: '#23735B',
          sage: '#4E8773',
          leaf: '#10B981',
          gold: '#C5A866',
          goldlight: '#E2CB8F',
          goldbright: '#DFB143',
          sand: '#F9F8F3',
          sanddark: '#EFECE2',
          cream: '#FFFDF9',
          terracotta: '#C86D51',
          bark: '#4A3B32'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 30%, rgba(197, 168, 102, 0.15), transparent 70%)',
        'forest-gradient': 'linear-gradient(135deg, #071A14 0%, #0C2D24 50%, #123A2F 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
        'glass-light': '0 8px 32px 0 rgba(197, 168, 102, 0.15)',
        'gold-glow': '0 0 25px -5px rgba(197, 168, 102, 0.4)',
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'pulse-subtle': 'pulseSlow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
