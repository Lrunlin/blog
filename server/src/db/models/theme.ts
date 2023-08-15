import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface ThemeAttributes {
  id: number;
  name: string;
  content: string;
  author: number;
  state: number;
  indexes: number;
  create_time: Date;
}

export type ThemePk = "id";
export type ThemeId = Theme[ThemePk];
export type ThemeCreationAttributes = ThemeAttributes;

export class Theme
  extends Model<ThemeAttributes, ThemeCreationAttributes>
  implements ThemeAttributes
{
  id!: number;
  name!: string;
  content!: string;
  author!: number;
  state!: number;
  indexes!: number;
  create_time!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Theme {
    return sequelize.define(
      "Theme",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "ID",
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: "主题名称",
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: "CSS样式内容",
        },
        author: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "创建者ID",
        },
        state: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "状态 1为使用 0为正在申请",
        },
        indexes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "排序",
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "创建时间",
        },
      },
      {
        tableName: "theme",
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
    ) as typeof Theme;
  }
}
