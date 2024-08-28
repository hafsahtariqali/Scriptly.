/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
        alegreya: ['Alegreya', 'serif'],
        inter: ['Inter', 'sans-serif'], // Add Inter if needed
        roboto: ['Roboto', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, rgba(85, 139, 255, 0.7), rgba(0, 212, 255, 0.7), rgba(255, 183, 77, 0.7), rgba(255, 97, 97, 0.7), rgba(85, 139, 255, 0.7))',
        'hero-gradient': 'linear-gradient(to bottom, black, #630404)',
        'manual-gradient': 'linear-gradient(to bottom, #630404, black)',
       'radial-gradient': 'radial-gradient(ellipse at center, #630404, black)',
      },
    }
  },
  plugins: [],
};
