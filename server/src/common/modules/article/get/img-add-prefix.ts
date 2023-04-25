import { load } from "cheerio";

/**对于文章中的图片标签进行处理*/
function setImageTag(
  content: string,
  option: { update?: true; prefix: "article" | "problem" | "answer" },
  alt?: string
) {
  let $ = load(content);
  $("img").each((i, el) => {
    if (option.update) {
      $(el).attr("src", `${process.env.CDN}/${option.prefix}/${$(el).attr("src")}`);
    } else {
      $(el)
        .attr("data-src", `${process.env.CDN}/${option.prefix}/${$(el).attr("src")}`)
        .removeAttr("src")
        .attr("alt", alt)
        .attr("title", alt);
    }
  });
  return $("body").html() as string;
}
export default setImageTag;
