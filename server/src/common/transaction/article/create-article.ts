import DB from "@/db";
import useID from "@/common/hooks/useId";
import { Transaction } from "sequelize/types";

/** 创建文章发布的事务处理*/
async function transaction(article_id: number, author_id:number, t: Transaction) {
  //   获取粉丝列表
  let funsList = await DB.Follow.findAll({
    where: {
      blogger_id: author_id,
    },
    attributes: ["user_id"],
    raw: true,
    transaction: t,
  });
  
  //   批量添加
  let data = funsList.map((item: any) => ({
    id: useID(),
    user_id: item.user_id,
    relation_id: article_id,
    type: "article",
    is_read: 0,
    create_time: new Date(),
  }));

  let result = await DB.Notice.bulkCreate(data, { transaction: t })
    .then(() => true)
    .catch(() => false);
  return result;
}
export default transaction;
