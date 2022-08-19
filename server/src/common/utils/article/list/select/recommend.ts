import DB from "@/db";
import option from "./option";
import getTagData from "@/common/utils/article/get/get-tag-data";
import type { ArticleAttributes } from "@/db/models/init-models";
// 综合板块查询
let data: ArticleAttributes[] = [];
function setData() {
  DB.Article.findAll({
    ...option,
    where: {
      state: 1,
    },
  }).then(rows => {
    data = rows.map(item => getTagData(item.toJSON(), ["name"])) as unknown as ArticleAttributes[];
  });
}

setTimeout(() => {
  setData();
}, 1500);
setInterval(() => {
  setData();
}, 7_200_000);
function getData() {
  return data;
}
export default getData;
