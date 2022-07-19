import DB from "@/db";
import LRU from "lru-cache";

/**
 * 存储type和tag的数据
 * type/tree 树形结构
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
        "type/tree",
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

export { getData, cache };
