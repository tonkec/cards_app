/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          100: "#4C00C2",
          200: "#32007E",
          300: "#3B058E",
        },
        green: "#19AC51",
        red: "#FC484C",
        white: {
          100: "#ffffff",
          200: "#E5E5E5",
        },
        gray: {
          100: "#D3D8E1",
          200: "#798291",
          300: "#444E5D",
        },
        black: "#1A212C",
      },
      fontSize: {
        xs: "10px",
        sm: "14px",
        md: "16px",
        lg: "24px",
        xl: "30px",
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "16px",
        4: "24px",
        5: "32px",
        6: "40px",
        7: "48px",
        8: "56px",
      },
      borderRadius: {
        sm: "16px",
        md: "24px",
        xl: "100px",
      },
      backgroundImage: {
        card: "url('./assets/shape.svg')",
      },
    },
  },
  plugins: [],
};
