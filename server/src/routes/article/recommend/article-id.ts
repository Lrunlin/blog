import Router from "@koa/router";
import DB from "@/db";
import { Op } from "sequelize";
import getTagData from "@/common/utils/article/get/get-tag-data";
import type { TagAttributes, ArticleAttributes } from "@/db/models/init-models";

let router = new Router();

router.get("/article/recommend/:id", async ctx => {
  let articleID = ctx.params.id;
  let articleType = await DB.Article.findByPk(articleID, {
    attributes: ["tag"],
  });
  if (!articleType) {
    ctx.body = { success: false, message: "查询失败" };
    return;
  }
  let tags = articleType?.tag as unknown as TagAttributes["id"][];

  const template = (tag: number) => {
    return DB.Article.findAll({
      where: {
        tag: {
          [Op.substring]: tag,
        },
      },
      include: [
        {
          model: DB.User,
          as: "author_data",
          attributes: ["id", "name", "auth", "avatar_url"],
        },
      ],
    });
  };

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
