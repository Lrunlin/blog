import type { NextFunction, Response, Request } from "express";
import mcache from "memory-cache";
/** 
 * 缓存中间件
*/
const cache = (req: Request, res: any, next: NextFunction) => {
  console.log(mcache.size());
  
  let key = req.originalUrl || req.url;//以接口路径作为key
  let cachedBody = mcache.get(key);
  //   检测key是否有对应的数据.如果有就直接返回
  if (cachedBody) {
    res.json(cachedBody);
    return;
  } else {
    //复制一个 json函数一个用来取值一个用来返回值
    //重写JSON方法，在路由函数调用JSON方法时获取到需要缓存的数据,然后通过复制的jsonResponse进行返回
    res.jsonResponse = res.json;
    res.json = (value: any) => {
      res.jsonResponse(value);
      mcache.put(key, value, 10000 * 1000);
    };
    next();
  }
};

export default cache;
