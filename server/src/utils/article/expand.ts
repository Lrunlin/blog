import type { TagAttributes } from "@/db/models/tag";
import type { ArticleAttributes } from "@/db/models/article";
import { cache } from "@/modules/cache/type";

type ArticleModel = ArticleAttributes & {
  tag: number[];
};
/**
 * 将单个文章模型进行扩展，供前端使用
 * @params {object} Article 单个Article模型
 */
function expand(models: ArticleModel) {

  let tags = cache.get<TagAttributes[]>("tag") as TagAttributes[];
  return Object.assign(models, {
    tag: models.tag.map(item => tags.find(_item => item == _item.id) as TagAttributes).filter(item=>item),
  });
}
export default expand;
