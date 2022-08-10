import type { ArticleAttributes } from "@/db/models/article";
import cheerio from "cheerio";

/**
 * todo对文章表的description字段进行加工，在没有description时设置为前200的text
 * ?用于用户查询时
 * @params article {Article} 文章数据
 * @params length {number} description长度（默认200）
 * @return article {Article} 处理好的文章数据
 */
function setDescription(article: ArticleAttributes,length:number=200): ArticleAttributes {
  let description = article.description;
  if (description) {
    return article;
  }
  let $ = cheerio.load(article.content);
  $("pre,code,a,table").remove();
  let _description = $("body")
    .text()
    .substring(0, length)
    .replace(/ /g, "")
    .replace(/\s/g, "")
    .replace(/\n/g, "");
  return { ...article, description: _description };
}
export default setDescription;
