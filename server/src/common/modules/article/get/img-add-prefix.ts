import { load } from "cheerio";

/**对于文章中的图片标签进行处理*/
function setImageTag(content: string, prefix: "article" | "problem" | "answer") {
  let $ = load(content);
  $("img").each((i, el) => {
    $(el)
      .attr("src", `${process.env.CDN}/${prefix}/${$(el).attr("src")}`)
      .attr("loading", "lazy");
  });
  return $("body").html() as string;
}
export default setImageTag;
