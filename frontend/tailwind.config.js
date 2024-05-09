// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1270px",
    },
    extend: {
      fontFamily: {
        "rampart-one": ["Rampart One", "sans-serif"],
        graduate: ["Graduate"],
        henny: ["Henny Penny", "cursive"],
        libre: ["Libre", "Baskerville"],
        protest: ["Protest", "Riot"],
      },
      boxShadow: {
        "blue-neumorphism-xl": "-6px 6px 12px #9badce,6px -6px 12px #cde5ff",
        "inner-blue-neumorphism-xl":
          "inset -6px 6px 4px #a2b5d8,inset 6px -6px 4px #c6ddff",
        "light-neumorphism-l":
          "  16px 16px 42px rgba(138, 138, 138, 1),-16px -16px 42px rgba(255, 255, 255, 1)",
        "light-inner-neumorphism-xl":
          "inset 9px 9px 18px rgba(83, 138, 149, 1), inset -9px -9px 18px rgba(133, 220, 237, 1)",
        "head-inners-neumorphism-xl":
          "inset 6px 6px 9px #80cd9e, inset -6px -6px 9px #9cfbc1",
        "green-innerr-neumorphism-xl":
          "8px 8px 16px #79c295,-8px -8px 16px #a3ffc9",
        "green-inner-neumorphism-xl":
          "inset -6px 6px 12px #7dc99a,inset 6px -6px 12px #9fffc4",
      },
      colors: {
        primary: "#212353",
        secondary: "#4B5D68",
        accent: {
          primary: "#9C69E2",
          primary_hover: "#9059DB",
          secondary: "#F063B8",
          secondary_hover: "#E350A9",
          tertiary: "#68C9BA",
        },
      },
      backgroundImage: {
        hero: "url('../src/assets/img/hero_bg.png')",
      },
      dropShadow: {
        primary: " 0px 5px 5px rgba(75, 93, 104, 0.1)",
      },
      animation: {
        marquee: "marquee 10s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100vw)" },
          "100%": { transform: "translateX(-100vw)" },
        },
      },
    },
  },
  plugins: [],
};
