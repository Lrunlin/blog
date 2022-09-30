import { Transaction } from "sequelize/types";
import DB from "@/db";
import { Op } from "sequelize";

async function transaction(id: number[], t: Transaction) {
  return await DB.Notice.destroy({
    where: {
      relation_id: id,
      type: { [Op.or]: ["comment", "article_comment"] },
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);
}
export default transaction;
