import DB from "@/db";
import type { Transaction } from "sequelize/types";

async function transaction(id: number[], t: Transaction) {
  return await DB.Notice.destroy({
    where: {
      relation_id: id,
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);
}
export default transaction;
