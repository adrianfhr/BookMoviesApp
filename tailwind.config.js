/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/movies/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'merriweather': ['Merriweather', 'Georgia', 'serif'],
        'poppins': ['Poppins', 'Arial', 'sans-serif'],
        'dancing': ['Dancing', 'Poppins'],
      },
      colors: {
        primary: "#b63c6e",
        secondary: "#1b0f24",
        accent: "#783f56",
        background:"#050614",
        textColor:"#d6d8f5",
      },
    },
  },
  plugins: [],
}
