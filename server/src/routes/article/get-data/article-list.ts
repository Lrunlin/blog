import Router from "@koa/router";
import option from "@/common/modules/article/select/option";
import search from "@/common/modules/article/select/search";
import { Op, Sequelize } from "sequelize";
import getTypeChildrenTag from "@/common/modules/article/select/getTypeChildrenTag";
import getBloggerList from "@/common/modules/article/select/getBloggerList";
import { ParsedUrlQuery } from "querystring";
import verify from "@/common/verify/api-verify/article/list";

/** 处理客户端的查询类型返回对应的where*/
const map = {
  tag: async (tag: number | string) => {
    return {
      tag: {
        [Op.like]: Sequelize.literal(`'%${tag}%'`),
      },
    };
  },
  follow: async (user_Id: number) => {
    let bloggerList = await getBloggerList(user_Id);
    return { author: bloggerList };
  },
  type: async (type: number) => {
    let tagList = await getTypeChildrenTag(type);
    return {
      [Op.or]: tagList.map(item => ({ tag: { [Op.like]: Sequelize.literal(`'%${item}%'`) } })),
    };
  },
};

async function where(query: ParsedUrlQuery, user_id?: number) {
  if (query.tag) {
    return map["tag"](query.tag as string);
  } else if (query.type) {
    return map["type"](+query.type);
  } else if (query.follow) {
    return map["follow"](user_id as number);
  } else {
    return {};
  }
}

let router = new Router();
// 用户端首页文章列表
router.get("/article/list/:page", verify, async ctx => {
  let page = +(ctx.params.page as string);

  let data = await option(page, ctx.query.sort as any, await where(ctx.query, ctx.id));

  ctx.body = {
    success: true,
    message: `查询首页文章,页数:${page}`,
    data: data,
  };
});

export default router;
