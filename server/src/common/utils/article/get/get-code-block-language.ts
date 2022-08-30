import type { ArticleAttributes } from "@/db/models/article";
import { load } from "cheerio";

/**
 * todo 为文章表设置language字段，用来判断代码块使用到了哪些语言
 * TODO 并且设置代码高亮使用的插件
 * ?用于用户查询时
 * @params article {Article} 文章数据
 * @return article {Article} 处理好的文章数据
 */
function getCodeBlockLanguage(article: ArticleAttributes) {
  let $ = load(article.content);
  let languages: string[] = [];
  $("pre").each((index, el) => {
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
  return { ...article, content: $("body").html(), language: languages.length ? languages : null };
}
export default getCodeBlockLanguage;
