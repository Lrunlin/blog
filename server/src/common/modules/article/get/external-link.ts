import { load } from "cheerio";
import { getData } from "@/common/modules/cache/external-link";
import url from "url";

function setURL(href: string) {
  //   判断是否有相对地址;
  if (
    process.env.CLIENT_HOST!.includes(url.parse(href).hostname!) ||
    getData()!.some(item => url.parse(href).hostname?.includes(item))
  ) {
    return href;
  } else {
    return `${process.env.CLIENT_HOST}/link?target=${href}`;
  }
}

/**对文章中的链接进行处理*/
function setExternalLink(content: string) {
  let $ = load(content);
  $("a").each((i, el) => {
    if ($(el).attr("href")) {
      $(el)
        .attr("href", setURL($(el).attr("href")!))
        .attr("target", "_blank");
      if (process.env.CLIENT_HOST!.includes(url.parse($(el).attr("href")!).hostname!)) {
        $(el).attr("rel", "nofollow noopener noreferrer");
      }
    }
  });
  return $("body").html() as string;
}

export default setExternalLink;
