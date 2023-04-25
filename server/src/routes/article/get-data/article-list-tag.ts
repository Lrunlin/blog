import Router from "@koa/router";
import { TagAttributes } from "@/db/models/init-models";
import cache from "@/common/modules/cache/type";
import { Op } from "sequelize";
import getArticleListData from "@/common/modules/article/select/search";
let router = new Router();

router.get("/article/tag/:tag", async ctx => {
  let tag = ctx.params.tag;
  let tags = cache.get("tag") as TagAttributes[];
  let tagTarget = tags?.find(item => item.name == tag);
  let page = +(ctx.query.page as string);

  if (!tagTarget) {
    ctx.status = 404;
    return;
  }

  let articleData = await getArticleListData(page, "recommend", {
    tag: {
      [Op.substring]: tagTarget.id,
    },
  });

  ctx.body = {
    success: true,
    message: `查询标签${tagTarget.name}的文章`,
    data: {
      tag_data: tagTarget,
      article_data: articleData,
    },
  };
});
export default router;
