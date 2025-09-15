/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'music-primary': '#6366f1',
        'music-secondary': '#8b5cf6',
        'music-accent': '#f59e0b',
        'music-bg': '#1f2937',
        'music-surface': '#374151',
        'music-text': '#f9fafb'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 2s infinite'
      }
    },
  },
  plugins: [],
}
