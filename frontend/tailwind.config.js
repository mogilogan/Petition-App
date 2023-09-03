// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'
],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1270px',
    },
    extend: {
      fontFamily: {
        'rampart-one': ['Rampart One', 'sans-serif'],
        'graduate': ['Graduate'],
        'henny': ['Henny Penny', 'cursive'],
      },
      boxShadow:  {
        'light-neumorphism-2xl': '-12px -12px 24px rgba(255, 255, 255, 1), 12px 12px 24px rgba(206, 212, 219, 1)',
        'light-neumorphism-xl': '-9px -9px 18px rgba(255, 255, 255, 1), 9px 9px 18px rgba(200, 207, 216, 0.9)',
        'light-neumorphism-l': '  16px 16px 42px rgba(138, 138, 138, 1),-16px -16px 42px rgba(255, 255, 255, 1)',
        'light-inner-neumorphism-xl': 'inset 9px 9px 18px rgba(83, 138, 149, 1), inset -9px -9px 18px rgba(133, 220, 237, 1)',
        'light-inners-neumorphism-xl': 'inset 9px 9px 18px rgba(150, 90, 135, 1), inset -9px -9px 18px rgba(202, 122, 183, 1)',
        'light-innerr-neumorphism-xl': ' 20px 20px 60px rgba(83, 138, 149, 1),  -20px -20px 60px rgba(133, 220, 237, 1)',
        'yellow-inner-neumorphism-xl': ' inset 9px 9px 18px rgba(192, 147, 7, 1), inset  -9px -9px 18px rgba(255, 211, 9, 1)',

        },
      colors: {
        primary: '#212353',
        secondary: '#4B5D68',
        accent: {
          primary: '#9C69E2',
          primary_hover: '#9059DB',
          secondary: '#F063B8',
          secondary_hover: '#E350A9',
          tertiary: '#68C9BA',
        },
        
      },
      backgroundImage: {
        hero: "url('../src/assets/img/hero_bg.png')",
      },
      dropShadow: {
        primary: ' 0px 5px 5px rgba(75, 93, 104, 0.1)',
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100vw)' },
          '100%': { transform: 'translateX(-100vw)' },
        },
      },
    },
  },
  plugins: [
   
  ],
}