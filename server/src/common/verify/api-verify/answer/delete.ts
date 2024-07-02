import { Context, Next } from "koa";
import DB from "@/db";
import Joi from "joi";
import compose from "koa-compose";
import auth from "@/common/middleware/auth";
import validator from "@/common/middleware/verify/validatorAsync";

let schema = Joi.object({
  id: Joi.number().min(0).required().error(new Error("答案ID格式不正确")),
});

async function verify(ctx: Context, next: Next) {
  await DB.Problem.findOne({
    where: { answer_id: ctx.params.id },
    raw: true,
    attributes: ["id"],
  })
    .then(async (row) => {
      if (row) {
        ctx.status = 400;
        ctx.body = { success: false, message: "被采纳的答案无法删除" };
      } else {
        await next();
      }
    })
    .catch(() => {
      ctx.status = 400;
      ctx.body = { success: false, message: "服务器查询错误请稍后重试" };
    });
}

export default compose([auth(0), validator(schema, true), verify]);
