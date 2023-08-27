import Router from "@koa/router";
import DB from "@/db";
let router = new Router();

router.get("/sitemap", async ctx => {
  await DB.Article.findAndCountAll({
    where: { state: 1 },
    attributes: ["id"],
    raw: true,
  }).then(({ count }) => {
    ctx.body = {
      success: true,
      message: "获取sitemap列表",
      data: new Array(Math.ceil(count / 1000)).fill(null).map((_, index) => ({
        href: `${process.env.CLIENT_HOST}/sitemap/index${index + 1}.xml`,
      })),
    };
  });
});
export default router;
