import type { NextFunction, Response, Request } from "express";
import LRUCache from "lru-cache";
const mcache = new LRUCache({
  max: 200,
  ttl: 1 * 60 * 60 * 1000, // 1小时缓存
});

/** 
 * 缓存中间件
*/
const cache = (req: Request, res: any, next: NextFunction) => {
  let key = req.originalUrl || req.url;//以接口路径作为key
  let cacheData = mcache.get(key);
  //   检测key是否有对应的数据.如果有就直接返回
  if (cacheData) {
    res.json(cacheData);
    return;
  } else {
    //复制一个 json函数一个用来取值一个用来返回值
    //重写JSON方法，在路由函数调用JSON方法时获取到需要缓存的数据,然后通过复制的jsonResponse进行返回
    res.jsonResponse = res.json;
    res.json = (value: any) => {
      res.jsonResponse(value);
     mcache.get(key, value);
    };
    next();
  }
};

export default cache;
export { mcache };