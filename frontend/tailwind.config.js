/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        competence: {
          BE: '#ef4444',
          AE: '#eab308',
          ME: '#22c55e',
          EE: '#3b82f6',
        },
        primary: {
          DEFAULT: "#63A7C9",
          50: "#F3F9FC",
          100: "#E6F2F9",
          200: "#CDE5F2",
          300: "#B4D8EB",
          400: "#8EC4DE",
          500: "#63A7C9",
          600: "#4A90AF",
          700: "#3A7B98",
          800: "#2C6177",
          900: "#1F4556",
        },
        secondary: {
          DEFAULT: "#F8D632",
          50: "#FFFAE8",
          100: "#FFF3C2",
          200: "#FFE58A",
          300: "#FFDA4D",
          400: "#FFD12A",
          500: "#F8D632",
          600: "#D8B52A",
          700: "#B79622",
          800: "#95781B",
          900: "#7B6216",
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fefce8',
          500: '#eab308',
          600: '#ca8a04',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        'sans': ['System'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      elevation: {
        'sm': 2,
        'md': 4,
        'lg': 8,
        'xl': 16,
      }
    },
  },
  plugins: [],
}