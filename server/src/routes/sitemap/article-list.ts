import Router from "@koa/router";
import DB from "@/db";
import moment from "moment";
import integer from "@/common/verify/integer";
let router = new Router();

router.get("/sitemap/:index", integer([], ["index"]), async ctx => {
  let index = +ctx.params.index as number;
  let limit = 1000;
  await DB.Article.findAll({
    where: { state: 1 },
    offset: (index - 1) * limit,
    limit: limit,
    attributes: ["id", "create_time"],
    order: [["id", "asc"]],
    raw: true,
  }).then(rows => {
    let list = rows.map(item => ({
      href: `${process.env.CLIENT_HOST}/article/${item.id}`,
      priority: 0.9,
      create_time: moment(item.create_time).format("YYYY-MM-DD"),
    }));

    if (index == 1) {
      list.unshift({
        href: process.env.CLIENT_HOST as string,
        priority: 1,
        create_time: moment().format("YYYY-MM-DD"),
      });
    }

    ctx.body = {
      success: true,
      message: "获取sitemap文章列表",
      data: list,
    };
  });
});
export default router;
