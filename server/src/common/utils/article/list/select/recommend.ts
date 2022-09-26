import DB from "@/db";
import option from "./option";
import getTagData from "@/common/utils/article/get/get-tag-data";
import setDescription from "@/common/utils/article/get/set-description";
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
    data = (
      rows.map(item => {
        let _item = getTagData(setDescription(item.toJSON()), ["name"]);
        delete (_item as any).content;
        return _item;
      }) as unknown as ArticleAttributes[]
    ).sort((a, b) => (a.reprint + "").length - (b.reprint + "").length);
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
