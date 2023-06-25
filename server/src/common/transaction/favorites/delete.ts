import DB from "@/db";
import sequelize from "@/db/config";
import type { Transaction } from "sequelize/types";

/** 删除favorites_id为空的收藏夹 */
async function transaction(t: Transaction) {
  // 先置换，然后将置换后的收藏删掉

  /** 判断是否有收藏集ID为空的数据、删掉*/
  const deleteEmpty = await DB.Collection.destroy({
    where: sequelize.where(sequelize.fn("TRIM", sequelize.col("favorites_id")), ""),
    transaction: t,
  })
    .then(() => true)
    .catch(err => {
      console.log(err);
      return false;
    });
  return deleteEmpty;
}

export default transaction;
