import express, { NextFunction, Response, Request } from "express";
import fs from "fs";
import cache from "@/common/middleware/cache";

const app = express();
const router = express.Router();

const config = {
  themes: "tomorrow",
  plugins: [
    "line-highlight",
    "line-numbers",
    "show-language",
    "inline-color",
    "toolbar",
    "copy-to-clipboard",
  ],
};
/** prism代码高亮的相关配置*/
const components: any = JSON.parse(
  fs.readFileSync("public/prism/components.json").toString()
).languages;

const cors = fs.readFileSync(`public/prism/prism-core.min.js`).toString();
const themes = fs.readFileSync(`public/prism/themes/prism-${config.themes}.min.css`).toString();
const plugins = config.plugins.map(item => {
  return {
    css: fs.existsSync(`public/prism/plugins/${item}/prism-${item}.min.css`)
      ? fs.readFileSync(`public/prism/plugins/${item}/prism-${item}.min.css`).toString()
      : "",
    js: fs.existsSync(`public/prism/plugins/${item}/prism-${item}.min.js`)
      ? fs.readFileSync(`public/prism/plugins/${item}/prism-${item}.min.js`).toString()
      : "",
  };
});

let language: { [key: string]: string } = {};
fs.readdirSync(`public/prism/language`).forEach(item => {
  language[item.replace(`prism-`, "").replace(`.min.js`, "")] = fs
    .readFileSync(`public/prism/language/${item}`)
    .toString();
});

/**
 * 根据传来的单个类型递归返回全部依赖类型，并且排序
 * @params type {string} 类型
 * @return typeArray {string[]} 所有依赖到的类型
 */
function getAllType(type: string) {
  let typeHub: string[] = [type]; //存储类型（先将原始类型存进来）
  function requireType(_type: string) {
    let languageRequire: string | string[] = components[_type]?.require;
    if (!languageRequire) {
      return; //第一个语言没有依赖就可以直接返回了
    }
    if (typeof languageRequire == "string") {
      typeHub.unshift(languageRequire);
      requireType(languageRequire);
    } else {
      languageRequire.forEach(item => {
        typeHub.unshift(item);
        requireType(item);
      });
    }
  }
  requireType(type);
  return typeHub;
}

router.get("/high-light/:type",cache, async (req: Request, res: Response, next: NextFunction) => {
  if (req.params.type == "css") {
    res.setHeader("Content-Type", "text/css;charset=UTF-8");
    res.write(`${themes}\n${plugins.map(item => item.css).join("\n")}`);
    res.end();
    return;
  }

  let _language = (req.query.languages + "")
    .split(",")
    .map(item => {
      //如果没有类型，将使用别名，转化为正确名称
      if (language[item]) return item;
      let aliasIndex = Object.values(components).findIndex((index: any) => {
        if (!index.alias) return false;
        return typeof index.alias == "string" ? index.alias == item : index.alias.includes(item);
      });
      //既没有别名，又没找到语言的返回false
      return aliasIndex != -1 ? Object.keys(components)[aliasIndex] : false;
    })
    .filter(item => !!item)
    .map(item => getAllType(item as string))
    .flat()
    .map(item => {
      return language[item] ? `/**language:${item}**/\n${language[item]}` : "";
    })
    .join(`\n`);

  res.setHeader("Content-Type", "text/javascript;charset=UTF-8");
  res.write(`
  /**个人博客:blogweb.cn**/
  ${cors}\n${_language}\n${plugins.map(item => item.js).join("\n")}
  `);
  res.end();
});
export default router;
