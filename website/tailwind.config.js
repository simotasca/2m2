const plugin = require("tailwindcss/plugin");
const { theme } = require("tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)"],
        oswald: ["var(--font-oswald)"],
      },
      colors: {
        dark: "#363636",
      },
      backgroundImage: ({ theme }) => ({
        "red-gradient": `linear-gradient(to bottom right, ${theme(
          "colors.red.700"
        )}, ${theme("colors.red.500")})`,
      }),
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [
    plugin(({ addComponents, addVariant, addBase, theme }) => {
      // remove mozilla yellow background on autofilled inputs
      addBase({
        input: {
          background: "transparent",
        },
        "input:-moz-autofill": {
          background: "transparent",
          filter: "none",
        },
        "input:-moz-autofill-preview": {
          background: "transparent",
          filter: "none",
        },
        "input:-webkit-autofill": {
          background: "transparent",
          filter: "none",
        },
      });
      addComponents({
        ".login-is-loading": {
          "pointer-events": "none",
        },
        ".cart-is-open": {
          overflow: "hidden",
        },
        ".search-open": {
          overflow: "hidden",
        },
      });
      addVariant("child", "&>*");
    }),
  ],
};
