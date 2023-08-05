import sanitizeHtml from "sanitize-html";

// https://github.com/apostrophecms/sanitize-html

/**
 * XSS
 * 用户端向服务端发送数据，对文章内容在进入数据前进行加工
 */
function xss(content: string, imgPrefix: "article" | "problem" | "answer") {
  const clean = sanitizeHtml(content, {
    enforceHtmlBoundary: true,
    allowedTags: [
      "div",
      "span",
      "a",
      "b",
      "blockquote",
      "code",
      "del",
      "em",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "hr",
      "i",
      "img",
      "input",
      "li",
      "ol",
      "p",
      "pre",
      "s",
      "strong",
      "table",
      "tbody",
      "td",
      "th",
      "thead",
      "tr",
      "ul",
    ],
    allowedAttributes: {
      a: ["href"],
      img: ["src"],
      input: ["type", "checked", "disabled"],
      code: ["class"],
      pre: ["class"],
    },
    allowProtocolRelative: false,
    allowedClasses: {
      pre: ["language-*"],
      code: ["language-*"],
    },
    /**
     * !插件逻辑有点问题，插件是先执行标签转换在执行过滤
     * ?现在插件转换时对src属性进行设置如果不符合就设置为undefined
     */
    transformTags: {
      img: function (tagName, attribs) {
        let src = attribs.src;
        let prefix = `${process.env.CDN}/${imgPrefix}/`;
        return {
          tagName: "img",
          attribs: {
            src: src.replace(prefix, ""),
          },
        };
      },
    },
    exclusiveFilter: function (frame) {
      // 对img中src为空和外站图片进行删除
      if (frame.tag === "img") {
        return !frame.attribs.src && frame.attribs.src.startsWith("http");
      }
      // input标签只支持复选框
      if (frame.tag === "input") {
        return frame.attribs.type !== "checkbox";
      }
      return false;
    },
  });
  return clean;
}
export default xss;
