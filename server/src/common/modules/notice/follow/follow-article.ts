import type { NoticeAttributes } from "@/db/models/notice";
import DB from "@/db";

// 转换 follow-article 类型的通知
async function switchNoticeFollowProblem(data: NoticeAttributes) {
  /** 查询文章数据*/
  let articleData = await DB.Article.findByPk(data.relation_id, {
    attributes: ["id", "author", "title"],
    raw: true,
  })
    .then(row => row)
    .catch(err => {
      return false as false;
    });

  if (!articleData) return false;

  let userData = await DB.User.findByPk(articleData.author, {
    attributes: ["id", "name", "avatar_file_name", "avatar_url"],
  });

  return {
    ...data,
    label: {
      type: "article",
      user_data: userData,
      content_data: articleData,
    },
  };
}
export default switchNoticeFollowProblem;
