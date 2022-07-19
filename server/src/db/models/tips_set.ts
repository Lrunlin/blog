import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TipsSetAttributes {
  user_id: number;
  follow: number;
  follow_email: number;
  comment: number;
  comment_email: number;
  collection_article: number;
  collection_article_email: number;
  follow_me: number;
  follow_me_email: number;
}

export type TipsSetPk = "user_id";
export type TipsSetId = TipsSet[TipsSetPk];
export type TipsSetCreationAttributes = TipsSetAttributes;

export class TipsSet extends Model<TipsSetAttributes, TipsSetCreationAttributes> implements TipsSetAttributes {
  user_id!: number;
  follow!: number;
  follow_email!: number;
  comment!: number;
  comment_email!: number;
  collection_article!: number;
  collection_article_email!: number;
  follow_me!: number;
  follow_me_email!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof TipsSet {
    return sequelize.define('TipsSet', {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "用户ID"
    },
    follow: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "关注的用户有新文章"
    },
    follow_email: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    comment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "收到回复"
    },
    comment_email: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    collection_article: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "收藏的文章更新"
    },
    collection_article_email: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    follow_me: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "有人关注我"
    },
    follow_me_email: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'tips_set',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  }) as typeof TipsSet;
  }
}
