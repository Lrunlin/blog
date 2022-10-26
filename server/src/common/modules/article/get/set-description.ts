import { load } from "cheerio";
import type { ArticleAttributes } from "@/db/models/article";
type paramsType = Pick<ArticleAttributes, "content" | "description">;
/**
 * todo对文章表的description字段进行加工，在没有description时设置为前200的text
 * ?用于用户查询时
 * @params article {Article} 文章数据
 * @params length {number} description长度（默认200）
 * @return article {Article} 处理好的文章数据
 */
function setDescription<T>(params: paramsType, length: number = 200) {
  let description = params.description;
  if (description) return params as paramsType & T;

  let $ = load(params.content);
  $("pre,code,a,table,ul,ol").remove();

  let _description = $("body")
    .text()
    .replace(/ /g, "")
    .replace(/\s/g, "")
    .replace(/\n/g, "")
    .substring(0, length);

  return { ...params, description: _description } as paramsType & T;
}
export default setDescription;
