import { NoticeAttributes } from "@/db/models/notice";
import DB from "@/db";

// 转换 article-comment 类型的通知
async function switchNoticeArticleComment(data: NoticeAttributes) {
  // 先查询评论
  let commentData = await DB.Comment.findByPk(data.relation_id, {
    attributes: ["id", "user_id", "belong_id", "content"],
    raw: true,
  });

  if (!commentData) {
    throw "评论信息查询错误";
  }

  return await Promise.all([
    DB.User.findByPk(commentData.user_id, {
      attributes: ["id", "name", "avatar_file_name", "avatar_url"],
    })
      .then(row => row)
      .catch(() => {
        throw "用户信息查询错误";
      }),
    DB.Article.findByPk(commentData.belong_id, {
      attributes: ["id", "title", "create_time"],
      raw: true,
    })
      .then(row => row)
      .catch(() => {
        throw "文章信息查询错误";
      }),
  ])
    .then(row => {
      return {
        ...data,
        label: {
          user_data: row[0],
          article_data: row[1],
          comment_data: { id: commentData?.id, content: commentData?.content },
        },
      };
    })
    .catch(() => {
      throw "promise all查询错误";
    });
}
export default switchNoticeArticleComment;
