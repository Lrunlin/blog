import Router from "@koa/router";
import DB from "@/db";
import Joi from "joi";
import auth from "@/common/middleware/auth";
import validator from "@/common/middleware/validator";

import recommendArticleList from "@/common/utils/article/list/select/recommend";
import typeArticleList from "@/common/utils/article/list/select/type";
import tagArticleList from "@/common/utils/article/list/select/tag";
import followArticleList from "@/common/utils/article/list/select/follow";
import sort from "@/common/utils/article/list/sort";

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
  let data = sort(ctx.query.type as any, recommendArticleList());
  let page = +(ctx.query.page as string);

  ctx.body = {
    success: true,
    message: `综合${ctx.query.type},页数:${page}`,
    data: {
      total: data.length,
      list: data.slice((page - 1) * 10, page * 10),
    },
  };
});

// 关注
router.get("/follow", validator(schema), auth([0, 1]), async ctx => {
  let page = +(ctx.query.page as string);
  let _data =await followArticleList(ctx.id as number) as any;
  let data = sort(ctx.query.type as any, _data);

  ctx.body = {
    success: true,
    message: "查询关注博主的文章",
    data: {
      total: data.length,
      list: data.slice((page - 1) * 10, page * 10),
    },
  };
});

// 根据类型查询
router.get("/type/:id", validator(schema), async ctx => {
  let typeID = +(ctx.params.id as string);

  let page = +(ctx.query.page as string);
  let data = sort(ctx.query.type as any, typeArticleList(typeID));
  ctx.body = {
    success: true,
    message: "根据类型查询文章",
    data: {
      total: data.length,
      list: data.slice((page - 1) * 10, page * 10),
    },
  };
});

router.get("/tag/:id", validator(schema), async ctx => {
  let tagID = +(ctx.params.id as string);
  let page = +(ctx.query.page as string);
  let data = sort(ctx.query.type as any, tagArticleList(tagID));
  ctx.body = {
    success: true,
    message: "根据tag查询文章",
    data: {
      total: data.length,
      list: data.slice((page - 1) * 10, page * 10),
    },
  };
});
export default router;
