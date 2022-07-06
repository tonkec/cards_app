/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#4C00C2",
        purple2: "#32007E",
        green: "#19AC51",
        red: "#FC484C",
        white: "#ffffff",
        gray: "#798291",
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
    },
  },
  plugins: [],
};
