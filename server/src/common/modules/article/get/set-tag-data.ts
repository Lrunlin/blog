import type { TagAttributes } from "@/db/models/tag";
import { cache } from "@/common/modules/cache/type";

/**
 * todo 为文章表加工tag字段，通过tag_id查询对应的tag信息
 * @params content {string} 文章内容
 * @params attributes {string} Tag模型中需要的key
 * @return article {Article} 处理好的文章数据
 */
function getTagData<T>(tags: TagAttributes["id"][], attributes?: string[]) {
  let tag = cache.get("tag") as TagAttributes[];

  if (attributes) {
    return tags.map(item => {
      let _tag = tag.find(_item => _item.id == item) as TagAttributes;

      // 转好的二维数组，在返回时转成对象
      let _tagArray = Object.keys(_tag)
        .filter(item => attributes.includes(item))
        .map(item => [item, _tag[item as keyof TagAttributes]]);
      return Object.fromEntries(_tagArray);
    });
  } else {
    return tags.map(item => {
      return tag.find(_item => _item.id == item);
    });
  }
}
export default getTagData;
