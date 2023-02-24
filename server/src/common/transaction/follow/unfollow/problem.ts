import DB from "@/db";
import type { Transaction } from "sequelize/types";
/** 删除关注时删除problem类型*/
/** 删除所有该问题对本用户引起的通知*/
async function problem(belong_id: number, user_id: number, t: Transaction) {
  let deleteNoticeRedult = await DB.Notice.destroy({
    where: {
      relation_id: belong_id,
      user_id,
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);

  return deleteNoticeRedult;
}
export default problem;
