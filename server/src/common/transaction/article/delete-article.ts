import type { Transaction } from "sequelize/types";
import DB from "@/db";
/**
 * 删除文章进行的事务处理
 * @params id {number} 被删除文章的ID
 * @return {boolean} 结果
 */
async function transaction(id: number, t: Transaction) {
  // 该文章下的评论列表
  let commentList = await DB.Comment.findAll({
    where: { belong_id: id },
    attributes: ["id"],
    raw: true,
  })
    .then(rows => rows.map(item => item.id))
    .catch(() => false as false);

  // 删除文章下评论的通知
  let deleteCommentNotice = await DB.Notice.destroy({
    where: {
      relation_id: commentList,
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);

  //删除文章创建的通知
  let deleteArticleNotice = await DB.Notice.destroy({
    where: {
      relation_id: id,
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);

  // 删除收藏
  let deleteCollection = await DB.Collection.destroy({
    where: {
      belong_id: id,
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);

  //删除点赞记录
  let deleteLikes = await DB.Likes.destroy({
    where: {
      belong_id: id,
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);

  //删除评论
  let deleteComment = await DB.Comment.destroy({
    where: {
      belong_id: id,
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);

  /** 删除文章推荐列表中的记录*/
  let deleteResult = await DB.Recommend.destroy({ where: { id }, transaction: t })
    .then(() => true)
    .catch(() => false);

  return (
    deleteCollection &&
    deleteComment &&
    deleteArticleNotice &&
    commentList &&
    deleteCommentNotice &&
    deleteLikes &&
    deleteResult
  );
}

export default transaction;
