/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          spotify: {
            green: '#1db954',
            dark: '#121212',
            darker: '#0a0a0a',
            light: '#1a1a1a',
            gray: '#282828',
          },
        },
      },
    },
    plugins: [],
  }