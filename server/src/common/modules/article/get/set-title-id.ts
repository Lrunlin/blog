import { ArticleAttributes } from "@/db/models/article";
import { load } from "cheerio";

/** 设置h1-h6的id*/
function setTitleId(article: ArticleAttributes) {
  let $ = load(article.content);
  let title = $("h1,h2,h3,h4,h5,h6");
  title.each((index, item) => {
    $(item).attr("id", `heading-${index}`);
  });

  return { ...article, content: $("body").html(), display_directory: title.length > 3 };
}
export default setTitleId;
