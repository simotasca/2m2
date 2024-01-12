const plugin = require("tailwindcss/plugin");
const { theme } = require("tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: '"Poppins", sans',
        oswald: '"Oswald", sans',
        // oswald: ["var(--font-oswald)"]
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
        xxs: "380px",
        xs: "480px",
        mg: "960px",
        "3xl": "1800px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
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
      // glopbal documentElement states
      addComponents({
        ".login-is-loading": {
          "pointer-events": "none",
        },
        "html.mobile-panel-open": {
          overflow: "hidden",
        },
        ".cart-is-open": {
          overflow: "hidden",
        },
        ".search-open": {
          overflow: "hidden",
        },
        ".full-bleed": {
          width: "calc(100vw + 2px)",
          position: "relative",
          left: "50%",
          transform: "translateX(calc(-50vw - 1px))",
        },
        ".text-shadow": {
          "text-shadow": "1px 1px 2px #363636",
        },
      });
      addVariant("child", "&>*");
    }),
  ],
};
