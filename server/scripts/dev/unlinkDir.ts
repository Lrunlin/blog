import fs from "fs";
import deleteDir from "../modules/deleteDir";

function remove(path: string) {
  try {
    deleteDir(`dist/${path}`);
  } catch (error) {
    console.error(`文件夹:${path} 删除错误`);
  }
}
export default remove;
