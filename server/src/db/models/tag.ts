import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import hooks from "@/db/hooks/type";

export interface TagAttributes {
  id: number;
  name: string;
  belong_id?: number; // 修改为belong_id
  icon_file_name?: string;
  create_time: Date;
  indexes: number;
  description?: string; // 添加description字段
}

export type TagPk = "id";
export type TagId = Tag[TagPk];
export type TagOptionalAttributes =
  | "icon_file_name"
  | "create_time"
  | "description"
  | "belong_id";

export type TagCreationAttributes = Optional<
  TagAttributes,
  TagOptionalAttributes
>;

export class Tag
  extends Model<TagAttributes, TagCreationAttributes>
  implements TagAttributes
{
  id!: number;
  name!: string;
  belong_id?: number;
  icon_file_name?: string;
  create_time!: Date;
  indexes!: number;
  description?: string;

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
        belong_id: {
          type: DataTypes.BIGINT,
          allowNull: true,
          comment: "所属Type的ID", // 修改为belong_id
        },
        icon_file_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
          comment: "ICON文件名称",
        },
        icon_url: {
          type: DataTypes.VIRTUAL,
          get(this) {
            let icon_file_name = this.getDataValue("icon_file_name");
            return icon_file_name
              ? `${process.env.CDN}/tag/${icon_file_name}`
              : null;
          },
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
          comment: "创建时间",
        },
        indexes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "索引值",
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
          comment: "标签介绍", // 添加description字段
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
        hooks: hooks,
      },
    ) as typeof Tag;
  }
}
