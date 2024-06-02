const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const md5 = require("md5");
const { globSync } = require("glob");

let envObject = dotenv.parse(
  `${fs.readFileSync(path.join(__dirname, "./.env"))}
  \n
  ${fs.readFileSync(
    path.join(__dirname, `./.env.${process.env.NEXT_PUBLIC_ISPRO ? "production" : "development"}`)
  )}
  `
);
// 将服务器环境变量的AUTH_MODE导入，前端判断是否限制注销
try {
  const envServerFilePath = path.resolve(
    __dirname,
    `../../server/env/.env.${process.env.NEXT_PUBLIC_ISPRO ? "production" : "development"}`
  );
  const envServerFileContent = fs.readFileSync(envServerFilePath, "utf8");
  let envServerObject = dotenv.parse(envServerFileContent);
  envObject.AUTH_MODE = envServerObject.AUTH_MODE;
} catch (error) {
  console.log(error);
}

module.exports = {
  buildid: () => {
    return md5(
      globSync(["src/**/*.*", "./**.js", "./**.json", "./**.ts", "./**.lock"])
        .filter(item => {
          const filePath = path.resolve(__dirname, item);
          return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
        })
        .map(item => {
          console.log(item);
          let str = fs.readFileSync(item).toString();
          return md5(str);
        })
        .join("")
    );
  },
  env: envObject,
};
