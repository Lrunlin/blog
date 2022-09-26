import Sequelize from "@/db/config";
import DB from "@/db";

/** 文章查询需要的属性以及表关联属性*/
const option = {
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
  offset: 0,
  limit: 800,
  order: [
    ["reprint", "asc"],
    ["view_count", "desc"],
    ["create_time", "desc"],
    ["update_time", "desc"],
  ],
} as any;
export default option;
