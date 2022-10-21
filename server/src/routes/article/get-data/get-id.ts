import Router from "@koa/router";
import DB from "@/db";
import interger from "@/common/verify/integer";
import HTMLToMarkDown from "@/common/modules/article/get/html-to-markdown";
import getCodeBlockLanguage from "@/common/modules/article/get/get-code-block-language";
import imgPrefix from "@/common/modules/article/get/img-add-prefix";
import getTagData from "@/common/modules/article/get/get-tag-data";
import getTitleId from "@/common/modules/article/get/set-title-id";
import Sequelize from "@/db/config";

let router = new Router();

router.get("/article/:id", interger([], ["id"]), async ctx => {
  let id = +ctx.params.id;

  await DB.Article.findByPk(id, {
    include: [
      {
        model: DB.User,
        as: "author_data",
        attributes: ["id", "name", "auth", "avatar_file_name", "avatar_url"],
      },
    ],
    attributes: {
      include: [
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
      exclude: ["author"],
    },
  })
    .then(row => {
      if (row) {
        let data: any = row.toJSON();

        if (!ctx.query.update) {
          data = getCodeBlockLanguage(imgPrefix(getTagData(getTitleId(data) as any) as any) as any);
        } else {
          data = imgPrefix(data, true);
        }

        if (ctx.query.update == "md") {
          data = HTMLToMarkDown(data);
        }

        ctx.body = { success: true, message: "查询成功", data: data };
      } else {
        ctx.status = 404;
        ctx.body = { success: false, message: "没有找到对应的文章", data: [] };
      }
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "查询失败" };
      console.log(err);
    });
});
export default router;
