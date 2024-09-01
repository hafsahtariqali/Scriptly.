// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fog: 'fogMovement 20s infinite linear',
      },
      keyframes: {
        fogMovement: {
          '0%': { transform: 'translateX(0) translateY(0) scale(1)' },
          '50%': { transform: 'translateX(-5%) translateY(-2%) scale(1.1)' },
          '100%': { transform: 'translateX(0) translateY(0) scale(1)' },
        },
      },
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
        alegreya: ['Alegreya', 'serif'],
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, rgba(85, 139, 255, 0.7), rgba(0, 212, 255, 0.7), rgba(255, 183, 77, 0.7), rgba(255, 97, 97, 0.7), rgba(85, 139, 255, 0.7))',
        'hero-gradient': 'linear-gradient(to bottom, black, #630404)',
        'manual-gradient': 'linear-gradient(to bottom, #630404, black)',
        'radial-gradient': 'radial-gradient(ellipse at center, #630404, black)',
      },
    },
  },
  plugins: [],
};
