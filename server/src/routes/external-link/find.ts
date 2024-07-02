import Router from "@koa/router";
import DB from "@/db";
import url from "url";
import { getData } from "@/common/modules/cache/external-link";

let router = new Router();

router.get("/external-link/find", async (ctx) => {
  if (
    getData()!.some((item) =>
      url.parse(ctx.request.query.href as string).hostname!.endsWith(item),
    )
  ) {
    ctx.body = { success: true, message: "查询外链是否白名单内" };
  } else {
    ctx.body = { success: false, message: "查找错误" };
  }
});
export default router;
