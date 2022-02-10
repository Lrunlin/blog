import cheerio from "cheerio";
import { cdn } from "@/store/assetsPath";

function html(str: string, type: string) {
  let $ = cheerio.load(str);
  $("img").each((index, data) => {
    //没有http说明是网络图片
    if (!$(data).attr("src")?.includes("http")) {
      let _src: string = `${cdn}image/${$(data).attr("src")}`;
      $(data).attr("data-src", _src).removeAttr("src").attr("alt", type);
    }
  });
  return $("body").html() as string;
}
export default html;
