import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TipsSetAttributes {
  user_id: number;
  follow?: number;
  comment?: number;
  follow_me?: number;
}

export type TipsSetPk = "user_id";
export type TipsSetId = TipsSet[TipsSetPk];
export type TipsSetOptionalAttributes = "follow" | "comment" | "follow_me";
export type TipsSetCreationAttributes = Optional<TipsSetAttributes, TipsSetOptionalAttributes>;

export class TipsSet extends Model<TipsSetAttributes, TipsSetCreationAttributes> implements TipsSetAttributes {
  user_id!: number;
  follow?: number;
  comment?: number;
  follow_me?: number;


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
      allowNull: true,
      comment: "关注的用户有新文章"
    },
    comment: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "收到回复"
    },
    follow_me: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "有人关注我"
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
