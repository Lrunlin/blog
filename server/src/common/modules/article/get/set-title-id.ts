import { ArticleAttributes } from "@/db/models/article";
import { load } from "cheerio";

/** 设置h1-h6的id*/
function setTitleId(content: string) {
  let $ = load(content);
  let title = $("h1,h2,h3,h4,h5,h6");
  title.each((index, item) => {
    $(item).attr("id", `heading-${index}`);
  });

  return {
    content: $("body").html() as string,
    display_directory: title.length > 3,
  };
}
export default setTitleId;
