import Router from "@koa/router";
import cache, { getDataAfter } from "@/common/modules/cache/type";
let router = new Router();

const prefix = "/article/list";

let data: any = {};
// 将请求使用的对应路径写成ID
const defaultType = [
  {
    name: "综合",
    id: `${prefix}/recommend`,
  },
  {
    name: "关注",
    id: `${prefix}/follow`,
  },
];
// 在type缓存更新时重写缓存数据
getDataAfter(() => {
  let _data = (cache.get<any[]>("tree")?.filter(item => item.children.length) as any[]).map(
    item => {
      return {
        id: `${prefix}/type/${item.id}`,
        name: item.name,
        children: [{ name: "全部", id: `${prefix}/type/${item.id}` }].concat(
          item.children.map((_item: any) => ({
            id: `${prefix}/tag/${_item.id}`,
            name: _item.name,
          }))
        ),
      };
    }
  );
  data = [...defaultType, ..._data];
});

// 返回前台整个类型栏
router.get("/type-tree-client", async ctx => {
  ctx.body = { success: true, message: "用户查询首页类型信息", data: data };
});
export default router;
