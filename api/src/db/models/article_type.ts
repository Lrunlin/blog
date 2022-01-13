import { DataTypes } from "sequelize";
import sequelize from "../config";
import type { ArticleTypeInstance } from "../types";
export default sequelize.define<ArticleTypeInstance>(
  "article_type",
  {
    type: {
      type: DataTypes.STRING(60),
      allowNull: false,
      primaryKey: true,
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
  }
);