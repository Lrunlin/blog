import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { htmlToMD } from "@/common/utils/article/get/html-to-markdown";

export interface DraftsAttributes {
  id: number;
  user_id: number;
  title?: string;
  content: string;
  time: Date;
}

export type DraftsPk = "id";
export type DraftsId = Drafts[DraftsPk];
export type DraftsOptionalAttributes = "title";
export type DraftsCreationAttributes = Optional<DraftsAttributes, DraftsOptionalAttributes>;

export class Drafts extends Model<DraftsAttributes, DraftsCreationAttributes> implements DraftsAttributes {
  id!: number;
  user_id!: number;
  title?: string;
  content!: string;
  time!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Drafts {
    return sequelize.define('Drafts', {
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
    title: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "文章标题"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "草稿箱内容",
      get(){
        let content=this.getDataValue('content');
        return htmlToMD(content);
      }
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "添加时间"
    }
  }, {
    tableName: 'drafts',
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
  }) as typeof Drafts;
  }
}
