import { DataTypes } from "sequelize";

import sequelize from "../config";
import type { ApiInstance } from "../types";

export default sequelize.define<ApiInstance>(
  "api",
  {
    id: {
      type: DataTypes.STRING(60),
      allowNull: false,
      primaryKey: true,
      unique: "id",
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: "name",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
  },
  {
    tableName: "api",
    timestamps: false,
  }
);
