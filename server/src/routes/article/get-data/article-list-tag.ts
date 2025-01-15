import Router from "@koa/router";
import DB from "@/db";
import getArticleListData from "@/common/modules/article/select/search";

// 引入数据库模型

let router = new Router();

// 根据标签查询文章
router.get("/article/tag/:id", async (ctx) => {
  let tag_id = ctx.params.id; // 获取URL中的标签

  let page = +(ctx.query.page as string) || 1; // 获取分页信息，默认为第一页

  try {
    // 使用联表查询获取标签对应的文章列表

    let tagData = await DB.Tag.findByPk(tag_id, {
      attributes: ["name", "icon_file_name", "icon_url"],
    });
    if (!tagData) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: "标签不存在",
      };
      return;
    }

    let articleData = await getArticleListData(page, "recommend", +tag_id);

    ctx.body = {
      success: true,
      message: `查询标签${tag_id}的文章`,
      data: {
        tag_data: tagData,
        article_data: articleData,
      },
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: "查询失败",
    };
    console.error(err);
  }
});

export default router;
