import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import dehydrate from "@/common/utils/xss/article";

export interface ArticleAttributes {
  id: number;
  title: string;
  description?: string;
  tag: string;
  author: number;
  content: string;
  cover_file_name?: string;
  reprint?: string;
  state: number;
  theme_id: number;
  view_count: number;
  update_time?: Date;
  create_time: Date;
}

export type ArticlePk = "id";
export type ArticleId = Article[ArticlePk];
export type ArticleOptionalAttributes =
  | "description"
  | "cover_file_name"
  | "reprint"
  | "view_count"
  | "update_time";
export type ArticleCreationAttributes = Optional<ArticleAttributes, ArticleOptionalAttributes>;

export class Article
  extends Model<ArticleAttributes, ArticleCreationAttributes>
  implements ArticleAttributes
{
  id!: number;
  title!: string;
  description?: string;
  tag!: string;
  author!: number;
  content!: string;
  cover_file_name?: string;
  reprint?: string;
  state!: number;
  theme_id!: number;
  view_count!: number;
  update_time?: Date;
  create_time!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Article {
    return sequelize.define(
      "Article",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "文章ID",
        },
        title: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: "文章标题",
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
          comment: "文章介绍",
          set(this, val) {
            if (typeof val == "string" && /^[\s\S]*.*[^\s][\s\S]*$/.test(val as string)) {
              this.setDataValue("description", val);
            } else {
              this.setDataValue("description", null as any);
            }
          },
        },
        tag: {
          type: DataTypes.STRING(150),
          allowNull: false,
          comment: "文章标签",
          set(this, val: string[]) {
            this.setDataValue("tag", val.join(","));
          },
          get() {
            let type = this.getDataValue("tag");
            return type&&/^[\s\S]*.*[^\s][\s\S]*$/.test(type) ? type.split(",").map(item => +item) : [];
          },
        },
        author: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "发布者ID",
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: "文章内容",
          set(this, val) {
            this.setDataValue("content", dehydrate(val as string, "article"));
          },
        },
        cover_file_name: {
          type: DataTypes.STRING(60),
          allowNull: true,
          comment: "封面图片名称",
          set(this, val) {
            if (typeof val == "string" && /^[\s\S]*.*[^\s][\s\S]*$/.test(val as string)) {
              this.setDataValue("cover_file_name", val);
            } else {
              this.setDataValue("cover_file_name", null as any);
            }
          },
        },
        cover_url: {
          type: DataTypes.VIRTUAL,
          allowNull: true,
          comment: "封面图片链接",
          get(this) {
            let cover_file_name = this.getDataValue("cover_file_name");
            if (!cover_file_name) {
              return null;
            }
            return `${process.env.CDN}/cover/${cover_file_name}`;
          },
        },
        reprint: {
          type: DataTypes.STRING(300),
          allowNull: true,
          comment: "转载地址，原创为null",
          set(this, val) {
            if (typeof val == "string" && /^[\s\S]*.*[^\s][\s\S]*$/.test(val as string)) {
              this.setDataValue("reprint", val);
            } else {
              this.setDataValue("reprint", null as any);
            }
          },
        },
        state: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "文章状态",
        },
        theme_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "主题ID，默认为default",
        },
        view_count: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          comment: "阅读次数",
        },
        update_time: {
          type: DataTypes.DATE,
          allowNull: true,
          comment: "最近一次更新的时间",
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "创建时间",
        },
      },
      {
        tableName: "article",
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
    ) as typeof Article;
  }
}
