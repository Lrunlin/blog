import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import xss from "@/common/utils/xss/comment";

export interface CommentAttributes {
  id: number;
  type: string;
  belong_id: number;
  user_id: number;
  content: string;
  reply?: number;
  comment_pics?: string;
  is_review: number;
  create_time: Date;
}

export type CommentPk = "id";
export type CommentId = Comment[CommentPk];
export type CommentOptionalAttributes = "reply" | "comment_pics";
export type CommentCreationAttributes = Optional<CommentAttributes, CommentOptionalAttributes>;

export class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  id!: number;
  type!: string;
  belong_id!: number;
  user_id!: number;
  content!: string;
  reply?: number;
  comment_pics?: string;
  is_review!: number;
  create_time!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Comment {
    return sequelize.define(
      "Comment",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "ID",
        },
        type: {
          type: DataTypes.STRING(20),
          allowNull: false,
          comment: "article或者problem、answer",
        },
        belong_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "所属上级的ID",
        },
        user_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "用户ID",
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: "内容",
          set(this, val) {
            this.setDataValue("content", xss(val as string));
          },
        },
        reply: {
          type: DataTypes.BIGINT,
          allowNull: true,
          comment: "是否是对某个评论的回复，不是则为null是则为对应的评论id",
        },
        comment_pics: {
          type: DataTypes.STRING(200),
          allowNull: true,
          comment: "评论中使用到的图片",
          get(this) {
            let comment_pics = this.getDataValue("comment_pics");
            return comment_pics ? `${process.env.CDN}/comment/${comment_pics}` : comment_pics;
          },
        },
        is_review: {
          type: DataTypes.TINYINT,
          allowNull: false,
          comment: "是否已经审查了",
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "评论时间",
        },
      },
      {
        tableName: "comment",
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
    ) as typeof Comment;
  }
}
