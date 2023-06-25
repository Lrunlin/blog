import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface CollectionAttributes {
  id: number;
  belong_id: number;
  favorites_id: string;
  type: string;
  user_id: number;
  create_time: Date;
}

export type CollectionPk = "id";
export type CollectionId = Collection[CollectionPk];
export type CollectionCreationAttributes = CollectionAttributes;

export class Collection
  extends Model<CollectionAttributes, CollectionCreationAttributes>
  implements CollectionAttributes
{
  id!: number;
  belong_id!: number;
  favorites_id!: string;
  type!: string;
  user_id!: number;
  create_time!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Collection {
    return sequelize.define(
      "Collection",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "ID",
        },
        belong_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "文章ID",
        },
        favorites_id: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: "所属收藏夹的ID集合",
          set(this, val: string[]) {
            this.setDataValue("favorites_id", val.join(","));
          },
          get() {
            let favorites_id = this.getDataValue("favorites_id");
            return favorites_id && /^[\s\S]*.*[^\s][\s\S]*$/.test(favorites_id)
              ? favorites_id.split(",").map(item => +item)
              : [];
          },
        },
        type: {
          type: DataTypes.STRING(20),
          allowNull: false,
          comment: "article或者problem",
        },
        user_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "用户ID",
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "收藏时间",
        },
      },
      {
        tableName: "collection",
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
    ) as typeof Collection;
  }
}
