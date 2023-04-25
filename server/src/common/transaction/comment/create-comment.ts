import type { Transaction } from "sequelize/types";
import DB from "@/db";
import id from "@/common/utils/id";
import map from "@/common/utils/map";

/**
 * 删除评论进行的事务处理
 * @params comment_id {number} 新创建评论的ID
 * @params reply {number} 上级评论的ID
 * @params t {Transaction} 创建的事务处理
 * @return {success:boolean,message:string} 结果以及提示信息
 */
async function transaction(
  comment_id: number,
  reply: number | null,
  user_id: number,
  belong_id: number,
  type: "article" | "problem" | "answer",
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

    if (!replyCommentData) return { success: false, message: "没有找到上级评论" }; // 没有查找到就返回false
    if (replyCommentData.user_id == user_id) return { success: true, message: "上级评论为自己" }; //自己评论自己就直接返回true，不在创建通知

    let result = await DB.Notice.create(
      {
        id: id(),
        user_id: replyCommentData.user_id /**通知被评论的用户**/,
        relation_id: comment_id,
        type: `comment_${type}_reply`,
        is_read: 0,
        create_time: new Date(),
      },
      { transaction: t }
    ).catch(() => false as false);
    return { success: !!result, message: result ? "通知创建成功" : "通知创建失败" };
  } else {
    //用于通知文章作者文章被评论
    let articleData = await map(type, ["author"]).db(belong_id);

    if (!articleData) return { success: false, message: "创建通知时没有找到对应的作者" };
    if (articleData.author == user_id) return { success: true, message: "本人评论无需创建通知" };
    let result = await DB.Notice.create(
      {
        id: id(),
        user_id: articleData.author /**通知作者**/,
        relation_id: comment_id,
        type: `comment_${type}`,
        is_read: 0,
        create_time: new Date(),
      },
      { transaction: t }
    ).catch(() => false as false);
    return { success: !!result, message: result ? "通知创建成功" : "通知创建失败" };
  }
}

export default transaction;
