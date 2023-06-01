import TurndownService from "turndown";
const gfm = require("turndown-plugin-gfm");

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

// 取消转义
turndownService.escape = md => md;

/** 将HTML字符串转为Markdown*/
function HTMLToMarkDown(content: string) {
  return turndownService.turndown(content);
}
export default HTMLToMarkDown;
