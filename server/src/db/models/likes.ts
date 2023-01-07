import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface LikesAttributes {
  id: number;
  user_id: number;
  article_id: number;
  create_time: Date;
}

export type LikesPk = "id";
export type LikesId = Likes[LikesPk];
export type LikesCreationAttributes = LikesAttributes;

export class Likes extends Model<LikesAttributes, LikesCreationAttributes> implements LikesAttributes {
  id!: number;
  user_id!: number;
  article_id!: number;
  create_time!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Likes {
    return sequelize.define('Likes', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "记录ID"
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "用户ID"
    },
    article_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "文章ID"
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "点赞时间"
    }
  }, {
    tableName: 'likes',
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
  }) as typeof Likes;
  }
}
