import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs du logo Only You Coaching
        primary: {
          50: '#F5F4F6',
          100: '#E8E6EA',
          200: '#D4C4B9', // Beige principal du logo
          300: '#C4B5A8',
          400: '#B4A697',
          500: '#A49786',
          600: '#948875',
          700: '#847964',
          800: '#302E40', // Bleu foncé principal du logo
          900: '#2A2838',
          950: '#1F1D2B',
        },
        secondary: {
          50: '#F8F7F9',
          100: '#F0EEF2',
          200: '#E0DDE4',
          300: '#C8C0D0',
          400: '#B0A3BC',
          500: '#9886A8',
          600: '#806994',
          700: '#302E40', // Bleu foncé du logo
          800: '#2A2838',
          900: '#1F1D2B',
          950: '#14121A',
        },
        accent: {
          50: '#FDF7F6',
          100: '#FAEEEC',
          200: '#F4DAD6',
          300: '#EDC6C0',
          400: '#E6B2AA',
          500: '#DF9E94',
          600: '#D88A7E',
          700: '#D17668',
          800: '#CA6252',
          900: '#C34E3C',
          950: '#BC3A26',
        },
        // Couleurs pour les plans d'abonnement
        plan: {
          starter: '#10B981', // Vert pour Starter
          pro: '#3B82F6', // Bleu pour Pro
          expert: '#8B5CF6', // Violet pour Expert
          essentiel: '#F59E0B', // Orange pour Essentiel
          avance: '#EF4444', // Rouge pour Avancé
          premium: '#EC4899', // Rose pour Premium
        },
        // Dark mode specific colors
        dark: {
          background: '#0F0F23', // Very dark blue
          surface: '#1A1A2E', // Dark surface
          card: '#16213E', // Card background
          border: '#2D3748', // Border color
          text: {
            primary: '#F7FAFC', // Primary text
            secondary: '#A0AEC0', // Secondary text
            muted: '#718096', // Muted text
          }
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Courbes élégantes
        'curved': '2rem',
        'curved-lg': '3rem',
        'curved-xl': '4rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'curved-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
