import DB from "@/db";
import { Op } from "sequelize";
import Sequelize from "@/db/config";

export interface sortArticleListType {
  id: number;
  view_count: number;
  like_count: number;
  comment_count: number;
  collection_count: number;
}

/** 查询文章数据函数:文章查询需要的属性以及表关联属性
 * @params page {number} 页数
 * @params _sort {"recommend" | "newest" | "hottest"} 类型错误
 * @params where {SequelizeWhere} where条件
 * @return 查询好的数据
 */
async function getSortArticleList(page: number) {
  return await DB.Article.findAll({
    offset: (page - 1) * 1000,
    limit: 1000,
    attributes: {
      include: [
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
        [
          Sequelize.literal(
            `(SELECT COUNT(id) FROM collection WHERE collection.belong_id = article.id)`,
          ),
          "collection_count",
        ],
      ],
    },
    order: [["id", "desc"]],
    where: {
      state: 1,
      // 要求更新文章推荐表时，不存储2小时内发布或者被更新的文章
      create_time: { [Op.lt]: new Date(+new Date() - 7_200_000) },
      [Op.or]: [
        { update_time: null as any },
        { update_time: { [Op.lt]: new Date(+new Date() - 7_200_000) } },
      ],
    },
  })
    .then((rows) => {
      return rows.map((row) => {
        let item = row.toJSON();
        return {
          id: item.id,
          view_count: item.view_count,
          like_count: (item as any).like_count,
          comment_count: (item as any).comment_count,
          collection_count: (item as any).collection_count,
        } as unknown as sortArticleListType;
      });
    })
    .catch((err) => {
      console.log(err);
      return [] as sortArticleListType[];
    });
}
export default getSortArticleList;
