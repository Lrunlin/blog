import type { Order, WhereOptions } from "sequelize";
import type { ArticleAttributes } from "@/db/models/init-models";
import Sequelize from "@/db/config";
import DB from "@/db";
import getTagData from "@/common/modules/article/get/get-tag-data";
import setDescription from "@/common/modules/article/get/set-description";

let sort = {
  recommend: [
    ["update_time", "desc"],
    ["comment_count", "desc"],
    ["create_time", "desc"],
    ["reprint", "asc"],
    ["collection_count", "desc"],
    ["view_count", "desc"],
  ],
  newest: [
    ["create_time", "desc"],
    ["update_time", "desc"],
    ["reprint", "asc"],
    ["collection_count", "desc"],
    ["comment_count", "desc"],
  ],
  hottest: [
    ["collection_count", "desc"],
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
          let item=row.toJSON();
          let _description = setDescription<typeof item>(item)
          let _item = getTagData<typeof _description>(_description, ["name"]);
          delete (_item as any).state;
          delete (_item as any).content;
          delete (_item as any).reprint;
          delete (_item as any).cover_file_name;
          return _item;
        }),
      };
    })
    .catch(err => {
      console.log(err);
      return {
        tptal: 0,
        list: [],
      };
    });
}
export default getArticleListData;
