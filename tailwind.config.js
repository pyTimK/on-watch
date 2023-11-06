/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {

        // required
        light_primary: "#F99394",
        darker_primary: "#EC354B",
        darkest_primary: "#EB1C36",

        // custom
        bg: "#F7F7F7",
        white: "#FFFFFF",
        red: "#EB1C36",
        red_bg: "#EC354B",
        red_light: "#F99394",
        black: "#000000",
        gray: "#262626",
        bluegreen: "#2AB6B5",
      },
    },
    
  },
  plugins: [],
}
