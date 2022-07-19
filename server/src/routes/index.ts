import Router from "@koa/router";
import type { Context, Next } from "koa";
let router = new Router();

router.get("/", async ctx => {
  ctx.body = { key: "value" };
});
export default router;
