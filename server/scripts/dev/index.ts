import fs from "fs";
import deleteDir from "../modules/deleteDir";
import copyDir from "../modules/copyDir";
import chokidar from "chokidar";
import shell from "shelljs";

deleteDir("dist"); //清空dist
fs.mkdirSync("dist"); //创建dist
copyDir("public", "dist/public"); //复制public
fs.writeFileSync("dist/.env", fs.readFileSync(`env/.env.development`).toString()); //复制环境变量文件

// 开始执行tsc
shell.exec("tsc");
if (process.env.debug) {
  shell.exec("nodemon --inspect ./dist/src/index.js", { async: true });
} else {
  shell.exec("nodemon ./dist/src/index.js", { async: true });
}

import change from "./change";
import remove from "./remove";
import add from "./add";
import addDir from "./addDir";
import unlinkDir from "./unlinkDir";

// 添加监听事件
chokidar
  .watch("src")
  .on("add", path => add(path))
  .on("change", path => change(path))
  .on("unlink", path => remove(path))
  .on("addDir", path => addDir(path))
  .on("unlinkDir", path => unlinkDir(path));

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
fs.writeFileSync(`env/.env.template`, envString);
