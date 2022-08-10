import Router from "@koa/router";
import { v4 } from "uuid";

let router = new Router();
router.get("/advertisement", async ctx => {
  ctx.body = {
    data: new Array(3).fill(null).map(() => ({
      id: v4(),
      url:'blogweb.cn',
      cover:
        "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d76f050f2f6d48f8890e4036ac4fdfb2~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?",
    })),
  };
});
export default router;
