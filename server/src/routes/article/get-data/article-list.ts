import Router from "@koa/router";
import getBloggerList from "@/common/modules/article/select/getBloggerList";
import getTypeChildrenTag from "@/common/modules/article/select/getTypeChildrenTag";
import option from "@/common/modules/article/select/option";
import verify from "@/common/verify/api-verify/article/list";


let router = new Router();

// 用户端首页文章列表接口
router.get("/article/list/:page", verify, async (ctx) => {
  const page = +ctx.params.page; // 当前页数

  /** 处理客户端的查询类型返回对应的where条件 */
  let where = {};
  if (ctx.query.tag) {
    where = { tag_id: +ctx.query.tag };
  } else if (ctx.query.type) {
    const tagList = await getTypeChildrenTag(+ctx.query.type);
    where = { tag_id: tagList };
  } else if (ctx.query.follow) {
    const bloggerList = await getBloggerList(+ctx.query.follow);
    where = { author: bloggerList };
  }
  // 获取分页查询条件
  const data = await option(
    page,
    ctx.query.sort as any, // 排序条件
    where, // 查询条件
  );

  ctx.body = {
    success: true,
    message: `查询首页文章，第${page}页`,
    data: data,
  };
});

export default router;