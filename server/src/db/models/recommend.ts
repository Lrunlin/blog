import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface RecommendAttributes {
  id: number;
  title: string;
  description: string;
  author: object;
  cover?: string;
  tag: object;
  create_time: Date;
  update_time?: Date;
  view: object;
  recommend?: number;
  newest?: number;
  hottest?: number;
}

export type RecommendPk = "id";
export type RecommendId = Recommend[RecommendPk];
export type RecommendOptionalAttributes =
  | "cover"
  | "update_time"
  | "recommend"
  | "newest"
  | "hottest";
export type RecommendCreationAttributes = Optional<
  RecommendAttributes,
  RecommendOptionalAttributes
>;

export class Recommend
  extends Model<RecommendAttributes, RecommendCreationAttributes>
  implements RecommendAttributes
{
  id!: number;
  title!: string;
  description!: string;
  author!: object;
  cover?: string;
  tag!: object;
  create_time!: Date;
  update_time?: Date;
  view!: object;
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
        title: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: "文章标题",
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: "文章介绍",
        },
        author: {
          type: DataTypes.JSON,
          allowNull: false,
          comment: "文章发布者信息",
        },
        cover: {
          type: DataTypes.STRING(200),
          allowNull: true,
          comment: "封面地址",
        },
        tag: {
          type: DataTypes.JSON,
          allowNull: false,
          comment: "文章类型",
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "文章发布时间",
        },
        update_time: {
          type: DataTypes.DATE,
          allowNull: true,
          comment: "文章最新更新时间",
        },
        view: {
          type: DataTypes.JSON,
          allowNull: false,
          comment: "存储文章的阅读、点赞、评论数量",
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
      }
    ) as typeof Recommend;
  }
}
