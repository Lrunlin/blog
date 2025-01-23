import DB from "@/db";
import { Sequelize } from "sequelize";

// 文章表模型
export let sort = {
  recommend: [
    ["recommend", "desc"], // 根据推荐的排序值来排序
  ],
  newest: [
    ["newest", "desc"], // 最新文章优先
  ],
  hottest: [
    ["hottest", "desc"], // 最热文章优先
  ],
};

/**
 * 获取文章列表数据，按推荐、最新、最热排序
 * @param page {number} 当前页数
 * @param _sort {string} 排序类型：recommend / newest / hottest
 * @param where {WhereOptions<RecommendAttributes>} 过滤条件
 * @return {Promise<{total: number, list: any[]}>} 返回总数和文章列表数据
 */
async function getArticleListData(
  page: number,
  _sort: "recommend" | "newest" | "hottest",
  where?: { tag_id?: number | number[]; author?: number },
) {
  const order = sort[_sort];

  return await DB.Recommend.findAndCountAll({
    include: [
      {
        model: DB.Article,
        where: where?.author ? where : {},
        as: "article_data", // 使用关联时定义的别名
        attributes: [
          "id",
          "title", // 获取标题
          "description", // 获取描述
          "view_count",
          "cover_file_name",
          "cover_url",
          "author",
          "update_time",
          "create_time",
          [
            Sequelize.literal(
              `(SELECT COUNT(id) FROM comment WHERE comment.belong_id = article_data.id and type="article")`,
            ),
            "comment_count",
          ],
          [
            Sequelize.literal(
              `(SELECT COUNT(id) FROM likes WHERE likes.belong_id = article_data.id)`,
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
            where: where?.tag_id ? where : {},
            include: [
              {
                model: DB.Tag, // 假设 tag 表有 tag 字段
                as: "tag_data", // 为 tag 设置别名
                attributes: ["id", "name"], // 选择 tag 表中的 id 和 name 字段
              },
            ],
          },
        ],
      },
    ],
    order: order as any,
    offset: (page - 1) * 10,
    limit: 10,
  })
    .then(({ count, rows }) => {
      return {
        total: count,
        list: rows.map((row) => {
          let item = row.toJSON();
          let article = (item as any).article_data;

          // 从关联的 tag_article_list 中提取 tag
          let tag = article.tag_article_list.map(
            (article_tag: any) => ({
              id: article_tag.tag_data.id,
              name: article_tag.tag_data.name,
            }), // 返回对象形式 { id, name }
          );

          return {
            id: article.id,
            title: article.title,
            description: article.description,
            author_data: article.author_data,
            view_count: article.view_count,
            comment_count: article.comment_count,
            like_count: article.like_count,
            cover_url: article.cover_url,
            create_time: article.create_time,
            update_time: article.update_time,
            content: article.content,
            tag: tag, // 将 tag 作为对象数组返回
          };
        }),
      };
    })
    .catch((err) => {
      console.error("Error in fetching article list:", err);
      return {
        total: 0,
        list: [],
      };
    });
}

export default getArticleListData;
