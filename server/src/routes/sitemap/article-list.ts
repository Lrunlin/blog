import Router from "@koa/router";
import DB from "@/db";
import moment from "moment";
import integer from "@/common/verify/integer";

let router = new Router();

router.get("/sitemap/list/:index", integer([], ["index"]), async (ctx) => {
  let index = +ctx.params.index as number;

  if (index < 1) {
    return;
  }

  let limit = 1000;
  await DB.Article.findAll({
    where: { state: 1 },
    offset: (index - 1) * limit,
    limit: limit,
    attributes: ["id", "title"],
    order: [["id", "asc"]],
    raw: true,
  }).then((rows) => {
    ctx.body = {
      success: true,
      message: "获取sitemap文章列表",
      data: rows,
    };
  });
});
export default router;
