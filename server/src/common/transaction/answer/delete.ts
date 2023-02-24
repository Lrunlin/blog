import DB from "@/db";
import type { Transaction } from "sequelize/types";
import { Op } from "sequelize";
/** 删除答案时的事务处理 */
async function transaction(answer_id: string, t: Transaction) {
  /** 删除答案引发对问题发起者的通知*/
  let deleteNoticeResult = await DB.Notice.destroy({
    where: {
      relation_id: answer_id,
      type: "answer",
    },
    transaction: t,
  })
    .then(() => true)
    .catch(err => {
      console.log(err);
      return false;
    });
  if (!deleteNoticeResult) return false;

  /** 获取问题下的全部评论*/
  let commentList = await DB.Comment.findAll({
    where: {
      belong_id: answer_id,
      type: "answer",
    },
    attributes: ["id"],
  })
    .then(rows => rows.map(item => item.id))
    .catch(() => false as false);
  if (!commentList) return false;

  /** 删除所有评论引发的通知*/
  let deleteCommentResult = await DB.Notice.destroy({
    where: {
      relation_id: commentList,
      type: {
        [Op.like]: "comment_answer%",
      },
    },
    transaction: t,
  })
    .then(() => true)
    .catch(err => {
      console.log(err);
      return false;
    });
  if (!deleteCommentResult) return false;

  /** 删除答案下的所有评论*/
  let deleteComment = await DB.Comment.destroy({
    where: { id: commentList },
    transaction: t,
  })
    .then(res => true)
    .catch(() => false);
  if (!deleteComment) return false;

  /** 删除点赞信息*/
  let deleteLikesResult = await DB.Likes.destroy({
    where: {
      belong_id: answer_id,
      type: "answer",
    },
    transaction: t,
  })
    .then(() => true)
    .catch(err => {
      console.log(err);
      return false;
    });
  if (!deleteLikesResult) return false;

  /** 将answer_id为被删除ID的问题的采纳答案修改为null(如果有)*/
  let updateProblemAnswerId = await DB.Problem.update(
    {
      answer_id: null as any,
    },
    {
      where: { answer_id },
      transaction: t,
    }
  )
    .then(() => true)
    .catch(() => false);
  return updateProblemAnswerId;
}
export default transaction;
