import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import { Op } from "sequelize";
import typeCache from "@/common/modules/cache/type";
import redis from "@/common/utils/redis";

let router = new Router();

router.get("/statistics/visualization", auth(), async ctx => {
  let history = JSON.parse((await redis.get("visualization-history")) as string);
  let systemOccupation = JSON.parse((await redis.get("visualization-load")) as string);

  let adminID = (await DB.User.findAll({ where: { auth: 1 }, attributes: ["id"], raw: true })
    .then(rows => rows.map(item => item.id))
    .catch(() => [])) as number[];

  /** 管理员发布的原创文章数量*/
  let adminNotReprintCount = await DB.Article.findAndCountAll({
    attributes: ["id"],
    raw: true,
    where: { reprint: { [Op.is]: null } as any, author: adminID },
  })
    .then(({ count }) => count)
    .catch(() => 0);

  /** 管理员发布的转载文章数量*/
  let adminReprintCount = await DB.Article.findAndCountAll({
    attributes: ["id"],
    raw: true,
    where: { reprint: { [Op.not]: null } as any, author: adminID },
  })
    .then(({ count }) => count)
    .catch(() => 0);

  /** 用户原创文章*/
  let userNotReprintCount = await DB.Article.findAndCountAll({
    attributes: ["id"],
    raw: true,
    where: { reprint: { [Op.is]: null } as any, author: { [Op.not]: adminID } },
  })
    .then(({ count }) => count)
    .catch(() => 0);

  /** 用户转载文章*/
  let userReprintCount = await DB.Article.findAndCountAll({
    attributes: ["id"],
    raw: true,
    where: { reprint: { [Op.not]: null } as any, author: { [Op.not]: adminID } },
  })
    .then(({ count }) => count)
    .catch(() => 0);

  /** 类型总数*/
  let typeCount = (typeCache.get("type") as any[]).length;
  /** 标签总数*/
  let tagCount = (typeCache.get("tag") as any[]).length;

  /** 普通用户数量*/
  let userCount = await DB.User.findAndCountAll({
    attributes: ["id"],
    raw: true,
    where: { id: { [Op.not]: adminID } },
  })
    .then(({ count }) => count)
    .catch(() => null);

  let link = await DB.FriendlyLink.findAndCountAll({
    attributes: ["id"],
    raw: true,
    where: { state: 1 },
  })
    .then(({ count }) => count)
    .catch(() => null);

  ctx.body = {
    success: true,
    message: "大屏页面统计信息",
    data: {
      article: {
        admin_reprint_count: adminReprintCount,
        admin_not_reprint_count: adminNotReprintCount,
        user_reprint_count: userReprintCount,
        user_not_reprint_count: userNotReprintCount,
      },
      type: {
        type_count: typeCount,
        tag_count: tagCount,
      },
      user: {
        user_count: userCount,
      },
      link: {
        link_count: link,
      },
      visits: history.visits,
      article_ranking: history.articleRanking,
      system_occupation: systemOccupation,
      referer: history.referer,
    },
  };
});
export default router;
