import Router from "@koa/router";
import Joi from "joi";
import auth from "@/common/middleware/auth";
import validator from "@/common/middleware/verify/validator";
import interger from "@/common/verify/integer";
import option from "@/common/utils/article/select/option";
import { Op } from "sequelize";

import getTypeChildrenTag from "@/common/utils/article/select/getTypeChildrenTag";
import getBloggerList from "@/common/utils/article/select/getBloggerList";

//todo 前期推荐方式比较简单，后期在升级
let router = new Router();
router.prefix("/article/list");
const schema = Joi.object({
  page: Joi.number().min(1).required().error(new Error("页数没写")),
  type: Joi.string().custom(value => {
    if (!["recommend", "newest", "hottest"].includes(value)) {
      throw new Error("类型错误");
    }
    return value;
  }),
});

// 综合
router.get("/recommend", validator(schema), async ctx => {
  let page = +(ctx.query.page as string);
  let data = await option(page, ctx.query.type as any);
  ctx.body = {
    success: true,
    message: `综合${ctx.query.type},页数:${page}`,
    data: data,
  };
});

// 关注
router.get("/follow", validator(schema), auth(0), async ctx => {
  let page = +(ctx.query.page as string);
  let bloggerList = await getBloggerList(ctx.id as number);
  let data = await option(page, ctx.query.type as any, { author: bloggerList });
  ctx.body = {
    success: true,
    message: "查询关注博主的文章",
    data: data,
  };
});

// 根据类型查询
router.get("/type/:id", interger([], ["id"]), validator(schema), async ctx => {
  let typeID = +(ctx.params.id as string);
  let page = +(ctx.query.page as string);
  let tagList = await getTypeChildrenTag(typeID);

  let data = await option(page, ctx.query.type as any, {
    [Op.or]: tagList.map(item => ({ tag: { [Op.substring]: item } })),
  });

  ctx.body = {
    success: true,
    message: "根据类型查询文章",
    data: data,
  };
});

router.get("/tag/:id", validator(schema), interger([], ["id"]), async ctx => {
  let page = +(ctx.query.page as string);
  let data = await option(page, ctx.query.type as any, {
    tag: {
      [Op.substring]: ctx.params.id as string,
    },
  });
  ctx.body = {
    success: true,
    message: "根据tag查询文章",
    data: data,
  };
});
export default router;
