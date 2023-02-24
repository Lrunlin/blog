import compose from "koa-compose";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import interger from "@/common/verify/integer";
import auth from "@/common/middleware/auth";
import { typeLikeComment } from "@/common/verify/modules/type";
import { Next, Context } from "koa";
import DB from "@/db";
import map from "../../../utils/map";

const schema = Joi.object({
  type: typeLikeComment,
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
    ctx.body = { success: false, message: "禁止为自己发布的内容点赞" };
    return;
  }

  let likeHistory = await DB.Likes.findOne({
    where: { belong_id: belong_id, user_id: ctx.id },
  });
  if (likeHistory) {
    ctx.body = { success: false, message: "禁止重复点赞" };
    return;
  }
  await next();
}

export default compose([interger([], ["belong_id"]), auth(0), validator(schema), verify]);
