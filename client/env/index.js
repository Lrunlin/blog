const { env } = require("process");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");

let envObject = dotenv.parse(
  `${fs.readFileSync(path.join(__dirname, "./.env"))}
  \n
  ${fs.readFileSync(path.join(__dirname, `./.env.${env.NODE_ENV}`))}`
);
module.exports = envObject;
