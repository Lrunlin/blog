import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface ArticleTagAttributes {
  id: number;
  belong_id: number;
  type: string;
  tag_id: number;
}

export type ArticleTagPk = "id";
export type ArticleTagId = ArticleTag[ArticleTagPk];
export type ArticleTagCreationAttributes = ArticleTagAttributes;

export class ArticleTag
  extends Model<ArticleTagAttributes, ArticleTagCreationAttributes>
  implements ArticleTagAttributes
{
  id!: number;
  belong_id!: number;
  type!: string;
  tag_id!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ArticleTag {
    return sequelize.define(
      "ArticleTag",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "记录ID",
        },
        belong_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "关联ID",
        },
        type: {
          type: DataTypes.STRING(20),
          allowNull: false,
          comment: "article或者problem",
        },
        tag_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "标签ID",
        },
      },
      {
        tableName: "article_tag",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
        ],
      },
    ) as typeof ArticleTag;
  }
}
