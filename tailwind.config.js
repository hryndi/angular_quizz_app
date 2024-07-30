/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "400px" },
      },
      minWidth: {
        auth_form: "25rem",
      },
    },
  },
  plugins: [],
};
