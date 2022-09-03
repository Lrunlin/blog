import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface LinksAttributes {
  id: number;
  name: string;
  url: string;
  user_id: number;
  state: number;
  logo_file_name: string;
  create_time: Date;
}

export type LinksPk = "id";
export type LinksId = Links[LinksPk];
export type LinksCreationAttributes = LinksAttributes;

export class Links
  extends Model<LinksAttributes, LinksCreationAttributes>
  implements LinksAttributes
{
  id!: number;
  name!: string;
  url!: string;
  user_id!: number;
  state!: number;
  logo_file_name!: string;
  create_time!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Links {
    return sequelize.define(
      "Links",
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
          comment: "网站名称",
        },
        url: {
          type: DataTypes.STRING(120),
          allowNull: false,
          comment: "网站链接",
          unique: "url",
        },
        user_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "对应用户的ID",
          unique: "user_id",
        },
        state: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "状态",
        },
        logo_file_name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "图片Logo",
        },
        logo_url: {
          type: DataTypes.VIRTUAL,
          get(this) {
            let logo_file_name = this.getDataValue("logo_file_name");
            return `${process.env.CDN}/links/${logo_file_name}`;
          },
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "加入时间",
        },
      },
      {
        tableName: "links",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "url",
            unique: true,
            using: "BTREE",
            fields: [{ name: "url" }],
          },
          {
            name: "user_id",
            unique: true,
            using: "BTREE",
            fields: [{ name: "user_id" }],
          },
        ],
      }
    ) as typeof Links;
  }
}
