import Router from "@koa/router";
import DB from "@/db";
import interger from "@/common/verify/integer";
import { load } from "cheerio";

let router = new Router();

/** 管理系统查询评论*/
router.get("/comment/list/page/:page", interger([], ["page"]), async ctx => {
  let page = +ctx.params.page;

  await DB.Comment.findAndCountAll({
    offset: (page - 1) * 10,
    limit: 10,
    include: [
      {
        model: DB.User,
        as: "user_data",
        attributes: ["id", "name", "auth", "avatar_file_name", "avatar_url"],
      },
    ],
    order: [["create_time", "desc"]],
  })
    .then(({ count, rows }) => {
      ctx.body = {
        success: true,
        message: `查询评论`,
        data: {
          list: rows.map(item => {
            let $ = load(item.content);
            return { ...item.toJSON(), content: $("body").text() };
          }),
          total: count,
        },
      };
    })
    .catch(() => {
      ctx.body = {
        success: false,
        message: `查询失败`,
      };
    });
});
export default router;
