import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface RecommendAttributes {
  id: number;
  recommend?: number;
  newest?: number;
  hottest?: number;
}

export type RecommendPk = "id";
export type RecommendId = Recommend[RecommendPk];
export type RecommendOptionalAttributes = "recommend" | "newest" | "hottest";
export type RecommendCreationAttributes = Optional<
  RecommendAttributes,
  RecommendOptionalAttributes
>;

export class Recommend
  extends Model<RecommendAttributes, RecommendCreationAttributes>
  implements RecommendAttributes
{
  id!: number;
  recommend?: number;
  newest?: number;
  hottest?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Recommend {
    return sequelize.define(
      "Recommend",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "文章ID",
        },
        recommend: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "推荐查询的索引值",
        },
        newest: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "最新查询的索引值",
        },
        hottest: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "最热查询的索引值",
        },
      },
      {
        tableName: "recommend",
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
    ) as typeof Recommend;
  }
}
