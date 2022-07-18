import { DataTypes } from "sequelize";
import sequelize from "../config";
import type { CommentInstance } from "../types";

export default sequelize.define<CommentInstance>(
  "comment",
  {
    id: {
      type: DataTypes.STRING(60),
      allowNull: false,
      primaryKey: true,
    },
    commentator: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "评论者",
    },
    superior: {
      type: DataTypes.STRING(60),
      allowNull: true,
      comment: "评论的上级",
    },
    articleId: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "评论在什么地方（文章/公共）",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "评论内容",
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => new Date(),
    },
  },
  {
    tableName: "comment",
    timestamps: false,
  }
);
