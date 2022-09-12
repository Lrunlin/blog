import Router from "@koa/router";
import DB from "@/db";
let router = new Router();

router.get("/comment/list/page/:page", async ctx => {
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
          list: rows,
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
