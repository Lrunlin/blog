import Router from "@koa/router";
import DB from "@/db";
import { ParsedUrlQuery } from "querystring";
import { Op, Sequelize } from "sequelize";
import getBloggerList from "@/common/modules/article/select/getBloggerList";
import getTypeChildrenTag from "@/common/modules/article/select/getTypeChildrenTag";
import option from "@/common/modules/article/select/option";
import verify from "@/common/verify/api-verify/article/list";

/** 处理客户端的查询类型返回对应的where条件 */
const map = {
  tag: async (tag: string) => {
    // 通过标签名查找标签ID，然后使用tag_id进行查询
    const tagData = await DB.Tag.findOne({
      where: { name: tag },
      attributes: ["id"],
    });

    if (tagData) {
      return {
        "$tags.id$": tagData.id, // 通过关联标签ID查询文章
      };
    }

    return {}; // 如果没有找到对应的标签，则返回空查询
  },

  follow: async (user_Id: number) => {
    // 获取关注的博主列表
    const bloggerList = await getBloggerList(user_Id);
    return {
      author: bloggerList, // 根据博主ID进行查询
    };
  },

  type: async (type: number) => {
    // 获取该类型下的所有子标签
    const tagList = await getTypeChildrenTag(type);

    return {
      [Op.or]: tagList.map((item) => ({
        "$tags.id$": item, // 通过标签名查找
      })),
    };
  },
};

/**
 * 生成where条件
 * @param query {ParsedUrlQuery} 查询条件
 * @param user_id {number} 当前用户ID
 * @returns {Promise<{[key: string]: any}>} 返回对应的查询条件
 */
async function where(query: ParsedUrlQuery, user_id?: number) {
  if (query.tag) {
    return map["tag"](query.tag as string); // 按标签名查询
  } else if (query.type) {
    return map["type"](Number(query.type)); // 按类型查询
  } else if (query.follow) {
    return map["follow"](user_id as number); // 按用户关注查询
  } else {
    return {}; // 没有条件则返回空
  }
}

let router = new Router();

// 用户端首页文章列表接口
router.get("/article/list/:page", verify, async (ctx) => {
  const page = +ctx.params.page; // 当前页数

  // 获取分页查询条件
  const data = await option(
    page,
    ctx.query.sort as any, // 排序条件
    await where(ctx.query, ctx.id), // 查询条件
  );

  ctx.body = {
    success: true,
    message: `查询首页文章，第${page}页`,
    data: data,
  };
});

export default router;
