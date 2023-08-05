//更新文章推荐表
import DB from "@/db";
import { setArticleListWrite } from "@/common/modules/tasks/set-recommend-data";

export default async () => {
  // 只有在文章表有内容，但是推荐表没内容时才进行初始化
  Promise.all([DB.Article.count({ where: { state: 1 } }), DB.Recommend.count()]).then(async res => {
    if (res[0] && !res[1]) {
      setArticleListWrite();
    }
  });
  setInterval(() => {
    setArticleListWrite();
  }, 7_200_000);
};
