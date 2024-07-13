import Router from "@koa/router";
import DB from "@/db";
import integer from "@/common/verify/integer";

let router = new Router();

router.get(
  "/sitemap/list/:type/:index",
  integer([], ["index"]),
  async (ctx) => {
    let index = +ctx.params.index as number;
    let type = ctx.params.type as "article" | "problem";

    if (index < 1 || !["article", "problem"].includes(type)) {
      ctx.status = 401;
      return;
    }

    let limit = 1000;
    let rows =
      type == "article"
        ? await DB.Article.findAll({
            where: { state: 1 },
            offset: (index - 1) * limit,
            limit: limit,
            attributes: ["id", "title"],
            order: [["id", "asc"]],
            raw: true,
          })
        : await DB.Problem.findAll({
            offset: (index - 1) * limit,
            limit: limit,
            attributes: ["id", "title"],
            order: [["id", "asc"]],
            raw: true,
          });

    ctx.body = {
      success: true,
      message: "获取sitemap文章列表",
      data: rows,
    };
  },
);
export default router;
