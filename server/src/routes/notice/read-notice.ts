import Router from "@koa/router";
import DB from "@/db";
import authMiddleware from "@/common/middleware/auth";
import Joi from "joi";
import verify from "@/common/middleware/verify/validator";
let router = new Router();

let schema = Joi.object({
  notice_list: Joi.array().items(Joi.number()).min(0).error(new Error("通知ID错误")),
});

router.put("/notice/read", authMiddleware(0), verify(schema), async ctx => {
  let list = ctx.request.body.notice_list;
  await DB.Notice.update({ is_read: 1 }, { where: { id: list } }).catch(() => {});
  ctx.body = { success: true, message: "用户阅读通知,修改状态;" };
});
export default router;
