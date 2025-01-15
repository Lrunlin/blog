import DB from "@/db";
import type { Transaction } from "sequelize/types";
import id from "@/common/utils/id";

/** 创建文章发布的事务处理*/
async function transaction(
  article_id: number,
  author_id: number,
  tag: number[],
  createNotice: boolean,
  t: Transaction,
) {
  // 创建通知
  let noticeResult = true;
  if (createNotice) {
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
    let noticeData = funsList.map((item) => ({
      id: id(),
      user_id: item.user_id,
      relation_id: article_id,
      type: "follow_article",
      is_read: 0,
      create_time: new Date(),
    }));

    /** 创建通知*/
    noticeResult = await DB.Notice.bulkCreate(noticeData, {
      transaction: t,
    })
      .then(() => true)
      .catch(() => false);
  }

  /** 创建文章标签数组 */
  let articleTagData = tag.map((item) => ({
    id: id(),
    belong_id: article_id,
    type: "article",
    tag_id: item,
  }));

  /** 先删除该文章的全部标签*/
  let articleTagDeleteResult = await DB.ArticleTag.destroy({
    where: { belong_id: article_id },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);

  /** 创建文章标签和文章的绑定*/
  let articleTagResult = await DB.ArticleTag.bulkCreate(articleTagData, {
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);

  return noticeResult && articleTagDeleteResult && articleTagResult;
}
export default transaction;
