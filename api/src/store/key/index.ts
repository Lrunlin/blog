import fs from "fs";

/*
todo 快捷拼接路径
@param {string} private/public 需要查询的私钥/公钥
@return {string} key 获取结果
*/
function getKey(type: "private" | "public"): string {
  let _path = `public/key/${type}.${process.env.ENV}.pem`;
  
  return fs.readFileSync(_path).toString();
}

const PRIVATEKEY: string = getKey("private");
const PUBLICKEY: string = getKey("public");

export { PRIVATEKEY, PUBLICKEY };
