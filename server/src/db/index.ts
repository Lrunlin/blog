import sequelizeConfig from "./config";
import { initModels } from "./models/init-models";

const Models = initModels(sequelizeConfig);

export default Models;

//进行表关联
Models.Article.belongsTo(Models.User, { as: "author_data", foreignKey: "author", targetKey: "id" });
Models.Comment.belongsTo(Models.User, { as: "user_data", foreignKey: "user_id", targetKey: "id" });
Models.Links.belongsTo(Models.User, { as: "user_data", foreignKey: "user_id", targetKey: "id" });
