import { globSync } from "glob";
import getFilePath from "../modules/getFilePath";

function start() {
  if ([undefined, "0"].includes(process.env.NODE_APP_INSTANCE)) {
    getFilePath("getTasks", [__dirname], () =>
      globSync([`**/*.js`, `**/*.ts`], {
        ignore: ["index.js", "index.ts"],
        cwd: __dirname,
      }),
    ).forEach((item) => {
      import(item).then((res) => {
        res.default && res.default();
      });
    });
  }
}
export default start;
