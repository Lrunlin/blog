import fs from "fs";
import path from "path";

/*
todo 快捷拼接路径
@param {string} private/public 需要查询的私钥/公钥
@return {string} key 获取结果
*/
function getKey(type: "private" | "public"): string {
  let _path = path.join(__dirname, `../../../public/key/${type}-key.pem`);
  return fs.readFileSync(_path).toString();
}

const PRIVATEKEY: string = getKey("private");
const PUBLICKEY: string = getKey("public");

export { PRIVATEKEY, PUBLICKEY };
