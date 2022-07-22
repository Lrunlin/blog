import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import typeCache from "@/db/hooks/typeCache";

export interface TagAttributes {
  id: number;
  name: string;
  belong: number;
  icon_url?: string;
  time: Date;
  indexes: number;
}

export type TagPk = "id";
export type TagId = Tag[TagPk];
export type TagOptionalAttributes = "icon_url";
export type TagCreationAttributes = Optional<TagAttributes, TagOptionalAttributes>;

export class Tag extends Model<TagAttributes, TagCreationAttributes> implements TagAttributes {
  id!: number;
  name!: string;
  belong!: number;
  icon_url?: string;
  time!: Date;
  indexes!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Tag {
    return sequelize.define(
      "Tag",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "ID",
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "tag名称",
          unique: "name",
        },
        belong: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "所属Type的ID",
        },
        icon_url: {
          type: DataTypes.STRING(255),
          allowNull: true,
          comment: "ICON地址",
          get(this) {
            let icon_url = this.getDataValue("icon_url");
            return icon_url ? `${process.env.cdn}/type/${icon_url}` : null;
          },
        },
        time: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "创建时间",
        },
        indexes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "索引值",
        },
      },
      {
        tableName: "tag",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "name",
            unique: true,
            using: "BTREE",
            fields: [{ name: "name" }],
          },
        ],
        hooks: typeCache,
      }
    ) as typeof Tag;
  }
}
