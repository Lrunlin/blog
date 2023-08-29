import DB from "@/db";
import { LRUCache } from "lru-cache";

let callbackList: Function[] = [];

/**
 * 存储type和tag的数据
 * tree 树形结构
 * type 全部的type
 * tag 全部的tag
 * tree/client 用户端首页展示的类型树
 */
const cache = new LRUCache({
  max: 20,
});

const getTypeData = () =>
  DB.Type.findAll({
    order: [["indexes", "asc"]],
  }).then(rows => rows.map(item => item.toJSON()));

const getTagData = () =>
  DB.Tag.findAll({
    order: [["indexes", "asc"]],
  }).then(rows => rows.map(item => item.toJSON()));

/** 刷新type缓存数据*/
function setData() {
  Promise.all([getTypeData(), getTagData()])
    .then(([type, tag]) => {
      cache.set("type", type);
      cache.set("tag", tag);
      cache.set(
        "tree",
        type.map(item => {
          return Object.assign(item, {
            children: tag.filter(_item => _item.belong == item.id),
          });
        })
      );

      // 执行所有回调函数
      callbackList.forEach(item => {
        item();
      });
    })
    .catch(err => {
      throw new Error(err);
    });
}

/**
 * 传一个回调函数，项目在启动时候会自动收集回调函数，在执行getData时会遍历保存函数的数组依次执行函数
 * ! 只能在函数顶部使用，保证在初始化时候可以执行
 * */
function getDataAfter(effect: () => any) {
  callbackList.push(effect);
}

//DB的typeCatch Hooks中使用到了这个模块，首次执行等DB.Type初始化结束在调用
setTimeout(() => {
  setData();
}, 0);

export default cache;
export { setData, cache, getDataAfter };
