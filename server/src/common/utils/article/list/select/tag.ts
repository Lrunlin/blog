import DB from "@/db";
import option from "./option";
import getTagData from "@/common/utils/article/get/get-tag-data";

import { getDataAfter } from "@/common/modules/cache/type";
import type { ArticleAttributes } from "@/db/models/init-models";

import { Op } from "sequelize";

// 根据Type查询
let data: { [key: number]: ArticleAttributes[] } = {};
async function setData() {
  data = {};
  let tagList = await DB.Tag.findAll({ attributes: ["id"] });
  tagList.forEach(({ id }) => {
    DB.Article.findAll({ ...option, where: { tag: { [Op.substring]: id } } }).then(rows => {
      data[id] = rows.map(item => getTagData(item.toJSON())) as any;
    });
  });
}

getDataAfter(() => {
  setData();
});

setInterval(() => {
  setData();
}, 10_000_000);

function getData(id: number) {
  return data[id] || [];
}
export default getData;
