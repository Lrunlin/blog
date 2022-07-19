import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface NoticeAttributes {
  id: number;
  user_id: number;
  content: string;
  title: string;
  isRead: number;
  time: Date;
}

export type NoticePk = "id";
export type NoticeId = Notice[NoticePk];
export type NoticeCreationAttributes = NoticeAttributes;

export class Notice extends Model<NoticeAttributes, NoticeCreationAttributes> implements NoticeAttributes {
  id!: number;
  user_id!: number;
  content!: string;
  title!: string;
  isRead!: number;
  time!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Notice {
    return sequelize.define('Notice', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "ID"
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "用户ID"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "内容"
    },
    title: {
      type: DataTypes.STRING(400),
      allowNull: false,
      comment: "标题"
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "已读"
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "发送时间"
    }
  }, {
    tableName: 'notice',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof Notice;
  }
}
