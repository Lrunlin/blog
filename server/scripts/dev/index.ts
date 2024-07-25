import chokidar from "chokidar";
import fs from "fs";
import shell from "shelljs";
import copyDir from "../modules/copyDir";
import deleteDir from "../modules/deleteDir";
import add from "./add";
import addDir from "./addDir";
import change from "./change";
import remove from "./remove";
import unlinkDir from "./unlinkDir";

(async () => {
  await deleteDir("dist"); //清空dist
  await deleteDir("blog_server"); //清空blog_server
  fs.mkdirSync("dist"); //创建dist
  await copyDir("public", "dist/public"); //复制public
  fs.writeFileSync(
    "dist/.env",
    fs.readFileSync(`env/.env.development`).toString(),
  ); //复制环境变量文件

  // 设置打包env的模板
  let fileData = fs.readFileSync(`env/.env.development`).toString();

  // 开始执行tsc
  shell.exec("tsc");
  if (process.env.debug) {
    shell.exec("nodemon --inspect ./dist/src/index.js", { async: true });
  } else {
    shell.exec("nodemon ./dist/src/index.js", { async: true });
  }

  // 添加监听事件
  chokidar
    .watch("src")
    .on("add", (path) => add(path))
    .on("change", (path) => change(path))
    .on("unlink", (path) => remove(path))
    .on("addDir", (path) => addDir(path))
    .on("unlinkDir", (path) => unlinkDir(path));

  // 将字符串转为数组，对注释和变量内容进行处理后在转为字符串，写成文件
  let envString = fileData
    .split("\n")
    .map((item) => {
      if (item.startsWith("# ")) {
        return item;
      } else {
        return item.substring(0, item.indexOf("=") + 1);
      }
    })
    .concat("\n")
    .join("\n");
  fs.writeFileSync(`env/.env.template`, envString);
})();
