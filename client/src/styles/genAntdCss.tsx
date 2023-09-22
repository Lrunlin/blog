import { createHash } from "crypto";
import fs from "fs";
import path from "path";
import type Entity from "@ant-design/cssinjs/lib/Cache";
import { extractStyle } from "@ant-design/cssinjs";

export type DoExtraStyleOptions = {
  cache: Entity;
};
export function doExtraStyle({ cache }: DoExtraStyleOptions) {
  const baseDir = path.resolve(__dirname, "../../static/css");

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  const css = extractStyle(cache, true);
  if (!css) return "";

  const md5 = createHash("md5");
  const hash = md5.update(css).digest("hex");

  const fileName = `${hash.substring(0, 16)}.css`;
  const fullpath = path.join(baseDir, fileName);

  if (fs.existsSync(fullpath)) return `/static/antd/${fileName}`;

  fs.writeFileSync(fullpath, css);

  return `/static/antd/${fileName}`;
}
