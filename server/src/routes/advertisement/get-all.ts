import Router from "@koa/router";
import DB from "@/db";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import { getData } from "@/common/modules/cache/advertisement";

let router = new Router();
const schema = Joi.object({
  position: Joi.string().valid("index", "article", "creator"),
});
router.get("/advertisement", validator(schema), async (ctx) => {
  try {
    let rows = ctx.header.isadmin
      ? await getData("all", undefined)
      : await getData("list", ctx.query.position as any);

    ctx.body = { success: true, message: "查询推广内容", data: rows };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { success: false, message: "查询失败" };
  }
});
export default router;
