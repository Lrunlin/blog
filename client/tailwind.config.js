/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,html}"],
  theme: {
    extend: {},
    screens: {
      // 设置PC端优先
      sm: { max: "768px" },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
