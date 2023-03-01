import compose from "koa-compose";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import interger from "@/common/verify/integer";
import auth from "@/common/middleware/auth";
import { typeFollwoProblem } from "@/common/verify/modules/type";
import { Next, Context } from "koa";
import DB from "@/db";
import map, { type } from "./map";
import type {
  AnswerAttributes,
  ArticleAttributes,
  ProblemAttributes,
} from "@/db/models/init-models";

const schema = Joi.object({
  type: typeFollwoProblem,
});

/** 根据类型获取map获取的数据表属性*/
let userDataMap = {
  user: ["id"],
  problem: ["author"],
};
async function verify(ctx: Context, next: Next) {
  let belong_id = +ctx.params.belong_id;
  let type: type = ctx.request.body.type;
  if (belong_id == ctx.id && type == "user") {
    ctx.status = 401;
    ctx.body = { success: false, message: "不能关注自己！！！" };
    return;
  }

  let authorData = await map(type, userDataMap[type as "user" | "problem"])
    .db(+belong_id)
    .then(res => res)
    .catch(() => false as false);

  if (!authorData) {
    ctx.status = 401;
    ctx.body = { success: false, message: "没有找到对应的内容" };
    return;
  }

  if (
    type != "user" &&
    (authorData as AnswerAttributes | ArticleAttributes | ProblemAttributes).author == ctx.id
  ) {
    ctx.status = 401;
    ctx.body = { success: false, message: "禁止关注自己发布的内容" };
    return;
  }

  let followHistory = await DB.Follow.findOne({
    where: { belong_id: belong_id, user_id: ctx.id },
  });
  if (followHistory) {
    ctx.status = 401;
    ctx.body = { success: false, message: "禁止不要重复关注" };
    return;
  }
  await next();
}

export default compose([interger([], ["belong_id"]), auth(0), validator(schema), verify]);
