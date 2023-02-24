import type { NoticeAttributes } from "@/db/models/notice";
import DB from "@/db";
import { load } from "cheerio";
import Sequelize from "@/db/config";
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
    Sequelize.query(
      `select id,title from problem where id in (select problem_id from answer where id=${commentData.belong_id} );`
    ),
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
          content_data: row[1][0][0],
          type: commentData?.type,
          comment_data: {
            id: commentData?.id,
            content: commentData?.content,
            reply: row[2],
          },
        },
      };
    })
    .catch(err => {
      console.log("promise all查询错误");
      return [];
    });
}
export default switchNoticeCommentArticle;
