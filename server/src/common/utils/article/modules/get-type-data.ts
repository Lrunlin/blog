import DB from "@/db";
import LRU from "lru-cache";
import type { ArticleAttributes } from "@/db/models/article";
import type { TagAttributes } from "@/db/models/tag";
/**
 * 存储type和tag的数据
 * tree 树形结构
 * type 全部的type
 * tag 全部的tag
 */
const cache = new LRU({
  max: 20,
});
/** 刷新type缓存数据*/
function getData() {
  Promise.all([DB.Type.findAll(), DB.Tag.findAll()])
    .then(([type, tag]) => {
      cache.set(
        "type",
        type.map(item => item.toJSON())
      );
      cache.set(
        "tag",
        tag.map(item => item.toJSON())
      );



      cache.set(
        "tree",
        type
          .sort((a, b) => a.indexes - b.indexes)
          .map(item => {
            let _item = item.toJSON();
            return Object.assign(_item, {
              children: tag
                .filter(_item => _item.belong == item.id)
                .sort((a, b) => a.indexes - b.indexes),
            });
          })
      );
    })
    .catch(err => {
      throw new Error(err);
    });
}

//DB的typeCatch Hooks中使用到了这个模块，首次执行等DB.Type初始化结束在调用
setTimeout(() => {
  getData();
}, 0);

/**
 * todo 为文章表加工tag字段，通过tag_id查询对应的tag信息
 * @params article {Article} 文章数据
 * @return article {Article} 处理好的文章数据
 */
function getTypeData(article: ArticleAttributes) {
  let tag = cache.get("tag") as TagAttributes[];

  return {
    ...article,
    tag: (article.tag as unknown as number[]).map(item => {
      return tag.find(_item => _item.id == item);
    }),
  };
}
export default getTypeData;

export { getData, cache };
