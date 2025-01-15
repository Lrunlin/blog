import DB from "@/db";
import type { Order } from "sequelize";
import Sequelize from "@/db/config";
import setDescription from "@/common/modules/article/get/set-description";

/** 排序规则 */
let sort = {
  recommend: [
    ["update_time", "desc"],
    [Sequelize.literal("comment_count"), "desc"], // 使用 Sequelize.literal 来引用计算出来的字段
    ["create_time", "desc"],
    ["reprint", "asc"],
    [Sequelize.literal("like_count"), "desc"],
    ["view_count", "desc"],
  ],
  newest: [
    ["create_time", "desc"],
    ["update_time", "desc"],
    ["reprint", "asc"],
    [Sequelize.literal("like_count"), "desc"],
    [Sequelize.literal("comment_count"), "desc"],
  ],
  hottest: [
    [Sequelize.literal("like_count"), "desc"], // 使用 Sequelize.literal 来引用计算出来的字段
    ["create_time", "desc"],
    ["view_count", "desc"],
    [Sequelize.literal("comment_count"), "desc"],
    ["update_time", "desc"],
    ["reprint", "asc"],
  ],
};

/**
 * Tag查询接口获取文章列表数据
 * @param page {number} 页数
 * @param _sort {"recommend" | "newest" | "hottest"} 排序规则
 * @param where {SequelizeWhere} 查询条件
 * @returns 查询结果
 */
async function getArticleListData(
  page: number,
  _sort: "recommend" | "newest" | "hottest",
  tag_id: number,
) {
  try {
    const result = await DB.Article.findAndCountAll({
      attributes: [
        "id",
        "title",
        "description",
        "view_count",
        "cover_file_name",
        "cover_url",
        "update_time",
        "create_time",
        "content",
        "reprint",
        [
          Sequelize.literal(
            `(SELECT COUNT(id) FROM comment WHERE comment.belong_id = article.id and type="article")`,
          ),
          "comment_count",
        ],
        [
          Sequelize.literal(
            `(SELECT COUNT(id) FROM likes WHERE likes.belong_id = article.id)`,
          ),
          "like_count",
        ],
      ],
      include: [
        {
          model: DB.User,
          as: "author_data", // 用户表关联
          attributes: ["id", "name"],
        },
        {
          model: DB.ArticleTag, // 假设 article_tag 表关联 article 和 tag
          as: "tag_article_list", // 为 ArticleTag 设置别名
          attributes: ["tag_id"], // 选择 tag_id 字段
          include: [
            {
              model: DB.Tag, // 假设 tag 表有 tag 字段
              as: "tag_data", // 为 tag 设置别名
              attributes: ["id", "name"],
            },
          ],
          where: {
            tag_id: tag_id,
          },
        },
      ],
      offset: (page - 1) * 10, // 分页
      limit: 10, // 每页10条
      where: { state: 1 }, // 过滤已发布的文章
      order: sort[_sort] as Order, // 根据排序规则
    });

    return {
      total: result.count,
      list: result.rows.map((row) => {
        let item: any = row.toJSON();

        const description = setDescription(item.content); // 生成文章摘要
        return Object.assign(item, {
          description,
          state: undefined, // 隐藏 state 字段
          content: undefined, // 隐藏内容字段
          reprint: undefined, // 隐藏转载字段
          cover_file_name: undefined, // 隐藏封面文件名
          tag: item.tag_article_list.map(
            (article_tag: any) => article_tag.tag_data,
          ),
          tag_article_list: undefined, // 隐藏中间表字段
        });
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      total: 0,
      list: [],
    };
  }
}

export default getArticleListData;
