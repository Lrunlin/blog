import type { Context } from "koa";
declare module "koa" {
  interface Context {
    /** 用户ID*/
    id?: number;
    /** 用户身份*/
    auth?: number;
  }
}
