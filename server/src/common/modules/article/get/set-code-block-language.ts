import { load } from "cheerio";


/**
 * todo 为文章表设置language字段，用来判断代码块使用到了哪些语言
 * TODO 并且设置代码高亮使用的插件
 * ?用于用户查询时
 */
function getCodeBlockLanguage(content: string) {
  let $ = load(content);
  let languages: string[] = [];
  $("pre").each((_, el) => {
    /**获取pre和code的class转为数组*/
    let allClassNames = `${$(el).attr("class")} ${$(el)
      .children("code")
      .eq(0)
      .attr("class")}`.split(" ");
    let hasClassNames = allClassNames.find(item => item.includes("language-"));
    let language = hasClassNames ? hasClassNames.replace("language-", "") : false;
    if (language) {
      if (!languages.includes(language)) languages.push(language);
    }

    // 开启代码行数的显示
    $(el).addClass("line-numbers");
  });
  return {
    content: $("body").html() as string,
    language: languages.length ? languages : null,
  };
}
export default getCodeBlockLanguage;
