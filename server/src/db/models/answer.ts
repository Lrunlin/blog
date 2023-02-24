import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import dehydrate from "@/common/utils/xss/article";

export interface AnswerAttributes {
  id: number;
  problem_id: number;
  content: string;
  author: number;
  create_time: Date;
}

export type AnswerPk = "id";
export type AnswerId = Answer[AnswerPk];
export type AnswerCreationAttributes = AnswerAttributes;

export class Answer
  extends Model<AnswerAttributes, AnswerCreationAttributes>
  implements AnswerAttributes
{
  id!: number;
  problem_id!: number;
  content!: string;
  author!: number;
  create_time!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Answer {
    return sequelize.define(
      "Answer",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "ID",
        },
        problem_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "问题ID",
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: "回答内容",
          set(this, val) {
            this.setDataValue("content", dehydrate(val as string, "answer"));
          },
        },
        author: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "回答者ID",
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "回答时间",
        },
      },
      {
        tableName: "answer",
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
    ) as typeof Answer;
  }
}
