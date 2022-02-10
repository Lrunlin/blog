import xss from "xss";
import { assets, cdn } from "@/store/assetsPath";
import whiteList from "./whiteList";
function StrongXSS(html: string) {
  return xss(html, {
    stripIgnoreTag: true,
    whiteList,
    onTagAttr: function (tag, name, value, isWhiteAttr) {
      if (tag == "img" && name == "src") {
        return `${name}="${value.replace(`${assets}image/`, "").replace(`${cdn}/image`, "")}"`;
      }
    },
  });
};
export default StrongXSS;
