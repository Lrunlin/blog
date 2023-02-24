import type { NoticeAttributes } from "@/db/models/notice";
import DB from "@/db";
import { load } from "cheerio";
import { CommentAttributes } from "@/db/models/comment";

// 转换 comment_article 类型的通知
async function switchNoticeCommentArticle(data: NoticeAttributes) {
  // 先查询评论
  let commentData = (await DB.Comment.findByPk(data.relation_id, {
    attributes: ["id", "user_id", "belong_id", "content", "type", "reply"],
    raw: true,
  })
    .then(row => {
      if (row) {
        let $ = load(row.content);
        return Object.assign(row, {
          content: $("body").text().trim(),
        });
      } else {
        return false as false;
      }
    })
    .catch(() => false as false)) as CommentAttributes;

  if (!commentData) {
    return false;
  }

  return await Promise.all([
    DB.User.findByPk(commentData.user_id, {
      attributes: ["id", "name", "avatar_file_name", "avatar_url"],
    })
      .then(row => row)
      .catch(() => {
        console.log("用户信息查询错误");
        return {};
      }),
    DB.Article.findByPk(commentData.belong_id, {
      attributes: ["id", "title"],
      raw: true,
    })
      .then(row => row)
      .catch(() => {
        console.log("文章信息查询错误");
        return {};
      }),
    commentData.reply
      ? DB.Comment.findByPk(commentData.reply, {
          attributes: ["content"],
          raw: true,
        })
          .then(row => {
            if (row) {
              let $ = load(row.content);
              return { content: $("body").text().trim() };
            } else {
              return null;
            }
          })
          .catch(() => {
            console.log("评论查询错误");
            return {};
          })
      : null,
  ])
    .then(row => {
      return {
        ...data,
        label: {
          user_data: row[0],
          content_data: row[1],
          type: commentData?.type,
          comment_data: {
            id: commentData?.id,
            content: commentData?.content,
            reply: row[2],
          },
        },
      };
    })
    .catch(() => {
      console.log("promise all查询错误");
      return [];
    });
}
export default switchNoticeCommentArticle;
