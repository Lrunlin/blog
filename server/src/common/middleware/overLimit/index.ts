import type { Context, Next } from "koa";
interface cacheType {
  [key: string]: {
    count: number;
    deadline: number;
  };
}

let cache: cacheType = {};
/**
 * 根据ctx.id进行记录，进行接口限频
 * @params option {[time,speed]} 多长时间内显示多少次请求
 * @params mes {string} 超出限频提示信息
 */
function limit(option: [number, number], mes: string) {
  return async (ctx: Context, next: Next) => {
    let key = `${ctx.path}:${ctx.id}`;

    let [time, speed] = option;

    //是否以及记录了key
    if (cache.hasOwnProperty(key)) {
      // 如果记录了key那么次数到了，并且时间没过期就返回429
      if (cache[key].count > speed && cache[key].deadline < +new Date()) {
        ctx.status = 429;
        ctx.body = { success: false, mes: mes };
      } else {
        await next();
        if ((ctx.body as any)?.success) {
          cache[key].count++;
          cache[key].deadline = +new Date() + time * 1000;
        }
      }
    } else {
      await next();
      cache[key] = {
        count: 0,
        deadline: +new Date() + time * 1000,
      };
    }

    console.log(cache);
    

    // setInterval(()=>{

    // },300)
  };
}
export default limit;
