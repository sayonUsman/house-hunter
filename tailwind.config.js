/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkModel: "media",
  theme: {
    extend: {
      fontFamily: {
        DM: "DM Serif Display",
      },
    },
  },
  plugins: [require("daisyui")],
};
