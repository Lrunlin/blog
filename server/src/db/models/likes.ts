import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface LikesAttributes {
  id: number;
  type: string;
  user_id: number;
  belong_id: number;
  create_time: Date;
}

export type LikesPk = "id";
export type LikesId = Likes[LikesPk];
export type LikesCreationAttributes = LikesAttributes;

export class Likes
  extends Model<LikesAttributes, LikesCreationAttributes>
  implements LikesAttributes
{
  id!: number;
  type!: string;
  user_id!: number;
  belong_id!: number;
  create_time!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Likes {
    return sequelize.define(
      "Likes",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "记录ID",
        },
        type: {
          type: DataTypes.STRING(20),
          allowNull: false,
          comment: "article或者problem、answer",
        },
        user_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "用户ID",
        },
        belong_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "文章ID",
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "点赞时间",
        },
      },
      {
        tableName: "likes",
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
    ) as typeof Likes;
  }
}
