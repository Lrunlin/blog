import type { Transaction } from "sequelize/types";
import DB from "@/db";
import id from "@/common/utils/id";

/**
 * 采纳答案的事务处理
 * @params problem_id {number} 问题ID
 * @params t {Transaction} 创建的事务处理
 * @return {success:boolean,message:string} 结果以及提示信息
 */
async function transaction(problem_id: number, t: Transaction) {
  /** 获取所有关注问题的用户ID列表*/
  let followList = await DB.Follow.findAll({
    where: { type: "problem", belong_id: problem_id },
    attributes: ["user_id"],
    raw: true,
    transaction: t,
  })
    .then(rows => rows.map(item => item.user_id))
    .catch(() => false as false);
  if (!followList) return false;

  /** 防止之前采纳过其他答案先尝试删除原来的通知*/
  let deleteNoticeResult = await DB.Notice.destroy({
    where: {
      type: "follow_problem",
      relation_id: problem_id,
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);
  if (!deleteNoticeResult) return false;

  /** 创建通知:通知关注问题的用户*/
  let createNoticeResult = await DB.Notice.bulkCreate(
    followList.map(item => ({
      id: id(),
      type: "follow_problem",
      is_read: 0,
      relation_id: problem_id,
      create_time: new Date(),
      user_id: item,
    })),
    { transaction: t }
  )
    .then(() => true)
    .catch(() => false);
  return createNoticeResult;
}

export default transaction;
