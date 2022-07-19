import sequelizeConfig from "./config";
import { initModels } from "./models/init-models";


import DB from '@/db';


export default initModels(sequelizeConfig);

DB.Article.belongsTo(DB.User, { as: "author_data", foreignKey: "author", targetKey: "id" });