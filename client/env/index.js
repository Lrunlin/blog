const { env } = require("process");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const md5 = require("md5");
const { globSync } = require("glob");

let envObject = dotenv.parse(
  `${fs.readFileSync(path.join(__dirname, "./.env"))}
  \n
  ${fs.readFileSync(path.join(__dirname, `./.env.${env.NODE_ENV}`))}`
);

module.exports = {
  buildid: () => {
    return md5(
      globSync(["src/**/*.*", "./**.js", "./**.json", "./**.ts", "./**.lock"])
        .map(item => {
          let str = fs.readFileSync(item).toString();
          return md5(str);
        })
        .join("")
    );
  },
  env: envObject,
};
