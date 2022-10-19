import Router from "@koa/router";
import DB from "@/db";
import moment from "moment";
let router = new Router();

router.get("/sitemap", async ctx => {
  await DB.Article.findAndCountAll({
    where: { state: 1 },
    attributes: ["id"],
    raw: true,
  }).then(({ count }) => {
    let list = new Array(Math.ceil(count / 1000)).fill(null).map((_, index) => ({
      href: `${process.env.CLIENT_HOST}/sitemap/index${index + 1}.xml`,
      priority: 1,
      create_time: moment().format("YYYY-MM-DD"),
    }));
    list.unshift({
      href: process.env.CLIENT_HOST as string,
      priority: 1,
      create_time: moment().format("YYYY-MM-DD"),
    });
    ctx.body = {
      success: true,
      message: "获取sitemap",
      data: list,
    };
  });
});
export default router;
