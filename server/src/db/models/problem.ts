import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import dehydrate from "@/common/utils/xss/article";

export interface ProblemAttributes {
  id: number;
  title: string;
  content: string;
  author: number;
  answer_id?: number;
  theme_id: number;
  view_count: number;
  create_time: Date;
  update_time?: Date;
}

export type ProblemPk = "id";
export type ProblemId = Problem[ProblemPk];
export type ProblemOptionalAttributes = "answer_id" | "update_time";
export type ProblemCreationAttributes = Optional<
  ProblemAttributes,
  ProblemOptionalAttributes
>;

export class Problem
  extends Model<ProblemAttributes, ProblemCreationAttributes>
  implements ProblemAttributes
{
  id!: number;
  title!: string;
  content!: string;
  author!: number;
  answer_id?: number;
  theme_id!: number;
  view_count!: number;
  create_time!: Date;
  update_time?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Problem {
    return sequelize.define(
      "Problem",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "ID",
        },
        title: {
          type: DataTypes.STRING(200),
          allowNull: false,
          comment: "问题题目",
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: "问题内容",
          set(this, val) {
            this.setDataValue("content", dehydrate(val as string, "problem"));
          },
        },
        author: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "发布人ID",
        },
        answer_id: {
          type: DataTypes.BIGINT,
          allowNull: true,
          comment: "采纳答案的ID",
        },
        theme_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "主题ID默认default的ID",
        },
        view_count: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "阅读量",
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "发布时间",
        },
        update_time: {
          type: DataTypes.DATE,
          allowNull: true,
          comment: "最后更新时间",
        },
      },
      {
        tableName: "problem",
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
    ) as typeof Problem;
  }
}
