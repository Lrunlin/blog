import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import hooks from "@/db/hooks/type";

export interface TypeAttributes {
  id: number;
  name: string;
  indexes: number;
  icon_file_name?: string;
  create_time: Date;
  description: string;
}

export type TypePk = "id";
export type TypeId = Type[TypePk];
export type TypeOptionalAttributes = "icon_file_name" | "create_time";
export type TypeCreationAttributes = Optional<TypeAttributes, TypeOptionalAttributes>;

export class Type extends Model<TypeAttributes, TypeCreationAttributes> implements TypeAttributes {
  id!: number;
  name!: string;
  indexes!: number;
  icon_file_name?: string;
  create_time!: Date;
  description!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof Type {
    return sequelize.define(
      "Type",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "ID",
        },
        name: {
          type: DataTypes.STRING(40),
          allowNull: false,
          comment: "类型/标签 名字",
          unique: "name",
        },
        indexes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "排序、索引",
        },
        icon_file_name: {
          type: DataTypes.STRING(60),
          allowNull: true,
          comment: "ICON文件名称",
        },
        icon_url: {
          type: DataTypes.VIRTUAL,
          get(this) {
            let icon_file_name = this.getDataValue("icon_file_name");
            return icon_file_name ? `${process.env.CDN}/type/${icon_file_name}` : null;
          },
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
          comment: "创建时间",
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: "介绍用于meta中description",
        },
      },
      {
        tableName: "type",
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
      }
    ) as typeof Type;
  }
}
