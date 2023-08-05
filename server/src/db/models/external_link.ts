import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import hooks from "../hooks/external-link";

export interface ExternalLinkAttributes {
  id: number;
  href: string;
  create_time: Date;
}

export type ExternalLinkPk = "id";
export type ExternalLinkId = ExternalLink[ExternalLinkPk];
export type ExternalLinkCreationAttributes = ExternalLinkAttributes;

export class ExternalLink
  extends Model<ExternalLinkAttributes, ExternalLinkCreationAttributes>
  implements ExternalLinkAttributes
{
  id!: number;
  href!: string;
  create_time!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof ExternalLink {
    return sequelize.define(
      "ExternalLink",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "ID",
        },
        href: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: "网站域名",
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "添加时间",
        },
      },
      {
        tableName: "external_link",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
        ],
        hooks: hooks,
      }
    ) as typeof ExternalLink;
  }
}
