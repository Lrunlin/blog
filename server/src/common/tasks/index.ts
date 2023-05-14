import path from "path";
import { globSync } from "glob";

function start() {
  if ([undefined, "0"].includes(process.env.NODE_APP_INSTANCE)) {
    let dir = globSync(`**/*.js`, { ignore: ["index.js"], cwd: __dirname });
    dir.forEach(item => {
      import(path.join(__dirname, item)).then(res => {
        res.default && res.default();
      });
    });
  }
}
export default start;
