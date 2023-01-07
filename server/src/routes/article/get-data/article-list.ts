import Router from "@koa/router";
import type { WhereOptions } from "sequelize";
import { Op } from "sequelize";
import { ArticleAttributes } from "@/db/models/init-models";
import DB from "@/db";
import getTagData from "@/common/modules/article/get/get-tag-data";
import setDescription from "@/common/modules/article/get/set-description";
import Sequelize from "@/db/config";
import verify from "@/common/verify/api-verify/article/list";

let articleAttribute = [
  "view_count",
  "update_time",
  [
    Sequelize.literal(`(SELECT COUNT(*) FROM comment WHERE comment.article_id = article.id)`),
    "comment_count",
  ],
  [
    Sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE likes.article_id = article.id)`),
    "likes_count",
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
/** 根据前端传递的Query参数进行文章分页查询*/
router.get("/article/list/page/:page", verify, async ctx => {
  let page = +ctx.params.page;
  let where: WhereOptions<ArticleAttributes> = {};
  let { state, author, keyword, tag } = ctx.query;
  state && (where.state = state);
  author && (where.author = author);

  if (tag) {
    await DB.Tag.findOne({
      where: {
        name: tag,
      },
      attributes: ["id"],
    })
      .then(row => {
        if (row) {
          where = Object.assign(where, { tag: { [Op.substring]: row.id as number } });
        }
      })
      .catch(() => {});
  }
  if (keyword) {
    where = Object.assign(where, {
      [Op.or]: [
        { title: { [Op.substring]: keyword as string } },
        { description: { [Op.substring]: keyword as string } },
        { content: { [Op.substring]: keyword as string } },
      ],
    });
  }

  await DB.Article.findAndCountAll({
    where: where,
    offset: (page - 1) * 20,
    limit: 20,
    order: [["create_time", "desc"]],
    attributes:
      ctx.request.body.state != 0 ? attributes.concat(articleAttribute as any) : attributes,
    include: [
      {
        model: DB.User,
        as: "author_data",
        attributes: ["name"],
      },
    ],
  })
    .then(({ count, rows }) => {
      ctx.body = {
        success: true,
        message: "根据条件查询查询文章列表",
        data: {
          total: count,
          list: rows.map(row => {
            let item = row.toJSON();
            let _description = setDescription<typeof item>(item);
            let _item = getTagData<typeof _description>(_description, ["name"]);
            delete (_item as any).content;
            return _item;
          }),
        },
      };
    })
    .catch(err => {
      ctx.body = {
        success: false,
        message: "查询失败",
        data: {
          total: 0,
          list: [],
        },
      };
    });
});
export default router;
