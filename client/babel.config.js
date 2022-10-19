module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "lib",
        style: function (name) {
          return `${name}/style/index.css`;
        },
      },
    ],
  ],
};
