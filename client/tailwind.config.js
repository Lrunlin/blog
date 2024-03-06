/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{tsx,html}"],
  theme: {
    extend: {
      colors: {
        "statistics-cyan-color": "rgba(14, 253, 255, 1)",
        "statistics-cyan-border-color": "rgba(14, 253, 255, 0.5)",
      },
    },
    screens: {
      // 设置PC端优先
      sm: { max: "768px" },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
