import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import { Op, where } from "sequelize";
import typeCache from "@/common/modules/cache/type";

let router = new Router();

router.get("/statistics/visualization", auth(), async ctx => {
  /** 文章总数*/
  let articleCount = DB.Article.findAndCountAll({ attributes: ["id"] }).then(({ count }) => count);
  /** 原创文章总数*/
  let articleReprintCount = DB.Article.findAndCountAll({
    attributes: ["id"],
    where: { reprint: { [Op.not]: null } as any },
  }).then(({ count }) => count);
  //查询管理员ID
  let adminData = await DB.Article.findAll({
    attributes: ["id"],
    where: { state: 1 },
  })
    .then(rows => rows.map(item => item.toJSON().id))
    .catch(() => []);
  /** 管理员发布的原创文章数量*/
  let adminNotReprintCount = DB.Article.findAndCountAll({
    attributes: ["id"],
    where: { reprint: { [Op.not]: null } as any, author: adminData },
  }).then(({ count }) => count);

  /** 类型总数*/
  let typeCount = (typeCache.get("type") as any[]).length;
  /** 标签总数*/
  let tagCount = (typeCache.get<any[]>("tag") as any[]).length;

  /** 普通用户数量*/
  let userCount = DB.User.findAndCountAll({
    attributes: ["id"],
    where: { state: { [Op.not]: 1 } as any },
  }).then(({ count }) => count);

  let links = DB.Links.findAndCountAll({ attributes: ["state"] }).then(({ rows }) => {
    ({
      total: rows.reduce((total, item) => (item.toJSON().state == 1 ? ++total : total), 0),
      apply: rows.reduce((total, item) => (item.toJSON().state == 0 ? ++total : total), 0),
    });
  });

  await Promise.all([articleCount, articleReprintCount, adminNotReprintCount, userCount, links])
    .then(data => {
      ctx.body = {
        success: true,
        message: "查询首页内容统计信息",
        data: {
          article: {
            total: data[0],
            article_reprint_count: data[1],
            admin_not_reprint_article_count: data[2],
          },
          type: {
            type_count: typeCount,
            tag_count: tagCount,
          },
          user: {
            total: data[3],
          },
          links: data[4],
        },
      };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: "查询失败",
      };
    });
});
export default router;
