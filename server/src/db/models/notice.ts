import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface NoticeAttributes {
  id: number;
  user_id: number;
  relation_id: number;
  type: string;
  is_read: number;
  create_time: Date;
}

export type NoticePk = "id";
export type NoticeId = Notice[NoticePk];
export type NoticeCreationAttributes = NoticeAttributes;

export class Notice
  extends Model<NoticeAttributes, NoticeCreationAttributes>
  implements NoticeAttributes
{
  id!: number;
  user_id!: number;
  relation_id!: number;
  type!: string;
  is_read!: number;
  create_time!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Notice {
    return sequelize.define(
      "Notice",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "ID",
        },
        user_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "用户ID",
        },
        relation_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "对某个表的主键进行关联，例(article_id,follow_id)",
        },
        type: {
          type: DataTypes.STRING(30),
          allowNull: false,
          comment: "什么类型的通知",
        },
        is_read: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          comment: "是否已读",
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "发送时间",
        },
      },
      {
        tableName: "notice",
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
    ) as typeof Notice;
  }
}
