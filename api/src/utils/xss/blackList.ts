const blackListTagName = ["link", "script", "style", "iframe"];
/** 需要被删除的属性*/
const blackListAttr = ["style", "id", "title", "contenteditable", "alt", "data-src", "class"];
import cheerio from "cheerio";
/**
 * 过滤黑名单内的标签，并且删除黑名单内的属性
 * @params html {string} 需要被过滤的HTML字符串
 * @return str {string} 处理好的HTML字符串
 */
function blackListFilter(html: string): string {
  const $ = cheerio.load(html);
  $("*").each((index, el) => {
    let tagName = ($(el).prop("tagName") as unknown as string).toLocaleLowerCase();
    //如果禁止该标签就直接删除
    if (blackListTagName.includes(tagName)) {
      $(el).remove();
      return;
    }
    //删除不需要的属性
    blackListAttr.forEach(attr => {
      if (attr != "class" && tagName != "pre") {
        $(el).removeAttr(attr);
      }
    });
  });
  return $("body").html() as string;
}

export default blackListFilter;
