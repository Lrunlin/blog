import sanitizeHtml from "sanitize-html";

// https://github.com/apostrophecms/sanitize-html

/**
 * XSS
 * 用户端向服务端发送数据，对评论内容在进入数据前进行加工
 */
function xss(content: string) {
  return sanitizeHtml(content, {
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
      "li",
      "ol",
      "p",
      "pre",
      "s",
      "strong",
      "ul",
    ],
    allowedAttributes: {
      a: ["href"],
      img: ["src"],
    },
    allowProtocolRelative: false,
    allowedClasses: {
      pre: ["language-*"],
      code: ["language-*"],
    },
  });
}
export default xss;
