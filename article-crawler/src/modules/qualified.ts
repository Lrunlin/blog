/*
 todo 过滤掉不合格的文章
 @params {time,html,type}:{string,string,string[]} 
 @params {object} option  用户配置
 @return {boolean} result 是否合格
*/
import cheerio from "cheerio";
import { articleData, userOption } from "../types";
function qualified(articleData: articleData, option: userOption):boolean {
  const $ = cheerio.load(articleData.html);
  let result = true;
  if (!option.image && $("img").length) {
    result = false;
    // console.log('图片验证失败');
  }

  if (!option.time && +new Date() - +new Date(articleData.time) > 9.46707779 * 10 ** 10) {
    result = false;
    // console.log('时间验证失败');
  }

  if (!option.a && $("a").length) {
    result = false;
    // console.log('超链接验证失败');
  }

  //设置了关键词但是没有
  if (option.keyword && !$.text().includes(option.keyword + "")) {
    result = false;
    // console.log('关键词验证失败');
  }

  //设置了违禁词并且包含
  if (option.prohibited && $.text().includes(option.prohibited + "")) {
    result = false;
    // console.log('禁用词验证失败');
  }
  return result;
}

export default qualified;
