import sequelizeConfig from "./config";
import { initModels } from "./models/init-models";

import DB from "@/db";

const Models = initModels(sequelizeConfig);

export default Models;

DB.Article.belongsTo(DB.User, { as: "author_data", foreignKey: "author", targetKey: "id" });
DB.Comment.belongsTo(DB.User, { as: "user_data", foreignKey: "user_id", targetKey: "id" });