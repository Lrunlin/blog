import type { Transaction } from "sequelize/types";
import DB from "@/db";

/**
 * 删除问题的事务处理
 * @params problem_id {number} 问题ID
 * @params t {Transaction} 创建的事务处理
 * @return {boolean} 结果
 */
async function transaction(problem_id: number, t: Transaction) {
  /** 获取问题下全部答案*/
  let answerList = await DB.Answer.findAll({
    where: { problem_id },
    raw: true,
    attributes: ["id"],
  })
    .then(rows => rows.map(item => item.id))
    .catch(() => false as false);
  if (!answerList) return false;

  /** 获取问题和答案的全部评论*/
  let commentList = await DB.Comment.findAll({
    attributes: ["id"],
    where: {
      belong_id: [...answerList, problem_id],
    },
  })
    .then(rows => rows.map(item => item.id))
    .catch(() => false as false);
  if (!commentList) return false;

  /** 删除问题和答案引起的所有通知*/
  let deleteNoticeAnswer = await DB.Notice.destroy({
    where: {
      relation_id: [...answerList, problem_id],
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);
  if (!deleteNoticeAnswer) return false;

  /** 删除评论*/
  let deleteCommentResult = await DB.Comment.destroy({
    where: { id: commentList },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);
  if (!deleteCommentResult) return false;

  /** 删除答案*/
  let answerDeleteResult = await DB.Answer.destroy({ where: { problem_id }, transaction: t })
    .then(() => true)
    .catch(() => false);
  if (!answerDeleteResult) return false;

  /** 删除收藏*/
  let deleteCollectionRedult = await DB.Collection.destroy({
    where: {
      belong_id: problem_id,
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);
  if (!deleteCollectionRedult) return false;
  /** 删除点赞(问题和答案)*/
  let deleteLikeRedult = await DB.Likes.destroy({
    where: {
      belong_id: [...answerList, problem_id],
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);
  if (!deleteLikeRedult) return false;
  return true;
}
export default transaction;
