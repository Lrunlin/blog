import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/follow/create";

let router = new Router();

router.post("/follow/:belong_id", verify, async ctx => {
  let boggerID = +ctx.params.belong_id;
  let type = ctx.request.body.type;

  await DB.Follow.create({
    id: id(),
    belong_id: boggerID,
    type: type,
    user_id: ctx.id as number,
    create_time: new Date(),
  })
    .then(res => {
      ctx.body = { success: true, message: "关注成功" };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "关注失败" };
      console.log(err);
    });
});
export default router;
