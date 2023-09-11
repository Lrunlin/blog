import Router from "@koa/router";
import DB from "@/db";
import interger from "@/common/verify/integer";

import getCodeBlockLanguage from "@/common/modules/article/get/set-code-block-language";
import imgPrefix from "@/common/modules/article/get/img-add-prefix";
import getTagData from "@/common/modules/article/get/set-tag-data";
import getTitleId from "@/common/modules/article/get/set-title-id";
import setDescription from "@/common/modules/article/get/set-description";

import Sequelize from "@/db/config";
import getUserId from "@/common/middleware/getUserId";
import setExternalLink from "@/common/modules/article/get/external-link";

let router = new Router();

router.get("/article/:id", interger([], ["id"]), getUserId, async ctx => {
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
          Sequelize.literal(
            `(SELECT COUNT(id) FROM comment WHERE comment.belong_id = article.id and type="article")`
          ),
          "comment_count",
        ],
        [
          Sequelize.literal(
            `(SELECT COUNT(id) FROM collection WHERE collection.belong_id = article.id)`
          ),
          "collection_count",
        ],
        [
          Sequelize.literal(
            `(SELECT favorites_id FROM collection WHERE collection.user_id = ${
              ctx.id || -1
            }  and belong_id=${id})`
          ),
          "collection_state",
        ],
        [
          Sequelize.literal(`(SELECT COUNT(id) FROM likes WHERE likes.belong_id = article.id)`),
          "like_count",
        ],
        [
          Sequelize.literal(
            `(SELECT COUNT(id) FROM likes WHERE likes.user_id = ${
              ctx.id || -1
            } and belong_id=${id})`
          ),
          "like_state",
        ],
      ],
    },
  })
    .then(row => {
      if (row) {
        let data: any = row.toJSON();

        if (!ctx.query.update) {
          data = { ...data, ...getTitleId(data.content) };
          data = { ...data, ...getCodeBlockLanguage(data.content) };
          let description = setDescription(data.content);
          let tag = getTagData(data.tag as any, ["name"]);

          data = {
            ...data,
            description,
            tag,
            content: imgPrefix(data.content, "article", data.title),
          };

          data = { ...data, content: setExternalLink(data.content) };
        } else {
          data = {
            ...data,
            content: imgPrefix(data.content, "article"),
          };
        }

        if (data.collection_state) {
          data.collection_state = data.collection_state.split(",").map((item: string) => +item);
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
