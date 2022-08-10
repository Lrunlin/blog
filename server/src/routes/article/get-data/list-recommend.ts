import Router from "@koa/router";
import DB from "@/db";
import Sequelize from "@/db/config";
import getTagData from "@/common/utils/article/get/get-tag-data";

let router = new Router();

router.get("/article/list/recommend", async ctx => {
  await DB.Article.findAll({
    order: [["create_time", "desc"]],
    attributes: [
      "id",
      "title",
      "description",
      "view_count",
      "cover_file_name",
      "cover_url",
      "update_time",
      "create_time",
      "tag",
      [
        Sequelize.literal(`(SELECT COUNT(*) FROM comment WHERE comment.article_id = article.id)`),
        "comment_count",
      ],
      [
        Sequelize.literal(
          `(SELECT COUNT(*) FROM collection WHERE collection.article_id = article.id)`
        ),
        "collection_count",
      ],
    ],
    include: [
      {
        model: DB.User,
        as: "author_data",
        attributes: ["name"],
      },
    ],
  }).then(rows => {
    ctx.body = {
      data: {
        total: rows.length,
        list: rows.map(item => getTagData(item.toJSON(), ["name"]))
      },
    };
  });
});
export default router;
