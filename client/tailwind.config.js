/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      {
        ornipedia: {
          primary: "#22c55e",

          secondary: "#44403c",

          accent: "#eab308",

          neutral: "#f3f4f6",

          "base-100": "#1c1917",

          info: "#f3f4f6",

          success: "#22c55e",

          warning: "#fcd34d",

          error: "#f43f5e",
        },
      },
    ],
  },
};
