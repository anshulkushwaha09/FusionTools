/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0a0f1a',
        'bg-card': 'rgba(255, 255, 255, 0.03)',
        'primary-neon': '#00f3ff',
        'secondary-neon': '#bc13fe',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
