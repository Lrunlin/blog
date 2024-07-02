import { globSync } from "glob";
import path from "path";

function start() {
  let dir = globSync(`**/*.js`, { ignore: ["index.js"], cwd: __dirname });
  dir.forEach((item) => {
    import(path.join(__dirname, item));
  });
}
export default start;
