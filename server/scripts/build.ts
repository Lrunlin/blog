import fs from "fs";
import { globSync } from "glob";
import path from "path";
import shell from "shelljs";
import clearDir from "./modules/deleteDir";

(async () => {
  await clearDir("dist"); //清空dist
  await clearDir("blog_server"); //清空dist
  fs.mkdirSync("dist");
  shell.exec("tsc");

  //复制其他非TS文件（非TS文件tsc无法编译）
  globSync(
    [
      "src/**/*",
      "package.json",
      "yarn.lock",
      "ecosystem.config.js",
      "public/**/*",
    ],
    {
      ignore: ["src/**/*.ts", "scripts/**/*"],
    },
  ).forEach((item) => {
    let filePath = path.normalize(path.join("dist", item));
    if (!fs.existsSync(filePath)) {
      if (fs.statSync(item).isFile()) {
        // 如果是文件，确保路径中的所有目录都存在
        const dirPath = path.dirname(filePath);
        fs.mkdirSync(dirPath, { recursive: true });

        fs.writeFileSync(filePath, fs.readFileSync(item));
      } else {
        fs.mkdirSync(filePath, { recursive: true });
      }
    }
  });

  fs.writeFileSync("dist/.env", fs.readFileSync("env/.env.production"));

  fs.renameSync("dist", "blog_server");

  console.log("打包完成");
})();
