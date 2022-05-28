import { DataTypes } from "sequelize";
import sequelize from "../config";
import type { ArticleTypeInstance } from "../types";
import cache from "@/db/hooks/cache";
export default sequelize.define<ArticleTypeInstance>(
  "article_type",
  {
    id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: "type",
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    isShow: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "是否显示在侧边栏",
    },
  },
  {
    tableName: "article_type",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "type" }],
      },
    ],
    hooks: cache
  }
);
