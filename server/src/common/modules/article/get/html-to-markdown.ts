import TurndownService from "turndown";
let gfm = require("turndown-plugin-gfm");
import type { ArticleAttributes } from "@/db/models/article";

const turndownService = new TurndownService({
  emDelimiter: "*",
  codeBlockStyle: "fenced",
  fence: "```",
  headingStyle: "atx",
  bulletListMarker: "+",
});
turndownService.use(gfm.gfm);
turndownService.addRule("autoLanguage", {
  filter(node, options) {
    return Boolean(
      options.codeBlockStyle === "fenced" &&
        node.nodeName === "PRE" &&
        node.firstChild &&
        node.firstChild.nodeName === "CODE"
    );
  },

  replacement(content, node, options) {
    node = node as HTMLElement;
    const className = [node.className, node.firstElementChild?.className].join(" ");
    const _language = className.match(/language-(\S+)/);
    const language = _language ? (_language[1] as string) : "";
    const code = node.textContent || "";
    const fence = options.fence;
    return "\n\n" + fence + language + "\n" + code.replace(/\n$/, "") + "\n" + fence + "\n\n";
  },
});

type paramsType = Pick<ArticleAttributes,"content">;
/** 将HTML字符串转为Markdown*/
function HTMLToMarkDown<T>(params: paramsType) {
  return { ...params, content: turndownService.turndown(params.content) } as T & paramsType;
}
export const htmlToMD = (html: string) => turndownService.turndown(html);
export default HTMLToMarkDown;
