import fs from "fs";
import shell from "shelljs";
import clearDir from "./modules/deleteDir";
import copyDir from "./modules/copyDir";

(async () => {
  await clearDir("dist"); //清空dist
  await clearDir("blog_server"); //清空dist
  fs.mkdirSync("dist");
  const _tsc = shell.exec("tsc");

  await copyDir("public", "dist/public"); //复制public
  fs.writeFileSync("dist/package.json", fs.readFileSync("package.json").toString());
  fs.writeFileSync("dist/yarn.lock", fs.readFileSync("yarn.lock").toString());
  fs.writeFileSync("dist/.env", fs.readFileSync("env/.env.production").toString());
  fs.writeFileSync("dist/ecosystem.config.js", fs.readFileSync("ecosystem.config.js").toString());
  fs.renameSync("dist", "blog_server");

  console.log("打包完成");
})();
