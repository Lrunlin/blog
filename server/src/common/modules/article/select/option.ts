import type { WhereOptions } from "sequelize";
import type { RecommendAttributes } from "@/db/models/init-models";
import { Op } from "sequelize";
import DB from "@/db";

/** 文章推荐列表查询*/
async function getArticleListData(
  page: number,
  _sort: "recommend" | "newest" | "hottest",
  where: WhereOptions<RecommendAttributes>
) {
  return Promise.all([
    DB.Recommend.count({
      where: {
        [_sort]: {
          [Op.not]: null,
        },
        ...where,
      },
      attributes: ["id"],
    }),
    DB.Recommend.findAll({
      raw: true,
      limit: 10,
      order: [[_sort, "asc"]],
      attributes: { exclude: ["newest", "recommend", "hottest"] },
      where: {
        [_sort]: {
          [Op.gt]: (page - 1) * 10,
        },
        ...where,
      },
    }),
  ])
    .then(([count, rows]) => {
      return {
        total: count,
        list: rows.map(item => ({
          ...item,
          cover_url: item.cover,
          view_count: (item.view as any).view_count,
          like_count: (item.view as any).like_count,
          comment_count: (item.view as any).comment_count,
          author_data: item.author,
          view: undefined,
          cover: undefined,
          author: undefined,
        })),
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
