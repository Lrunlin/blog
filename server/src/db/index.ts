import sequelizeConfig from "./config";
import { initModels } from "./models/init-models";

const Models = initModels(sequelizeConfig);

export default Models;

//进行表关联
Models.Article.belongsTo(Models.User, {
  as: "author_data",
  foreignKey: "author",
  targetKey: "id",
});
Models.Comment.belongsTo(Models.User, {
  as: "user_data",
  foreignKey: "user_id",
  targetKey: "id",
});
Models.FriendlyLink.belongsTo(Models.User, {
  as: "user_data",
  foreignKey: "user_id",
  targetKey: "id",
});

// Collection 属于一个 Article
Models.Collection.belongsTo(Models.Article, {
  foreignKey: "belong_id", // 收藏表中的外键
  targetKey: "id", // 文章表的主键
  as: "article_data", // 关联别名，用于查询时的字段名
});

// Article 可以有多个 Collection
Models.Article.hasMany(Models.Collection, {
  foreignKey: "belong_id", // 收藏表中的外键
  sourceKey: "id", // 文章表的主键
  as: "collection_data", // 关联别名，用于查询时的字段名
});

Models.Follow.belongsTo(Models.User, {
  as: "user_data",
  targetKey: "id",
  foreignKey: "belong_id",
});

Models.Problem.belongsTo(Models.Answer, {
  foreignKey: "answer_id",
  targetKey: "id",
});
// Answer根据problem_id生成问题中的answer_list;
Models.Problem.hasMany(Models.Answer, {
  as: "answer_list",
  foreignKey: "problem_id",
  sourceKey: "id",
});

Models.Problem.belongsTo(Models.Follow, {
  as: "follow_data",
  foreignKey: "id",
  targetKey: "belong_id",
});

Models.Problem.belongsTo(Models.User, {
  as: "author_data",
  foreignKey: "author",
  targetKey: "id",
});
Models.Problem.hasMany(Models.Comment, {
  as: "comment_data",
  foreignKey: "belong_id",
  sourceKey: "id",
});
Models.Problem.hasMany(Models.Collection, {
  as: "collection_data",
  foreignKey: "belong_id",
  sourceKey: "id",
});
// Models.Collection.belongsTo(Models.Problem, { foreignKey: "belong_id", targetKey: "id" });

Models.Problem.belongsTo(Models.Likes, {
  as: "like_data",
  foreignKey: "id",
  targetKey: "belong_id",
});

Models.Answer.hasMany(Models.Likes, {
  foreignKey: "belong_id",
  sourceKey: "id",
  as: "like_data",
});

Models.Answer.belongsTo(Models.User, {
  as: "author_data",
  foreignKey: "author",
  targetKey: "id",
});
Models.Answer.hasMany(Models.Comment, {
  as: "comment_data",
  foreignKey: "belong_id",
  sourceKey: "id",
});

Models.Article.hasMany(Models.Likes, {
  foreignKey: "belong_id",
  sourceKey: "id",
  as: "like_data",
});
Models.Likes.belongsTo(Models.Article, {
  foreignKey: "belong_id",
  targetKey: "id",
  as: "like_data",
});

Models.Article.hasMany(Models.Comment, {
  foreignKey: "id",
  sourceKey: "id",
  as: "comment_data",
});
Models.Comment.belongsTo(Models.Article, {
  foreignKey: "id",
  targetKey: "id",
  as: "comment_data",
});

Models.Favorites.hasMany(Models.Collection, {
  foreignKey: "id",
  sourceKey: "id",
  as: "favorites_data",
});
Models.Collection.belongsTo(Models.Favorites, {
  foreignKey: "id",
  targetKey: "id",
  as: "favorites_data",
});

// Tag 和 ArticleTag 之间的关系，表示 Tag 可以有多个 ArticleTag
Models.Tag.hasMany(Models.ArticleTag, {
  foreignKey: "tag_id", // 外键是 tag_id
  sourceKey: "id", // 源字段是 tag 的 id
  as: "tag_data", // 关联名称，可以在查询时使用
});

// ArticleTag 和 Tag 之间的关系，表示 ArticleTag 属于一个 Tag
Models.ArticleTag.belongsTo(Models.Tag, {
  foreignKey: "tag_id", // 外键是 tag_id
  targetKey: "id", // 目标字段是 tag 的 id
  as: "tag_data", // 关联名称，可以在查询时使用
});

// Recommend 和 Article 之间的多对多关系，不再直接关联，改为通过查询时联接
// 你可以在查询时根据需要将推荐表和文章表联接
// 不需要在模型中直接配置 Recommend 和 Article 的多对多关系

// 下面是推荐表（Recommend）和文章表（Article）的联接，直接查询时进行联接
Models.Recommend.hasOne(Models.Article, {
  foreignKey: "id", // 可以改为对应的外键字段
  sourceKey: "id",
  as: "article_data",
});

// Article 和 ArticleTag 之间的一对多关系
Models.Article.hasMany(Models.ArticleTag, {
  foreignKey: "belong_id", // 外键是 article_id
  sourceKey: "id", // 源字段是 article 的 id
  as: "tag_article_list", // 关联名称，可以在查询时使用
});

// ArticleTag 和 Article 之间的多对一关系
Models.ArticleTag.belongsTo(Models.Article, {
  foreignKey: "belong_id", // 外键是 article_id
  targetKey: "id", // 目标字段是 article 的 id
  as: "tag_article_list", // 关联名称，可以在查询时使用
});

// Problem 和 ArticleTag 之间的一对多关系
Models.Problem.hasMany(Models.ArticleTag, {
  foreignKey: "belong_id", // 外键是 article_id
  sourceKey: "id", // 源字段是 article 的 id
  as: "tag_problem_list", // 关联名称，可以在查询时使用
});

// ArticleTag 和 Problem 之间的多对一关系
Models.ArticleTag.belongsTo(Models.Problem, {
  foreignKey: "belong_id", // 外键是 article_id
  targetKey: "id", // 目标字段是 article 的 id
  as: "tag_problem_list", // 关联名称，可以在查询时使用
});
