import Router from "@koa/router";
import DB from "@/db";
import moment from "moment";
import integer from "@/common/verify/integer";

let router = new Router();

router.get(
  ["/sitemap/article/:index", "/sitemap/problem/:index"],
  integer([], ["index"]),
  async (ctx) => {
    const match = ctx.path.match(/^\/sitemap\/(\w+)\//);
    if (!match || !["article", "problem"].includes(match[1])) {
      ctx.status = 401;
      return;
    }
    let type = match[1] as "article" | "problem";

    let index = +ctx.params.index as number;

    let limit = 1000;
    let rows =
      type == "article"
        ? await DB.Article.findAll({
            where: { state: 1 },
            offset: (index - 1) * limit,
            limit: limit,
            attributes: ["id", "create_time"],
            order: [["id", "asc"]],
            raw: true,
          })
        : await DB.Problem.findAll({
            offset: (index - 1) * limit,
            limit: limit,
            attributes: ["id", "create_time"],
            order: [["id", "asc"]],
            raw: true,
          });

    let list = rows.map((item) => ({
      href: `${process.env.CLIENT_HOST}/${type}/${item.id}`,
      priority: 0.9,
      create_time: moment(item.create_time).format("YYYY-MM-DD"),
    }));

    ctx.body = {
      success: true,
      message: "获取sitemap文章列表",
      data: list,
    };
  },
);
export default router;
