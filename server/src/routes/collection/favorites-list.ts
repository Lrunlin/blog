import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";
import Router from "@koa/router";
import DB from "@/db";

let router = new Router();

// 获取文章被哪些收藏集收藏了
router.get("/collection/favorites/:belong_id", interger([], ["belong_id"]), auth(0), async ctx => {
  await DB.Collection.findOne({
    where: {
      belong_id: ctx.params.belong_id,
      user_id: ctx.id,
    },
    attributes: ["favorites_id"],
  })
    .then(row => {
      if (row) {
        ctx.body = {
          success: true,
          message: "查询文章被哪些收藏集收藏了",
          data: row.favorites_id,
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          success: false,
          message: "文章没有被收藏",
        };
      }
    })
    .catch(err => {
      console.log(err);
      ctx.status = 500;
      ctx.body = { success: false, message: "查询失败" };
    });
});
export default router;
