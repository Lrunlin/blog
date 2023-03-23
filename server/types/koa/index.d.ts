import type { Context } from "koa";
import type { Request } from "koa";
declare module "koa" {
  interface Context {
    /** 用户ID*/
    id?: number;
    /** 用户身份*/
    auth?: number;
    request: Request & {
      /** 设置请求体默认类型*/
      body: any;
    };
  }
}
