import Router from "@koa/router";
import type { WhereOptions } from "sequelize";
import { Op } from "sequelize";
import { ArticleAttributes } from "@/db/models/init-models";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import DB from "@/db";
import getTagData from "@/common/utils/article/get/get-tag-data";
import setDescription from "@/common/utils/article/get/set-description";
import Sequelize from "@/db/config";

const schema = Joi.object({
  author: Joi.number().min(1).error(new Error("ID格式错误")),
  state: Joi.number().min(0).max(1).error(new Error("文章状态错误")),
  keyword: Joi.string().min(1).max(30).error(new Error("文章状态错误")),
});
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
/** 根据前端传递的Query参数进行文章分页查询*/
router.get("/article/list/page/:page", validator(schema), async ctx => {
  let page = +ctx.params.page;
  let where: WhereOptions<ArticleAttributes> = {};
  let { state, author, keyword } = ctx.query;
  state && (where.state = state);
  author && (where.author = author);
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
          list: rows.map(item => {
            let _item = getTagData(setDescription(item.toJSON()), ["name"]);
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
      console.log(err);
    });
});
export default router;
