import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ReadHistoryAttributes {
  id: number;
  user_id?: number;
  article_id: number;
  secret_key: string;
  time: Date;
}

export type ReadHistoryPk = "id";
export type ReadHistoryId = ReadHistory[ReadHistoryPk];
export type ReadHistoryOptionalAttributes = "user_id";
export type ReadHistoryCreationAttributes = Optional<ReadHistoryAttributes, ReadHistoryOptionalAttributes>;

export class ReadHistory extends Model<ReadHistoryAttributes, ReadHistoryCreationAttributes> implements ReadHistoryAttributes {
  id!: number;
  user_id?: number;
  article_id!: number;
  secret_key!: string;
  time!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof ReadHistory {
    return sequelize.define('ReadHistory', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "ID"
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "用户ID"
    },
    article_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "文章ID "
    },
    secret_key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "使用SHA1生成的签名"
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "阅读时间"
    }
  }, {
    tableName: 'read_history',
    timestamps: false
  }) as typeof ReadHistory;
  }
}
