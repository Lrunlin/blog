import Router from "@koa/router";
import DB from "@/db";

let router = new Router();

router.get("/advertisement", async ctx => {
  let option = ctx.header.isadmin
    ? {
        order: [["indexes", "asc"]],
      }
    : {
        where: {
          position: ctx.query.position,
        },
        order: [["indexes", "asc"]],
        attributes: ["id", "poster_file_name", "poster_url", "url"],
      };

  await DB.Advertisement.findAll(option as any).then(rows => {
    ctx.body = { success: true, message: "查询推广内容", data: rows };
  });
});
export default router;
