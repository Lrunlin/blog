import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface FavoritesAttributes {
  id: number;
  user_id: number;
  name: any;
  description?: string;
  is_private: number;
  create_time: Date;
}

export type FavoritesPk = "id";
export type FavoritesId = Favorites[FavoritesPk];
export type FavoritesOptionalAttributes = "description";
export type FavoritesCreationAttributes = Optional<
  FavoritesAttributes,
  FavoritesOptionalAttributes
>;

export class Favorites
  extends Model<FavoritesAttributes, FavoritesCreationAttributes>
  implements FavoritesAttributes
{
  id!: number;
  user_id!: number;
  name!: any;
  description?: string;
  is_private!: number;
  create_time!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Favorites {
    return sequelize.define(
      "Favorites",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "ID",
        },
        user_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "用户ID",
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: "标题",
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
          comment: "介绍",
        },
        is_private: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          comment: "是否设置为隐私文件夹",
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "创建时间",
        },
      },
      {
        tableName: "favorites",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
        ],
      }
    ) as typeof Favorites;
  }
}
