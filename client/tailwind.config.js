const spacing = {};
for (let i = 0; i < 100; i += 0.25) {
  spacing[`${i}vw`] = i + "vw";
  spacing[`${i}vh`] = i + "vh";
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{tsx,html}"],
  theme: {
    extend: {
      spacing, //继承
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
