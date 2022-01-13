import { DataTypes, Model, Optional } from "sequelize";

interface articleTypeAttributes {
  type: string;
  time?: Date;
  isShow: boolean;
}
interface ArticleTypesCreationAttributes extends Optional<articleTypeAttributes, "type"> {}
interface ArticleTypeInstance
  extends Model<articleTypeAttributes, ArticleTypesCreationAttributes>,
    articleTypeAttributes {}
export type { ArticleTypeInstance };
