module.exports = {
  mode: "jit",
  content: ["index.html", "./src/**/*.{tsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};