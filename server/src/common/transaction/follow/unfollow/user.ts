import DB from "@/db";
import type { Transaction } from "sequelize/types";
/** 删除关注时删除user类型*/
/** 获取用户发布的文章、删除follow_article通知*/
async function user(belong_id: number, user_id: number, t: Transaction) {

  /** 获取关注的用户发布的文章列表*/
  let articleList = await DB.Article.findAll({
    where: { author: belong_id },
    raw: true,
    attributes: ["id"],
  })
    .then(rows => rows.map(item => item.id))
    .catch(() => false as false);
  if (!articleList) return false;
  let deleteNoticeRedult = await DB.Notice.destroy({
    where: {
      relation_id: articleList,
      user_id,
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);
  return deleteNoticeRedult;
}
export default user;
