import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AdvertisementAttributes {
  id: number;
  indexes: number;
  poster_file_name: string;
  url?: string;
  create_time: Date;
}

export type AdvertisementPk = "id";
export type AdvertisementId = Advertisement[AdvertisementPk];
export type AdvertisementOptionalAttributes = "url" | "create_time";
export type AdvertisementCreationAttributes = Optional<AdvertisementAttributes, AdvertisementOptionalAttributes>;

export class Advertisement extends Model<AdvertisementAttributes, AdvertisementCreationAttributes> implements AdvertisementAttributes {
  id!: number;
  indexes!: number;
  poster_file_name!: string;
  url?: string;
  create_time!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Advertisement {
    return sequelize.define('Advertisement', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "ID"
    },
    indexes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "排序索引值"
    },
    poster_file_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "海报文件名称"
    },
    url: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "活动地址"
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    }
  }, {
    tableName: 'advertisement',
    timestamps: false
  }) as typeof Advertisement;
  }
}
