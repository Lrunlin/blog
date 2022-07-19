import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import cheerio from "cheerio";

export interface ArticleAttributes {
  id: number;
  title: string;
  description?: string;
  tag: string;
  author: number;
  content: string;
  cover_file_name?: string;
  reprint?: string;
  view_count?: number;
  update_time?: Date;
  create_time: Date;
}

export type ArticlePk = "id";
export type ArticleId = Article[ArticlePk];
export type ArticleOptionalAttributes =
  | "description"
  | "cover_file_name"
  | "reprint"
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
  view_count?: number;
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
          type: DataTypes.STRING(200),
          allowNull: false,
          comment: "文章标题",
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
          comment: "文章介绍",
          get(this) {
            let description = this.getDataValue("description");
            if (description) {
              return description;
            }
            let $ = cheerio.load(this.getDataValue("content") as string);
            $("pre,code,a,table").remove();
            return $("body")
              .text()
              .substring(0, 200)
              .replace(/ /g, "")
              .replace(/\s/g, "")
              .replace(/\n/g, "");
          },
          set(this, val) {
            if (typeof val == "string" && /^[\s\S]*.*[^\s][\s\S]*$/.test(val as string)) {
              this.setDataValue("description", val);
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
            return type.split(",");
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
        },
        cover_file_name: {
          type: DataTypes.STRING(60),
          allowNull: true,
          comment: "封面图片名称",
          set(this, val) {
            if (typeof val == "string" && /^[\s\S]*.*[^\s][\s\S]*$/.test(val as string)) {
              this.setDataValue("cover_file_name", val);
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
            return `${process.env.CDN}/${cover_file_name}`;
          },
        },
        languages: {
          type: DataTypes.VIRTUAL,
          get() {
            let $ = cheerio.load(this.getDataValue("content"));
            let languages: string[] = [];
            $("pre").each((index, el) => {
              let allClassNames = `${$(el).attr("class")} ${$(el)
                .children("code")
                .eq(0)
                .attr("class")}`.split(" ");
              let hasClassNames = allClassNames.find(item => item.includes("language-"));
              let language = hasClassNames ? hasClassNames.replace("language-", "") : false;
              if (language) {
                if (!languages.includes(language)) languages.push(language);
              }
            });
            return languages.length ? languages : null;
          },
        },
        reprint: {
          type: DataTypes.STRING(300),
          allowNull: true,
          comment: "转载地址，原创为null",
          set(this, val) {
            if (typeof val == "string" && /^[\s\S]*.*[^\s][\s\S]*$/.test(val as string)) {
              this.setDataValue("reprint", val);
            }
          },
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
