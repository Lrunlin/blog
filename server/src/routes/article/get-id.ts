import Router from "@koa/router";
import DB from "@/db";
import expand from "@/utils/article/expand";
import cache from '@/common/middleware/cache';


let router = new Router();

router.get("/article/:id",cache, async ctx => {
  let id = +ctx.params.id;

  await DB.Article.findByPk(id, {
    include: [
      {
        model: DB.User,
        as: "author_data",
        attributes: ["id", "name", "auth", "avatar_url"],
      },
    ],
    attributes: {
      exclude: ["author"],
    },
  })
    .then(row => {
      if (row) {
        ctx.body = { success: true, message: "查询成功", data: expand(row.toJSON()) };
      } else {
        ctx.body = { success: false, message: "没有找到对应的文章", data: [] };
      }
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "查询失败" };
      console.log(err);
    });
});
export default router;
