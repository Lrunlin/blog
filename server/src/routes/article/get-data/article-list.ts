import Router from "@koa/router";
import getBloggerList from "@/common/modules/article/select/getBloggerList";
import getTypeChildrenTag from "@/common/modules/article/select/getTypeChildrenTag";
import option from "@/common/modules/article/select/option";
import redis from "@/common/utils/redis";
import verify from "@/common/verify/api-verify/article/list";

let router = new Router();

export async function where({
  tag,
  type,
  follow,
}: {
  tag?: number | string;
  type?: number | string;
  follow?: number | string;
}) {
  let whereOption = {};
  if (tag) {
    whereOption = { tag_id: +tag };
  } else if (type) {
    const tagList = await getTypeChildrenTag(+type);
    whereOption = { tag_id: tagList };
  } else if (follow) {
    const bloggerList = await getBloggerList(+follow);
    whereOption = { author: bloggerList };
  }
  return whereOption;
}

// 用户端首页文章列表接口
router.get("/article/list/:page", verify, async (ctx) => {
  const page = +ctx.params.page; // 当前页数
  if (page <= 50) {
    let key = `recommend-cache-${ctx.query.sort}${ctx.query.tag || ctx.query.type ? `-${ctx.query.tag || ctx.query.type}` : ""}-${page}`;

    let data = await redis.get(key);

    if (data) {
      ctx.body = {
        success: true,
        message: `查询首页文章，第${page}页`,
        data: JSON.parse(data),
      };
      return;
    }
  }

  /** 处理客户端的查询类型返回对应的where条件 */

  // 获取分页查询条件
  const data = await option(
    page,
    ctx.query.sort as any, // 排序条件
    await where({
      tag: ctx.query.tag as string,
      type: ctx.query.type as string,
      follow: ctx.query.follow as string,
    }), // 查询条件
  );

  ctx.body = {
    success: true,
    message: `查询首页文章，第${page}页`,
    data: data,
  };
});

export default router;
