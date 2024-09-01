import { globSync } from "glob";
import getFilePath from "../common/modules/getFilePath";

function start() {
  getFilePath("getSocket", [__dirname], () =>
    globSync([`**/*.js`, `**/*.ts`], {
      ignore: ["index.js", "index.ts"],
      cwd: __dirname,
    }),
  ).forEach((item) => {
    import(item);
  });
}
export default start;
