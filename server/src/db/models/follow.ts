import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface FollowAttributes {
  id: number;
  blogger_id: number;
  user_id: number;
  time: Date;
}

export type FollowPk = "id";
export type FollowId = Follow[FollowPk];
export type FollowCreationAttributes = FollowAttributes;

export class Follow extends Model<FollowAttributes, FollowCreationAttributes> implements FollowAttributes {
  id!: number;
  blogger_id!: number;
  user_id!: number;
  time!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Follow {
    return sequelize.define('Follow', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "ID"
    },
    blogger_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "被关注者的ID"
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "用户ID"
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "关注时间"
    }
  }, {
    tableName: 'follow',
    timestamps: false
  }) as typeof Follow;
  }
}
