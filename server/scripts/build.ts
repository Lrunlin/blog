import fs from "fs";
import path from "path";
import shell from "shelljs";
import clearDir from "./modules/deleteDir";
import copyDir from "./modules/copyDir";

clearDir("dist"); //清空dist
fs.mkdirSync("dist");
const _tsc = shell.exec("tsc");

copyDir("public", "dist/public"); //复制public
fs.writeFileSync("dist/package.json", fs.readFileSync("package.json").toString());
fs.writeFileSync("dist/yarn.lock", fs.readFileSync("yarn.lock").toString());
fs.writeFileSync("dist/nodemon.json", fs.readFileSync("nodemon.json").toString());
fs.writeFileSync("dist/.env", fs.readFileSync("env/.env.production").toString());

console.log('打包完成');
