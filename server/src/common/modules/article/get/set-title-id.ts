import { ArticleAttributes } from "@/db/models/article";
import { load } from "cheerio";

type paramsType = Pick<ArticleAttributes, "content">;
/** 设置h1-h6的id*/
function setTitleId<T>(params: paramsType) {
  let $ = load(params.content);
  let title = $("h1,h2,h3,h4,h5,h6");
  title.each((index, item) => {
    $(item).attr("id", `heading-${index}`);
  });

  return {
    ...params,
    content: $("body").html() as string,
    display_directory: title.length > 3,
  } as T & paramsType & { display_directory: boolean };
}
export default setTitleId;
