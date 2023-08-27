import Router from "@koa/router";
let router = new Router();
import DB from "@/db";
import authMiddleware from "@/common/middleware/auth";
import interger from "@/common/verify/integer";
import imgPrefix from "@/common/modules/article/get/img-add-prefix";

// 查询信息以用于修改问题
router.get("/problem/update/:id", authMiddleware(0), interger([], ["id"]), async ctx => {
  await DB.Problem.findByPk(ctx.params.id, { attributes: ["tag", "title", "content"] })
    .then(row => {
      if (row) {
        ctx.body = {
          success: true,
          message: "查询成功",
          data: {
            ...row.toJSON(),
            content: imgPrefix(row.toJSON().content, "problem"),
          },
        };
      } else {
        ctx.status = 404;
        ctx.body = { success: true, message: "查询失败" };
      }
    })
    .catch(err => {
      console.log(err);
      ctx.status = 500;
      ctx.body = { success: true, message: "查询失败" };
    });
});
export default router;
