import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/like/create";
let router = new Router();

router.post("/like/:belong_id", verify, async ctx => {
  let belong_id = +ctx.params.belong_id;
  let type = ctx.request.body.type as string;

  await DB.Likes.create({
    id: id(),
    belong_id: belong_id,
    type,
    user_id: ctx.id as number,
    create_time: new Date(),
  })
    .then(() => {
      ctx.body = { success: true, message: "点赞成功" };
    })
    .catch(err => {
      console.log(err);
      ctx.status = 500;
    });
});
export default router;
