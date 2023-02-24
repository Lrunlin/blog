import Router from "@koa/router";
import DB from "@/db";
import integer from "@/common/verify/integer";
import authMiddleware from "@/common/middleware/auth";
import switchList from "@/common/modules/notice";

let router = new Router();
router.get("/notice/list/notice", integer(["page"]), authMiddleware(0), async ctx => {
  let page = +(ctx.query.page as string);
  let data = await DB.Notice.findAndCountAll({
    where: {
      user_id: ctx.id,
    },
    order: [
      ["is_read", "asc"],
      ["create_time", "desc"],
    ],
    offset: (page - 1) * 10,
    limit: 10,
    raw: true,
  })
    .then(async ({ count, rows }) => {
      return { total: count, list: await switchList(rows) };
    })
    .catch(err => {
      console.log(err);
      return null;
    });
  ctx.body = { success: !!data, message: data ? "查询成功" : "查询失败", data: data };
});
export default router;
