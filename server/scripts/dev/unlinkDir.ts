import fs from "fs";
import deleteDir from "../modules/deleteDir";
function remove(path: string) {
  deleteDir(`dist/${path}`);
}
export default remove;
