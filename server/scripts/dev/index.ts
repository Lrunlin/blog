import fs from "fs";
import deleteDir from "../modules/deleteDir";

(async () => {
  await deleteDir("dist"); //清空dist
  await deleteDir("blog_server"); //清空blog_server

  // 设置打包env的模板
  let fileData = fs.readFileSync(`env/.env.development`).toString();

  let removeKey = [
    "CDN",
    "CLOUD_SERVER_ACCESS_KEY_ID",
    "CLOUD_SERVER_ACCESS_KEY_SECRET",
    "OSS_BUCKET",
    "BAIDU_MAP_AK",
    "GITHUB_CLIENT_SECRETS",
    "EMAIL_USER",
    "EMAIL_KEY",
    "KEY",
  ];
  let envString = fileData
    .split("\n")
    .map((item) => {
      if (item.startsWith("# ")) {
        return item;
      } else {
        let key = item.substring(0, item.indexOf("="));
        let value = item.substring(item.indexOf("=") + 1);

        if (/^[\s\S]*.*[^\s][\s\S]*$/.test(key)) {
          return removeKey.includes(key) ? `${key}=` : `${key}=${value}`;
        } else {
          return key;
        }
      }
    })
    .concat("\n")
    .join("\n");

  fs.writeFileSync(`env/.env.template`, envString);
})();
