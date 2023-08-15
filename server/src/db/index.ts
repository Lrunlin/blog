import sequelizeConfig from "./config";
import { initModels } from "./models/init-models";

const Models = initModels(sequelizeConfig);

export default Models;

//进行表关联
Models.Article.belongsTo(Models.User, { as: "author_data", foreignKey: "author", targetKey: "id" });
Models.Comment.belongsTo(Models.User, { as: "user_data", foreignKey: "user_id", targetKey: "id" });
Models.FriendlyLink.belongsTo(Models.User, {
  as: "user_data",
  foreignKey: "user_id",
  targetKey: "id",
});
Models.Collection.belongsTo(Models.Article, { foreignKey: "belong_id", targetKey: "id" });

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

Models.Problem.belongsTo(Models.User, { as: "author_data", foreignKey: "author", targetKey: "id" });
Models.Problem.hasMany(Models.Comment, {
  as: "comment_list",
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

Models.Answer.belongsTo(Models.User, { as: "author_data", foreignKey: "author", targetKey: "id" });
Models.Answer.hasMany(Models.Comment, {
  as: "comment_list",
  foreignKey: "belong_id",
  sourceKey: "id",
});

Models.Article.hasMany(Models.Likes, { foreignKey: "belong_id", sourceKey: "id", as: "like_data" });
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
