import { NoticeAttributes } from "@/db/models/notice";
import DB from "@/db";

// 转换 article 类型的通知
async function switchNoticeArticleComment(data: NoticeAttributes) {
  // 先查询评论
  let articletData = await DB.Article.findByPk(data.relation_id, {
    attributes: ["id", "author", "title"],
    raw: true,
  });

  if (!articletData) {
    throw "没有查询到指定文章";
  }
 return await DB.User.findByPk(articletData.author, {
   attributes: ["id", "name", "avatar_file_name", "avatar_url"],
 })
   .then(row => ({ ...data, label: { user_data: row, article_data: articletData } }))
   .catch(() => {
     throw "用户信息查询错误";
   });
}
export default switchNoticeArticleComment;
