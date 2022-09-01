import Router from "@koa/router";
import DB from "@/db";
import { Op } from "sequelize";
import getTagData from "@/common/utils/article/get/get-tag-data";
import type { TagAttributes, ArticleAttributes } from "@/db/models/init-models";
import Sequelize from "@/db/config";

let articleAttribute = [
  "view_count",
  "update_time",
  [
    Sequelize.literal(`(SELECT COUNT(*) FROM comment WHERE comment.article_id = article.id)`),
    "comment_count",
  ],
  [
    Sequelize.literal(`(SELECT COUNT(*) FROM collection WHERE collection.article_id = article.id)`),
    "collection_count",
  ],
];
let attributes = [
  "id",
  "title",
  "description",
  "cover_file_name",
  "cover_url",
  "state",
  "create_time",
  "tag",
  "content",
];

let router = new Router();

// 根据文章ID返回推荐文章
router.get("/article/recommend/:id", async ctx => {
  let articleID = +ctx.params.id;

  let articleType = await DB.Article.findByPk(articleID, {
    attributes: ["tag"],
  });
  if (!articleType) {
    ctx.body = { success: false, message: "查询失败" };
    return;
  }
  let tags = articleType?.tag as unknown as TagAttributes["id"][];

  // 查询指定类型的文章返回对应的ORM查询函数
  const template = (tag: number) => {
    return DB.Article.findAll({
      where: {
        tag: {
          [Op.substring]: tag,
        },
        state: 1,
      },
      attributes: [...attributes, ...articleAttribute] as any,
      include: [
        {
          model: DB.User,
          as: "author_data",
          attributes: ["id", "name", "auth", "avatar_url"],
        },
      ],
    });
  };

  // 传递文章类型查询该文章所有类型的对应的文章
  await Promise.all(tags.map(item => template(item))).then(result => {
    let data = result
      .map(item => item.map(_item => _item.toJSON()))
      .flat()
      .reduce((total: ArticleAttributes[], item, index) => {
        if (index > 24) {
          return total;
        }
        return total.some((_article: ArticleAttributes) => _article.id == item.id)
          ? total
          : [...total, item];
      }, []);

    ctx.body = {
      success: true,
      message: "根据文章ID搜索同类型文章",
      data: data.map(item => getTagData(item)),
    };
  });
});
export default router;
