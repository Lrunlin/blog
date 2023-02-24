import DB from "@/db";
import type { Transaction } from "sequelize/types";
import id from "@/common/utils/id";

/**
 * 发布答案时的事务处理
 * @params answer_id {number} 新建答案的ID
 * @params problem_id {number} 所属于哪个问题
 * @params t {object} 事务处理对象
 * @return result {t} 事务处理执行结果
 */
async function transaction(answer_id: number, problem_id: number, t: Transaction) {
  /** 获取对应问题的用户ID*/
  let problemUserData = await DB.Problem.findByPk(problem_id, { attributes: ["author"] })
    .then(row => row?.author)
    .catch(() => false as false);
  if (!problemUserData) return false;

  /** 对问题发起者进行通知*/
  let createNoticeResult = await DB.Notice.create(
    {
      id: id(),
      type: "answer",
      user_id: problemUserData,
      relation_id: answer_id,
      is_read: 0,
      create_time: new Date(),
    },
    {
      transaction: t,
    }
  )
    .then(() => true)
    .catch(err => {
      console.log(err);
      return false;
    });

  return createNoticeResult;
}
export default transaction;
