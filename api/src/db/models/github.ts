import { DataTypes } from "sequelize";
import assetsPath from '@/store/assetsPath';
import sequelize from "../config";
import type { GitHubInstance } from "../types";

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
    image: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "预览图片",
      get() {
        let url = this.getDataValue("image");
        return `${assetsPath}github/${url}`;
      },
    },
    languages: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "使用什么语言编写的项目",
      set(value: string[]) {
        this.setDataValue("languages", value.join(","));
      },
      get() {
        let type = this.getDataValue("languages");
        return type.split(",");
      },
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
  }
);
