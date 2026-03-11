import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#b6d6ff",
          300: "#8dbaff",
          400: "#5a93ff",
          500: "#2f6bff",
          600: "#1f4dec",
          700: "#183cc0",
          800: "#17379a",
          900: "#152f7a"
        }
      }
    },
  },
  plugins: [],
} satisfies Config
