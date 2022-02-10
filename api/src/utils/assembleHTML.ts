import cheerio from "cheerio";
import { cdn } from "@/store/assetsPath";

/** 
 * article的article字段中的get
 * @params str {string} 需要查询的文章内容字符串
 * @params type {string} 文章类型字符串
 * @return html {html} 处理好的HTML字符串
*/
function html(str: string, type: string):string {
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
