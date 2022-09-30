import { NoticeAttributes } from "@/db/models/notice";
import switchNoticeArticleComment from "./article-comment";
import switchNoticeArticle from "./article";
import switchNoticeComment from "./comment";

let _switch = {
  article_comment: switchNoticeArticleComment,
  article: switchNoticeArticle,
  comment: switchNoticeComment,
};

/**
 * 将数据库中查询的通知数据转为用户端使用的数据
 * @params data {Notice[]} 通知数据
 */
function switchList(data: NoticeAttributes[]) {
  // 对应三个类型生成一个数组，然后promise.all
  return Promise.all(data.map(item => _switch[item.type as keyof typeof _switch](item)))
    .then(rows => {
      return rows;
    })
    .catch(() => {
      return [];
    });
}
export default switchList;
