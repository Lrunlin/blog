import { Transaction } from "sequelize/types";
import DB from "@/db";
import useID from "@/common/hooks/useId";

/**
 * 删除评论进行的事务处理
 * @params comment_id {number} 创建评论的ID
 * @params reply {number} 上级评论的ID
 * @params t {Transaction} 创建的事务处理
 * @return {boolean} 结果
 */
async function transaction(
  comment_id: number,
  reply: number | null,
  user_id: number,
  article_id: number,
  t: Transaction
) {
  // 是对于评论的回复
  if (reply) {
    // 根据该评论，获取上级评论的用户信息
    let replyCommentData = await DB.Comment.findOne({
      where: { id: reply },
      attributes: ["user_id"],
      raw: true,
      transaction: t,
    }).catch(() => false as false);

    if (!replyCommentData) return false; // 没有查找到就返回false
    if (replyCommentData.user_id == user_id) return true; //自己评论自己就直接返回true，不在创建通知

    let result = await DB.Notice.create(
      {
        id: useID(),
        user_id: replyCommentData.user_id /**通知被评论的用户**/,
        relation_id: comment_id,
        type: "comment",
        is_read: 0,
        create_time: new Date(),
      },
      { transaction: t }
    ).catch(() => false as false);
    return !!result;
  } else {
    //用于通知文章作者文章被评论
    let articleData = await DB.Article.findByPk(article_id, { attributes: ["author"], raw: true });
    if (!articleData) return false;
    if (articleData.author == user_id) return true;
    let result = await DB.Notice.create(
      {
        id: useID(),
        user_id: articleData.author /**通知文章作者**/,
        relation_id: comment_id,
        type: "article_comment",
        is_read: 0,
        create_time: new Date(),
      },
      { transaction: t }
    ).catch(() => false as false);
    return !!result;
  }
}

export default transaction;
