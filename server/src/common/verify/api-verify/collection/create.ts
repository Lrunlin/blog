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
  favorites_id: Joi.array().items(Joi.number()).required().min(1),
});

async function verify(ctx: Context, next: Next) {
  let belong_id: string = ctx.params.belong_id;
  let authorData = await map(ctx.request.body.type, ["author"])
    .db(+belong_id)
    .then(res => res)
    .catch(() => false as false);

  if (!authorData) {
    ctx.status = 500;
    ctx.body = { success: false, message: "没有找到对应的内容" };
    return;
  }

  if (authorData.author == ctx.id) {
    ctx.status = 500;
    ctx.body = { success: false, message: "禁止收藏自己发布的内容" };
    return;
  }

  let likeHistory = await DB.Collection.findOne({
    where: { belong_id: belong_id, user_id: ctx.id },
  });
  if (likeHistory) {
    ctx.status = 500;
    ctx.body = { success: false, message: "禁止重复收藏" };
    return;
  }

  /** 判断是否有favorites_id不在列表内*/
  let hasFavoritesLength = await DB.Favorites.count({
    where: {
      id: ctx.request.body.favorites_id,
      user_id: ctx.id,
    },
    attributes: ["id"],
  });
  if (hasFavoritesLength != ctx.request.body.favorites_id.length) {
    ctx.status = 500;
    ctx.body = { success: false, message: "收藏夹选择错误" };
    return;
  }
  await next();
}

export default compose([auth(0), interger([], ["belong_id"]), validator(schema), verify]);
