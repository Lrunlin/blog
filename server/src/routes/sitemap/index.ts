import Router from "@koa/router";
import DB from "@/db";

let router = new Router();

router.get("/sitemap/:type", async (ctx) => {
  let type = ctx.params.type as "article" | "problem";
  if (!["article", "problem"].includes(type)) {
    ctx.status = 401;
    return;
  }

  let count =
    type == "article"
      ? await DB.Article.count({
          where: { state: 1 },
          attributes: ["id"],
        })
      : await DB.Problem.count({
          attributes: ["id"],
        });

  ctx.body = {
    success: true,
    message: "获取sitemap列表",
    data: new Array(Math.ceil(count / 1000)).fill(null).map((_, index) => ({
      href: `${process.env.CLIENT_HOST}/sitemap/${type}/index${index + 1}.xml`,
    })),
  };
});
export default router;
