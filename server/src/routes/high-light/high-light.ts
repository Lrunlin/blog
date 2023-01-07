import Router from "@koa/router";
let router = new Router();
import StreamZip from "node-stream-zip";
const zip = new StreamZip({
  file: "public/prism.zip",
  storeEntries: true,
});
zip.on("error", err => {
  throw new Error("文件解压错误");
});

let prism: any = {};
const decompressionPrism = new Promise<void>((resolve, reject) => {
  zip.on("ready", () => {
    for (const entry of Object.values(zip.entries())) {
      if (entry.isFile) {
        const data = zip.entryDataSync(entry.name);
        prism[entry.name.replace("prism/", "")] = data.toString();
      }
    }
    zip.close();
    resolve();
  });
});

/**
 * 定义使用的主题和插件
 * !如果使用了工具栏中的按钮，一定在先定义toolbar
 */
const config = {
  themes: "tomorrow",
  plugins: [
    "toolbar",
    "line-highlight",
    "line-numbers",
    "inline-color",
    "copy-to-clipboard",
    "show-language",
  ],
};

/** prism代码高亮的相关配置*/
let components: any = {}; //Prism插件的内置json配置
let cors = ""; //核心JS
let plugins = { js: "", css: "" }; //使用到Prism插件的JS和CSS文件
let themes = ""; //主题的CSS

let language: { [key: string]: string } = {};
decompressionPrism.then(() => {
  components = JSON.parse(prism["components.json"]).languages;
  cors = prism["prism-core.min.js"];
  themes = prism[`themes/prism-${config.themes}.min.css`];
  // 设置插件CSS、JS
  config.plugins.forEach(item => {
    if (prism[`plugins/${item}/prism-${item}.min.css`]) {
      plugins.css += `/**插件:${item}-css**/${prism[`plugins/${item}/prism-${item}.min.css`]}`;
    }
    if (prism[`plugins/${item}/prism-${item}.min.js`]) {
      plugins.js += `/**插件:${item}-js**/${prism[`plugins/${item}/prism-${item}.min.js`]}`;
    }
  });
  Object.keys(prism).forEach(item => {
    if (item.startsWith("language/prism-")) {
      let _key = item.replace(`language/prism-`, "").replace(`.min.js`, "");
      language[_key] = prism[item];
    }
  });
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

router.get("/high-light/:type", async ctx => {
  ctx.set("Cache-Control", "max-age=2592000"); //缓存一个月
  if (ctx.params.type == "css") {
    ctx.response.set("Content-Type", "text/css;charset=UTF-8");
    ctx.body = `${themes}\n${plugins.css}`;
    return;
  }

  let _language = (ctx.query.languages + "")
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

  ctx.response.set("Content-Type", "text/javascript;charset=UTF-8");
  ctx.body = `/**博客:blogweb.cn**/
  ${cors}\n${_language}\n${plugins.js}
  `;
});
export default router;
