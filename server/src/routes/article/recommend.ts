import Router from "@koa/router";
import DB from "@/db";
import { Op } from "sequelize";
import Sequelize from "@/db/config";
import setDescription from "@/common/modules/article/get/set-description";
import interger from "@/common/verify/integer";

const articleAttributes = [
  "view_count",
  "update_time",
  [
    Sequelize.literal(
      `(SELECT COUNT(*) FROM comment WHERE comment.belong_id = article.id and type="article")`,
    ),
    "comment_count",
  ],
  [
    Sequelize.literal(
      `(SELECT COUNT(*) FROM likes WHERE likes.belong_id = article.id)`,
    ),
    "like_count",
  ],
];

const attributes = [
  "id",
  "title",
  "description",
  "cover_file_name",
  "cover_url",
  "state",
  "create_time",
  "content",
];

const router = new Router();

// 根据文章ID返回推荐文章
router.get("/article/recommend/:id", interger([], ["id"]), async (ctx) => {
  const articleID = +ctx.params.id;

  try {
    // 获取当前文章的标签ID（通过多对多关联，使用中间表ArticleTag）
    const articleType = await DB.ArticleTag.findAll({
      where: { belong_id: articleID },
      attributes: ["tag_id"],
      raw: true,
    }).then((rows) => rows.map((item) => item.tag_id));

    if (!articleType.length) {
      ctx.body = { success: false, message: "文章不存在" };
      return;
    }

    // 根据标签来查询推荐文章
    // 获取当前文章的标签ID（通过多对多关联，使用中间表ArticleTag）
    const articleTags = await DB.ArticleTag.findAll({
      where: { belong_id: articleID },
      attributes: ["tag_id"],
      raw: true,
    }).then((rows) => rows.map((item) => item.tag_id));

    if (!articleTags.length) {
      ctx.body = { success: false, message: "文章不存在" };
      return;
    }

    // 根据标签来查询推荐文章，直接在数据库中处理标签匹配
    const recommendedArticles = await DB.Article.findAll({
      where: {
        id: {
          [Op.not]: articleID, // 排除当前文章
        },
        state: 1, // 文章必须是已发布状态
      },
      offset: 0,
      limit: 24,
      attributes: [...attributes, ...articleAttributes] as any,
      include: [
        {
          model: DB.User,
          as: "author_data",
          attributes: ["id", "name"],
        },
        {
          model: DB.ArticleTag,
          as: "tag_article_list",
          attributes: ["tag_id"],
          include: [
            {
              model: DB.Tag,
              as: "tag_data",
              attributes: ["id", "name"],
            },
          ],
          where: {
            tag_id: {
              [Op.in]: articleTags, // 只匹配当前文章的标签
            },
          },
        },
      ],
    });

    // 返回处理后的推荐文章数据
    ctx.body = {
      success: true,
      message: "根据文章ID搜索同类型文章",
      data: recommendedArticles.map((row) => {
        let item: any = row.toJSON();
        const description = setDescription(item.content);

        item.content = undefined;
        return {
          ...item,
          description,
          tag: item.tag_article_list.map((article_tag: any) => ({
            id: article_tag.tag_data.id,
            name: article_tag.tag_data.name,
          })),
          tag_article_list: undefined,
        };
      }),
    };
  } catch (error) {
    console.error(error);
    ctx.body = {
      success: false,
      message: "查询失败",
    };
  }
});

export default router;
