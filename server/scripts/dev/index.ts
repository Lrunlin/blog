import fs from "fs";
import deleteDir from "../modules/deleteDir";

(async () => {
  await deleteDir("dist"); //清空dist
  await deleteDir("blog_server"); //清空blog_server

  // 设置打包env的模板
  let fileData = fs.readFileSync(`env/.env.development`).toString();

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
