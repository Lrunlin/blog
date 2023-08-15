import Router from "@koa/router";
import DB from "@/db";
import refreshUrls from "@/common/utils/static/refreshUrls";
import verify from "@/common/verify/api-verify/theme/update";

let router = new Router();

router.put("/theme/:id", verify, async ctx => {
  await DB.Theme.update(ctx.request.body, { where: { id: ctx.params.id } })
    .then(res => {
      ctx.body = { success: true, message: "修改成功" };
      // 清除掉缓存
      if (ctx.request.body.content && process.env.ENV == "production") {
        refreshUrls([`${process.env.CLIENT_CDN}/${ctx.params.id}.css`]).catch(err => {
          console.log(err);
        });
      }
    })
    .catch(err => {
      console.log(err);
      ctx.body = { success: false, message: "修改失败" };
      ctx.status = 500;
    });
});
export default router;
