import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";
import { Op } from "sequelize";
import qs from "qs";
import getTagData from "@/common/modules/article/get/set-tag-data";

let router = new Router();

/** 管理系统搜索*/
router.get("/article/page/:page", interger([], ["page"]), auth(), async ctx => {
  let page = +ctx.params.page;

  let query = qs.parse(ctx.querystring);

  let pageSize = query.page_size ? +query.page_size : 10;
  let where: { [key: string]: any } = {};

  if (query.id) {
    where.id = +query.id;
  }

  if (query.deadline) {
    where.create_time = {
      [Op.gte]: new Date(query.deadline as any),
    };
  }

  if (query.article_id) {
    where.id = (query.article_id as string).replace(/ /g, "");
  }

  if (query.author_id) {
    where.author = query.author_id;
  }

  if (query.only_original == "true") {
    where.reprint = {
      [Op.is]: null,
    };
  }

  await DB.Article.findAndCountAll({
    where: where,
    offset: (page - 1) * 10,
    limit: pageSize,
    include: [
      {
        model: DB.User,
        as: "author_data",
        attributes: ["id", "name", "auth", "avatar_file_name", "avatar_url"],
      },
    ],
    attributes: {
      exclude: ["author"],
    },
    order: [(query?.sort as [string, string] | undefined) || ["create_time", "desc"]],
  })
    .then(({ count, rows }) => {
      ctx.body = {
        success: true,
        message: `分页查询查询,第${page}页,每页${pageSize}`,
        data: {
          page: page,
          page_size: pageSize,
          total_count: count,
          list: rows.map(item => ({
            ...item.toJSON(),
            tag: getTagData(item.toJSON().tag as unknown as number[]),
            content: undefined,
          })),
        },
      };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "查询失败" };
      console.log(err);
    });
});
export default router;
