import fs from "fs";
import path from "path";

/*
todo 快捷拼接路径
@param {string} private/public 需要查询的私钥/公钥
@return {string} key 获取结果
*/
function getKey(type: "private" | "public"): string {
  return fs.readFileSync(path.join(__dirname, `./${type}-key.pem`)).toString();
}

const PRIVATEKEY: string = getKey("private");
const PUBLICKEY: string = getKey("public");

export { PRIVATEKEY, PUBLICKEY };