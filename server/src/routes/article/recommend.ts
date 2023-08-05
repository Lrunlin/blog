import Router from "@koa/router";
import DB from "@/db";
import { Op } from "sequelize";
import type { TagAttributes } from "@/db/models/init-models";
import Sequelize from "@/db/config";
import interger from "@/common/verify/integer";
import getTagData from "@/common/modules/article/get/set-tag-data";
import setDescription from "@/common/modules/article/get/set-description";

let articleAttribute = [
  "view_count",
  "update_time",
  [
    Sequelize.literal(
      `(SELECT COUNT(*) FROM comment WHERE comment.belong_id = article.id and type="article")`
    ),
    "comment_count",
  ],
  [
    Sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE likes.belong_id = article.id)`),
    "like_count",
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
router.get("/article/recommend/:id", interger([], ["id"]), async ctx => {
  let articleID = +ctx.params.id;

  let articleType = await DB.Article.findByPk(articleID, {
    attributes: ["tag"],
  });

  if (!articleType) {
    ctx.body = { success: false, message: "查询失败" };
    return;
  }
  let tags = articleType?.tag as unknown as TagAttributes["id"][];

  await DB.Article.findAll({
    where: {
      id: {
        [Op.not]: articleID,
      },
      [Op.or]: tags.map(item => ({ tag: { [Op.substring]: item } })),
      state: 1,
    },
    offset: 0,
    limit: 24,
    attributes: [...attributes, ...articleAttribute] as any,
    include: [
      {
        model: DB.User,
        as: "author_data",
        attributes: ["id", "name", "auth", "avatar_url"],
      },
    ],
  })
    .then(rows => {
      ctx.body = {
        success: true,
        message: "根据文章ID搜索同类型文章",
        data: rows.map(row => {
          let item = row.toJSON();
          let description = setDescription(item.content);
          let tag = getTagData(item.tag as unknown as number[], ["name"]);
          (item as any).content = undefined;
          return Object.assign(item, {
            description,
            tag,
            content: undefined,
          });
        }),
      };
    })
    .catch(() => {
      ctx.body = {
        success: false,
        message: "查询失败",
      };
    });
});
export default router;
