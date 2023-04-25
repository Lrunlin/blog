import DB from "@/db";
import id from "@/common/utils/id";
import type { Transaction } from "sequelize/types";

/** 创建文章发布的事务处理*/
async function transaction(article_id: number, author_id: number, t: Transaction) {
  /** 获取粉丝列表*/
  let funsList = await DB.Follow.findAll({
    where: {
      belong_id: author_id,
      type: "user",
    },
    attributes: ["user_id"],
    raw: true,
    transaction: t,
  });

  /** 生成批量创建通知的数据数组*/
  let data = funsList.map(item => ({
    id: id(),
    user_id: item.user_id,
    relation_id: article_id,
    type: "follow_article",
    is_read: 0,
    create_time: new Date(),
  }));

  /** 创建*/
  let result = await DB.Notice.bulkCreate(data, { transaction: t })
    .then(() => true)
    .catch(() => false);
  return result;
}
export default transaction;
