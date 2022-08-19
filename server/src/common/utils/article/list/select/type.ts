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
  let typeList = await DB.Type.findAll({ attributes: ["id"] });

  typeList.forEach(async ({ id: typeID }) => {
    // 该type下有哪些tag
    let tagIDHub = await(
      await DB.Tag.findAll({ where: { belong: typeID }, attributes: ["id"] })
    ).map(({ id: tagID }) =>
      DB.Article.findAll({ ...option, where: { tag: { [Op.substring]: tagID }, state: 1 } })
    );
    Promise.all(tagIDHub).then(articleList => {
      data[typeID] = articleList
        .flat()
        .map(item => getTagData(item.toJSON()))
        .reduce((total, item) => {
          return total.some(_item => (_item as any).id == item.id)
            ? total
            : ([...total, item] as any);
        }, []);
    });
  });
}

getDataAfter(() => {
  setData();
});

setInterval(() => {
  setData();
}, 10_800_000);

function getData(id: number) {
  return data[id] || [];
}
export default getData;
