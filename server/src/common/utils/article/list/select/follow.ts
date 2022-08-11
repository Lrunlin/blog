import DB from "@/db";
import option from "./option";
import getTagData from "@/common/utils/article/get/get-tag-data";
async function getData(id: number) {
  let articleList = (
    await DB.Follow.findAll({
      where: { user_id: id },
      attributes: ["id"],
    })
  ).map(item => DB.Article.findAll({ where: { author: item.id }, ...option }));
  return await Promise.all(articleList)
    .then(rows => rows.flat().map(item => getTagData(item.toJSON(), ["name"])))
    .catch(() => []);
}
export default getData;
