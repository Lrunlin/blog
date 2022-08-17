import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface AdvertisementAttributes {
  id: number;
  position: string;
  indexes: number;
  poster_file_name: string;
  url?: string;
  create_time: Date;
}

export type AdvertisementPk = "id";
export type AdvertisementId = Advertisement[AdvertisementPk];
export type AdvertisementOptionalAttributes = "url" | "create_time";
export type AdvertisementCreationAttributes = Optional<
  AdvertisementAttributes,
  AdvertisementOptionalAttributes
>;

export class Advertisement
  extends Model<AdvertisementAttributes, AdvertisementCreationAttributes>
  implements AdvertisementAttributes
{
  id!: number;
  position!: string;
  indexes!: number;
  poster_file_name!: string;
  url?: string;
  create_time!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Advertisement {
    return sequelize.define(
      "Advertisement",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          comment: "ID",
        },
        position: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "在那个页面的推广",
        },
        indexes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "排序索引值",
        },
        poster_file_name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "海报文件名称",
        },
        poster_url: {
          type: DataTypes.VIRTUAL,
          get(this) {
            let poster_file_name = this.getDataValue("poster_file_name");
            return `${process.env.CDN}/advertisement/${poster_file_name}`;
          },
        },
        url: {
          type: DataTypes.STRING(200),
          allowNull: true,
          comment: "活动地址",
          set(this, val: string) {
            let value = val && /^[\s\S]*.*[^\s][\s\S]*$/.test(val) ? val : null;
            this.setDataValue("url", value as any);
          },
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
          comment: "创建时间",
        },
      },
      {
        tableName: "advertisement",
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
    ) as typeof Advertisement;
  }
}
