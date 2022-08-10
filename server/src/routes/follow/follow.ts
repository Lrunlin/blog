import Router from "@koa/router";
import DB from "@/db";
import useId from "@/common/hooks/useId";
import auth from "@/common/middleware/auth";
let router = new Router();

router.post("/follow/:bogger_id", auth([0, 1]), async ctx => {
  let boggerID = +ctx.params.bogger_id;

  let blogger = await DB.User.findOne({ where: { id: boggerID }, attributes: ["state"] });
  if (!blogger) {
    ctx.body = { success: false, message: "没有找到对应的博主" };
    return;
  }

  await DB.Follow.create({
    id: useId(),
    blogger_id: boggerID,
    user_id: ctx.id as number,
    time: new Date(),
  })
    .then(res => {
      ctx.body = { success: true, message: "关注成功" };
    })
    .catch(err => {
      ctx.body = { success: false, message: "关注失败" };
      console.log(err);
    });
});
export default router;
