import { NoticeAttributes } from "@/db/models/notice";
import DB from "@/db";

// 转换 comment 类型的通知
async function switchNoticeArticleComment(data: NoticeAttributes) {
  //当前评论
  let commentData = await DB.Comment.findByPk(data.relation_id, {
    attributes: ["id", "reply", "user_id", "content", "article_id"],
    raw: true,
  });

  // 查询上级评论
  let replyCommentData = await DB.Comment.findByPk(commentData?.reply, {
    attributes: ["content"],
    raw: true,
  });

  if (!commentData) {
    throw "没有查询到指定文章";
  }

  //查询这两个评论的文章
  let articleData = await DB.Article.findByPk(commentData.article_id, {
    attributes: ["id", "title"],
    raw: true,
  });

  let userData = await DB.User.findByPk(commentData.user_id, {
    attributes: ["id", "name", "avatar_file_name", "avatar_url"],
  });
  return {
    ...data,
    label: {
      user_data: userData,
      article_data: articleData,
      comment_data: commentData,
      raply_comment: replyCommentData,
    },
  };
}
export default switchNoticeArticleComment;
