/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode using class
  content: [
    "./index.html",
    "./privacy-policy/**/*.html",
    "./terms-of-service/**/*.html",
    "./scripts/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        scapes: {
          // Light theme
          'light-base': '#f8f8ef',
          'light-primary': '#137586',
          'light-secondary': '#0d6271',
          'light-accent': '#70c3c6',
          'light-highlight': '#f9c52e',
          // Dark theme
          'dark-base': '#0f0f0f',
          'dark-primary': '#2bb4c1',
          'dark-secondary': '#1fa6b3',
          'dark-accent': '#1a6d75',
          'dark-highlight': '#ffc107',
          // Aliases for CSS variables
          base: 'var(--color-base)',
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          accent: 'var(--color-accent)',
          highlight: 'var(--color-highlight)',
        },
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        panImage: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.1) translate(-2%, -2%)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pan-image': 'panImage 20s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
