import { Op, Order } from "sequelize";
import Sequelize from "@/db/config";
import DB from "@/db";
import getTagData from "@/common/modules/article/get/get-tag-data";
import setDescription from "@/common/modules/article/get/set-description";
import { sort } from "@/common/modules/tasks/set-recommend-data";

/** 文章查询需要的属性以及表关联属性
 * @params page {number} 页数
 * @params _sort {"recommend" | "newest" | "hottest"} 类型错误
 * @params where {SequelizeWhere} where条件
 * @return 查询好的数据
 */
async function getSortArticleList(_sort: "recommend" | "newest" | "hottest", page: number) {
  return await DB.Article.findAll({
    offset: (page - 1) * 1000,
    limit: 1000,
    attributes: {
      include: [
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
    },
    include: [
      {
        model: DB.User,
        as: "author_data",
        attributes: ["id", "name"],
      },
    ],
    order: sort[_sort] as Order,
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
    .then(rows => {
      return rows.map((row, index) => {
        let item = row.toJSON();
        let description = setDescription(item.content);
        let tag = getTagData(item.tag as unknown as number[], ["id", "name"]);
        return {
          sort: _sort,
          data: {
            id: item.id,
            title: item.title,
            description: description,
            tag: tag,
            [_sort]: (page - 1) * 1000 + index + 1,
            author: (item as any).author_data,
            cover: (item as any).cover_url,
            update_time: item.update_time,
            create_time: item.create_time,
            view: {
              view_count: item.view_count,
              like_count: (item as any).like_count,
              comment_count: (item as any).comment_count,
            },
          },
        };
      });
    })
    .catch(err => {
      console.log(err);
      return [] as any[];
    });
}
export default getSortArticleList;
