import { load } from "cheerio";
import type { ArticleAttributes } from "@/db/models/article";

type paramsType = Pick<ArticleAttributes, "title" | "content">;
/**对于文章中的图片标签进行处理*/
function serImageTag<T>(params: paramsType, update?: true) {
  let $ = load(params.content);
  $("img").each((i, el) => {
    if (update) {
      $(el).attr("src", `${process.env.CDN}/article/${$(el).attr("src")}`);
    } else {
      $(el)
        .attr("data-src", `${process.env.CDN}/article/${$(el).attr("src")}`)
        .removeAttr("src")
        .attr("alt", params.title)
        .attr("title", params.title);
    }
  });
  return { ...params, content: $("body").html() as string } as T & paramsType;
}
export default serImageTag;
