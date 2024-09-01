import { globSync } from "glob";
import path from "path";
import getFilePath from "./getFilePath";

export default getFilePath("getAllRouter", [__dirname, "../../routes"], () =>
  globSync([`**/*.js`, `**/*.ts`], {
    cwd: path.join(__dirname, "../../routes"),
  }),
);
