import Router from "@koa/router";
import type { WhereOptions } from "sequelize";
import { Op } from "sequelize";
import { ArticleAttributes } from "@/db/models/init-models";
import DB from "@/db";
import getTagData from "@/common/modules/article/get/set-tag-data";
import setDescription from "@/common/modules/article/get/set-description";
import Sequelize from "@/db/config";
import verify from "@/common/verify/api-verify/article/search";

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
/** 用户端搜索:根据前端传递的Query参数进行文章分页查询*/
router.get("/article/search/:page", verify, async ctx => {
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
            let description = setDescription(item.content);
            let tag = getTagData(item.tag as unknown as number[], ["name"]);
            (item as any).content = undefined;
            return Object.assign(item, {
              description,
              tag,
              content: undefined,
            });
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
