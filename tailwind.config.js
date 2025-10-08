/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F9DFD4',
          100: '#F5D0C0',
          200: '#F0C1AC',
          300: '#EBB298',
          400: '#E6A384',
          500: '#F9DFD4', // Main primary color
          600: '#E6A384',
          700: '#D18F74',
          800: '#BC7B64',
          900: '#A76754',
        },
        secondary: {
          50: '#B57379',
          100: '#A86B71',
          200: '#9B6369',
          300: '#8E5B61',
          400: '#815359',
          500: '#B57379', // Main secondary color
          600: '#815359',
          700: '#744B51',
          800: '#674349',
          900: '#5A3B41',
        },
        accent: {
          50: '#39334E',
          100: '#332E47',
          200: '#2D2940',
          300: '#272439',
          400: '#211F32',
          500: '#39334E', // Main accent color
          600: '#211F32',
          700: '#1B192B',
          800: '#151324',
          900: '#0F0D1D',
        },
        neutral: {
          50: '#E8E8E7',
          100: '#E1E1E0',
          200: '#DADAD9',
          300: '#D3D3D2',
          400: '#CCCCCB',
          500: '#E8E8E7', // Main neutral color
          600: '#CCCCCB',
          700: '#B5B5B4',
          800: '#9E9E9D',
          900: '#878786',
        },
        // Keep original colors for compatibility
        rose: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '3.5rem',
        '8xl': '4rem',
        '9xl': '4.5rem',
        '10xl': '5rem',
        'custom': '1.5rem 3rem 1.5rem 3rem',
        'wave': '50% 50% 50% 50%',
        'organic': '60% 40% 30% 70% / 60% 30% 70% 40%',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'wave': 'wave 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        wave: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'curved-gradient': 'linear-gradient(135deg, #F9DFD4 0%, #B57379 50%, #39334E 100%)',
        'organic-gradient': 'linear-gradient(45deg, #F9DFD4 0%, #B57379 25%, #39334E 50%, #E8E8E7 75%, #B57379 100%)',
        'soft-gradient': 'linear-gradient(135deg, #F9DFD4 0%, #E8E8E7 50%, #B57379 100%)',
        'warm-gradient': 'linear-gradient(45deg, #F9DFD4 0%, #B57379 100%)',
        'elegant-gradient': 'linear-gradient(135deg, #39334E 0%, #B57379 50%, #F9DFD4 100%)',
      },
      boxShadow: {
        'curved': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'floating': '0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'organic': '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
}