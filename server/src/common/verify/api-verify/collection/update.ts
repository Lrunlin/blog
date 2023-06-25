import compose from "koa-compose";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import interger from "@/common/verify/integer";
import auth from "@/common/middleware/auth";
import { Next, Context } from "koa";
import DB from "@/db";

const schema = Joi.object({
  favorites_id: Joi.array().items(Joi.number()).required().min(1),
});

async function verify(ctx: Context, next: Next) {
  /** 判断是否有favorites_id不在列表内*/
  let hasFavoritesLength = await DB.Favorites.count({
    where: {
      id: ctx.request.body.favorites_id,
      user_id: ctx.id,
    },
    attributes: ["id"],
  });

  if (hasFavoritesLength != ctx.request.body.favorites_id.length) {
    ctx.body = { success: false, message: "收藏夹选择错误" };
    ctx.status = 400;
    return;
  }
  await next();
}

export default compose([auth(0), interger([], ["belong_id"]), validator(schema), verify]);
