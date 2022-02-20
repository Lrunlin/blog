const blackList = ["link", "script", "style", "iframe"];

/**
 * 过滤黑名单内的标签
 * @params html {string} 需要被过滤的HTML字符串
 * @return str {string} 处理好的HTML字符串
 */
function blackListFilter(html: string): string {
  blackList.forEach(item => {
    html = html
      .replace(new RegExp(`<${item}>`, "g"), `&lt;${item}&gt;`)
      .replace(new RegExp(`</${item}>`, "g"), `&lt;/${item}&gt;`)
      .replace(new RegExp(`<${item}`, "g"), `&lt;${item}`);
  });
  return html;
}

export default blackListFilter;
