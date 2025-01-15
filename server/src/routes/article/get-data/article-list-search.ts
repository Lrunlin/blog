import Router from "@koa/router";
import DB from "@/db";
import { Op } from "sequelize";
import Sequelize from "@/db/config";
import setDescription from "@/common/modules/article/get/set-description";
import interger from "@/common/verify/integer";

let articleAttribute = [
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
let attributes = [
  "id",
  "title",
  "description",
  "cover_file_name",
  "cover_url",
  "state",
  "create_time",
  "content",
];

let router = new Router();

/** 用户端搜索:根据前端传递的Query参数进行文章分页查询 */
router.get("/article/search/:page", interger([], ["page"]), async (ctx) => {
  let page = +ctx.params.page;
  let where: any = {}; // 定义查询条件
  let { state, author, keyword, tag } = ctx.query;

  // 根据文章状态筛选
  if (state) where.state = state;

  // 根据作者筛选
  if (author) where.author = author;

  // 如果有标签，先通过标签查询ID
  let tagIds = [];
  if (tag) {
    // 通过标签名称查找标签ID
    const tagRow = await DB.Tag.findOne({
      where: { name: tag },
      attributes: ["id"],
    });
    if (tagRow) {
      tagIds.push(tagRow.id); // 将标签ID添加到标签数组
    }
  }

  // 如果有标签ID，则添加到查询条件
  if (tagIds.length) {
    where["$tag_article_list.tag_id$"] = { [Op.in]: tagIds }; // 使用tag_article_list表关联筛选
  }

  // 如果有关键字搜索，查询标题、描述和内容
  if (keyword) {
    where = {
      ...where,
      [Op.or]: [
        { title: { [Op.substring]: keyword } },
        { description: { [Op.substring]: keyword } },
        { content: { [Op.substring]: keyword } },
      ],
    };
  }

  try {
    // 查询文章和其关联标签
    const { count, rows } = await DB.Article.findAndCountAll({
      where,
      offset: (page - 1) * 20, // 分页
      limit: 20,
      order: [["create_time", "desc"]], // 按创建时间降序排序
      attributes:
        ctx.request.body.state !== 0
          ? attributes.concat(articleAttribute as any)
          : attributes, // 如果状态不为0，返回额外的文章属性
      include: [
        {
          model: DB.User,
          as: "author_data", // 用户表关联
          attributes: ["id", "name"],
        },
        {
          model: DB.ArticleTag, // 关联 ArticleTag 表
          as: "tag_article_list", // 设置别名
          attributes: ["tag_id"], // 获取标签ID
          include: [
            {
              model: DB.Tag,
              as: "tag_data", // 标签数据的别名
              attributes: ["id", "name"], // 获取标签名称
              required: true, // 让标签匹配成为一个必要条件
              where: tagIds.length
                ? { id: { [Op.in]: tagIds } } // 根据标签ID进行筛选
                : {},
            },
          ],
        },
      ],
    });

    // 返回查询结果
    ctx.body = {
      success: true,
      message: "根据条件查询文章列表",
      data: {
        total: count,
        list: rows.map((row) => {
          let item: any = row.toJSON();
          const description = setDescription(item.content); // 生成文章摘要
          item.content = undefined; // 隐藏文章内容

          return {
            ...item,
            description,
            tag: item.tag_article_list.map((article_tag: any) => ({
              id: article_tag.tag_data.id,
              name: article_tag.tag_data.name,
            })),
            tag_article_list: undefined, // 隐藏中间表字段
          };
        }),
      },
    };
  } catch (error) {
    console.error(error);
    ctx.body = {
      success: false,
      message: "查询失败",
      data: {
        total: 0,
        list: [],
      },
    };
  }
});

export default router;
