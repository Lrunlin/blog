import { extractStyle } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/lib/Cache";
import { createHash } from "crypto";

export type DoExtraStyleOptions = {
  cache: Entity;
};
export async function doExtraStyle({ cache }: DoExtraStyleOptions) {
  if (typeof window == "undefined") {
    const fs = await import(`fs`);
    const path = await import(`path`);

    if (!fs.existsSync(`.next/css`)) {
      fs.mkdirSync(`.next/css`, { recursive: true });
    }

    const css = extractStyle(cache, true);

    if (!css) return "";

    const md5 = createHash("md5");
    const hash = md5.update(css).digest("hex");

    const fileName = `${hash.substring(0, 16)}.css`;
    const fullpath = path.join(`.next/css`, fileName);

    if (fs.existsSync(fullpath)) return `/static/antd/${fileName}`;

    fs.writeFileSync(fullpath, css);

    return `/static/antd/${fileName}`;
  }
  return "/";
}
