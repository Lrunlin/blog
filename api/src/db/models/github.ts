import { DataTypes } from "sequelize";
import sequelize from "../config";
import type { GitHubInstance } from "../types";
import cache from "@/db/hooks/cache";

export default sequelize.define<GitHubInstance>(
  "github",
  {
    id: {
      type: DataTypes.STRING(60),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "项目名称",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "项目介绍",
    },
    url: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "项目地址",
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
      comment: "更新时间",
    },
  },
  {
    tableName: "github",
    timestamps: false,
    hooks:cache
  }
);
