import DB from "@/db";
import type { Transaction } from "sequelize/types";
import user from "./user";
import problem from "./problem";

let map = {
  user,
  problem,
};

/** 取消关注时的事务处理 */
async function transaction(belong_id: number, user_id: number, t: Transaction) {
  /** 获取follow的type属性*/
  let type = await DB.Follow.findOne({
    where: {
      belong_id,
      user_id,
    },
  })
    .then(row => row?.type as keyof typeof map)
    .catch(() => false as false);
  if (!type) return;
  return map[type](belong_id, user_id, t);
}
export default transaction;
