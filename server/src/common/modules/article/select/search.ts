import type { Order, WhereOptions } from "sequelize";
import type { ArticleAttributes } from "@/db/models/init-models";
import Sequelize from "@/db/config";
import DB from "@/db";
import getTagData from "@/common/modules/article/get/set-tag-data";
import setDescription from "@/common/modules/article/get/set-description";

let sort = {
  recommend: [
    ["update_time", "desc"],
    ["comment_count", "desc"],
    ["create_time", "desc"],
    ["reprint", "asc"],
    ["like_count", "desc"],
    ["view_count", "desc"],
  ],
  newest: [
    ["create_time", "desc"],
    ["update_time", "desc"],
    ["reprint", "asc"],
    ["like_count", "desc"],
    ["comment_count", "desc"],
  ],
  hottest: [
    ["like_count", "desc"],
    ["create_time", "desc"],
    ["view_count", "desc"],
    ["comment_count", "desc"],
    ["update_time", "desc"],
    ["reprint", "asc"],
  ],
};

/** 文章查询需要的属性以及表关联属性
 * @params page {number} 页数
 * @params _sort {"recommend" | "newest" | "hottest"} 类型错误
 * @params where {SequelizeWhere} where条件
 * @return 查询好的数据
 */
async function getArticleListData(
  page: number,
  _sort: "recommend" | "newest" | "hottest",
  where?: WhereOptions<ArticleAttributes>
) {
  return await DB.Article.findAndCountAll({
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
      "content",
      "reprint",
      [
        Sequelize.literal(
          `(SELECT COUNT(id) FROM comment WHERE comment.belong_id = article.id and type="article")`
        ),
        "comment_count",
      ],
      [
        Sequelize.literal(`(SELECT COUNT(id) FROM likes WHERE likes.belong_id = article.id)`),
        "like_count",
      ],
    ],
    include: [
      {
        model: DB.User,
        as: "author_data",
        attributes: ["name"],
      },
    ],
    order: sort[_sort] as Order,
    offset: (page - 1) * 10,
    limit: 10,
    where: { state: 1, ...(where || {}) },
  })
    .then(({ count, rows }) => {
      return {
        total: count,
        list: rows.map(row => {
          let item = row.toJSON();
          let description = setDescription(item.content);
          let tag = getTagData(item.tag as unknown as number[], ["name"]);
          return Object.assign(item, {
            description,
            tag,
            state: undefined,
            content: undefined,
            reprint: undefined,
            cover_file_name: undefined,
          });
        }),
      };
    })
    .catch(err => {
      console.log(err);
      return {
        total: 0,
        list: [],
      };
    });
}
export default getArticleListData;
