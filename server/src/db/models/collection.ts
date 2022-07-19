import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CollectionAttributes {
  id: number;
  article_id: number;
  user_id: number;
  time: Date;
}

export type CollectionPk = "id";
export type CollectionId = Collection[CollectionPk];
export type CollectionCreationAttributes = CollectionAttributes;

export class Collection extends Model<CollectionAttributes, CollectionCreationAttributes> implements CollectionAttributes {
  id!: number;
  article_id!: number;
  user_id!: number;
  time!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Collection {
    return sequelize.define('Collection', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "ID"
    },
    article_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "文章ID"
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "用户ID"
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "收藏时间"
    }
  }, {
    tableName: 'collection',
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
  }) as typeof Collection;
  }
}
