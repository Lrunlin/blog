const fs = require("fs");
const path = require("path");

const clearDir = require("./modules/clearDir"); //删除整个文件夹
const copyDir = require("./modules/copyDir"); //复制文件夹
const countFile = require("./modules/countFile"); //计算文件夹内文件的个数

clearDir("dist"); //清空dist
fs.mkdirSync("dist"); //创建dist
copyDir("public", "dist/public"); //复制public
fs.writeFileSync("dist/.env", fs.readFileSync(`env/.env.development`).toString()); //复制环境变量文件

// 开始执行tsc
const shell = require("shelljs");
const tsCount = countFile(path.join(__dirname, "../src")); //获取ts文件个数实时对比JS

const _tsc = shell.exec("tsc", {
  async: true,
});
// 实时对比TS和JS的个数
new Promise((resolve, reject) => {
  _tsc.stdout.on("data", function (data) {
    let src = path.join(__dirname, "../dist/src");
    if (fs.existsSync(src)) {
      let timer = setInterval(() => {
        let jsCount = countFile("./dist/src");
        if (jsCount == tsCount) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    }
  });
}).then(() => {
  // shell.exec('cross-env ENV=development nodemon --watch ./dist ./dist/src/index.js', {
  shell.exec("nodemon ./dist/src/index.js", {
    async: true,
  });
});

// 每次开发时自动备份一个.development 不携带值
const envDir = fs.readdirSync("env").filter(item => item != ".env");


// 设置打包env的模板
let fileData = fs.readFileSync(`env/.env.development`).toString();
// 将字符串转为数组，对注释和变量内容进行处理后在转为字符串，写成文件
let envString = fileData
  .split("\n")
  .map(item => {
    if (item.startsWith("# ")) {
      return item;
    } else {
      return item.substring(0, item.indexOf("=") + 1);
    }
  })
  .concat("\n")
  .join("\n");
fs.writeFileSync(`env/env.development`, envString);
fs.writeFileSync(`env/env.production`, envString);
