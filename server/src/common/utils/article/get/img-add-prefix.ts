import { load } from "cheerio";
import type { ArticleAttributes } from "@/db/models/article";

/**
 * 从数据查询数据时对数据库的内容进行加工
 */
function hydrate(article: ArticleAttributes, update?: true) {
  let $ = load(article.content);
  $("img").each((i, el) => {
    if (update) {
      $(el).attr("src", `${process.env.CDN}/article/${$(el).attr("src")}`);
    } else {
      $(el).attr("data-src", `${process.env.CDN}/article/${$(el).attr("src")}`).removeAttr('src');
    }
  });
  return { ...article, content: $("body").html() };
}
export default hydrate;
