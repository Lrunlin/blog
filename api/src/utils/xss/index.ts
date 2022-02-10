import xss from "xss";
import { assets, cdn } from "@/store/assetsPath";
import whiteList from "./whiteList";
/** 
 * xss处理article字段
 * @?处理图片路径和白名单外的标签和属性
 * @params html {string} 需要处理的HTML字符串
 * @return str {string} 处理好的HTML字符串
*/
function StrongXSS(html: string):string {
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
