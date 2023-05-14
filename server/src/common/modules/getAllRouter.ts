import path from "path";
import { globSync } from "glob";

let dir = globSync(`**/*.js`, {
  ignore: ["index.js"],
  cwd: path.join(__dirname, "../../routes"),
}).map(item => {
  return path.join(__dirname, "../../routes", item);
});
export default dir;
