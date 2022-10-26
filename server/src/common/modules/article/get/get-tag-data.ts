import type { ArticleAttributes } from "@/db/models/article";
import type { TagAttributes } from "@/db/models/tag";
import { cache } from "@/common/modules/cache/type";

type paramsType = Pick<ArticleAttributes, "tag">;
/**
 * todo 为文章表加工tag字段，通过tag_id查询对应的tag信息
 * @params article {Article} 文章数据
 * @params attributes {string} Tag模型中需要的key
 * @return article {Article} 处理好的文章数据
 */
function getTagData<T>(params: paramsType, attributes?: string[]) {
  let tag = cache.get("tag") as TagAttributes[];

  if (attributes) {
    return {
      ...params,
      tag: (params.tag as unknown as number[]).map(item => {
        let _tag = tag.find(_item => _item.id == item) as TagAttributes;

        // 转好的二维数组，在返回时转成对象
        let _tagArray = Object.keys(_tag)
          .filter(item => attributes.includes(item))
          .map(item => [item, _tag[item as keyof TagAttributes]]);
        return Object.fromEntries(_tagArray);
      }),
    } as T & paramsType & { tag: any[] };
  } else {
    return {
      ...params,
      tag: (params.tag as unknown as number[]).map(item => {
        return tag.find(_item => _item.id == item);
      }),
    } as T & paramsType & { tag: any[] };
  }
}
export default getTagData;
