module.exports = {
  presets: [
    [
      "next/babel",
      {
        "styled-jsx": {
          plugins: ["@styled-jsx/plugin-sass"],
          vendorPrefixes: false,
        },
      },
    ],
  ],
};
