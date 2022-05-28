import { DataTypes } from "sequelize";
import sequelize from "../config";
import type { LinksInstance } from "../types";
import cache from "@/db/hooks/cache";

export default sequelize.define<LinksInstance>(
  "links",
  {
    id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    drainage: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
  },
  {
    tableName: "links",
    timestamps: false,
    hooks:cache
  }
);
