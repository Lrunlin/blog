import compose from "koa-compose";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import interger from "@/common/verify/integer";
import auth from "@/common/middleware/auth";
import { typeCollection } from "@/common/verify/modules/type";
import map from "../../../utils/map";
import { Next, Context } from "koa";
import DB from "@/db";

const schema = Joi.object({
  type: typeCollection,
});

async function verify(ctx: Context, next: Next) {
  let belong_id: string = ctx.params.belong_id;
  let authorData = await map(ctx.request.body.type, ["author"])
    .db(+belong_id)
    .then(res => res)
    .catch(() => false as false);

  if (!authorData) {
    ctx.body = { success: false, message: "没有找到对应的内容" };
    return;
  }

  if (authorData.author == ctx.id) {
    ctx.body = { success: false, message: "禁止收藏自己发布的内容" };
    return;
  }

  let likeHistory = await DB.Collection.findOne({
    where: { belong_id: belong_id, user_id: ctx.id },
  });
  if (likeHistory) {
    ctx.body = { success: false, message: "禁止重复收藏" };
    return;
  }
  await next();
}

export default compose([auth(0), interger([], ["belong_id"]), validator(schema), verify]);
