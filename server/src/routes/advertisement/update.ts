import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";
import verify from "@/common/verify/api-verify/advertisement/create-update";

let router = new Router();

router.put("/advertisement/:id",verify, interger([], ["id"]), auth(), async ctx => {
  let { poster_file_name, url, indexes, position } = ctx.request.body;

  await DB.Advertisement.update(
    {
      poster_file_name: poster_file_name,
      url: url,
      indexes: indexes,
      position: position,
      create_time: new Date(),
    },
    {
      where: {
        id: ctx.params.id,
      },
    }
  )
    .then(res => {
      if (res[0]) {
        ctx.body = { success: true, message: "修改成功" };
      } else {
        ctx.body = { success: false, message: "修改失败" };
      }
    })
    .catch(err => {
      ctx.body = { success: false, message: "修改失败" };
      console.log(err);
    });
});
export default router;
