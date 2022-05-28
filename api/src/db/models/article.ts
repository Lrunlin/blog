import { DataTypes } from "sequelize";
import sequelize from "../config";
import { joinUrl } from "@/store/assetsPath";

import cheerio from "cheerio";
import type { ArticleInstance } from "../types";
import xss from "@/utils/xss";
import assembleHTML from "@/utils/assembleHTML";
import cache from "@/db/hooks/cache";

export default sequelize.define<ArticleInstance>(
  "article",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    router: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: "router",
    },
    author: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(60),
      allowNull: false,
      set(value: string[]) {
        this.setDataValue("type", value.join(","));
      },
      get() {
        let type = this.getDataValue("type");
        return type.split(",");
      },
    },
    article: {
      type: DataTypes.TEXT,
      allowNull: false,
      set(value: string) {
        this.setDataValue("article", xss(value));
      },
      get() {
        let article: string = this.getDataValue("article");
        let type: string = this.getDataValue("type");
        return assembleHTML(article, type);
      },
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    view_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.VIRTUAL,
      get() {
        const article: string = this.getDataValue("article");
        let $ = cheerio.load(`<div>${article}</div>`);
        let _image: string | undefined = $("img").eq(0).attr("src");
        let _src = (_image + "").includes("http") ? _image : joinUrl("article", _image + "", true);
        return _image ? _src : false;
      },
    },
    introduce: {
      type: DataTypes.VIRTUAL,
      get() {
        let article: string = this.getDataValue("article");
        let $ = cheerio.load(article);
        return $.text().substring(0, 280).trim();
      },
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
      {
        name: "router",
        unique: true,
        using: "BTREE",
        fields: [{ name: "router" }],
      },
    ],
    hooks:cache
  }
);
