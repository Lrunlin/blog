import Router from "@koa/router";
import DB from "@/db";
import Joi from "joi";
import verify from "@/common/middleware/verify/validator";
import integer from "@/common/verify/integer";
import authMiddleware from "@/common/middleware/auth";
import switchList from "@/common/modules/notice";
import { Op } from "sequelize";

const schema = Joi.object({
  type: Joi.string().valid("article", "comment").error(new Error("查询通知类型错误")),
});

let router = new Router();
router.get(
  "/notice/list/:type",
  verify(schema, true),
  integer(["page"]),
  authMiddleware(0),
  async ctx => {
    let page = +(ctx.query.page as string);
    let data = await DB.Notice.findAndCountAll({
      where: {
        user_id: ctx.id,
        type:
          ctx.params.type == "article" ? "article" : { [Op.or]: ["comment", "article_comment"] },
      },
      order: [
        ["is_read", "asc"],
        ["create_time", "desc"],
      ],
      offset: (page - 1) * 10,
      limit: 10,
      raw: true,
    })
      .then(async ({ count, rows }) => {
        return { total: count, list: await switchList(rows) };
      })
      .catch(a => {
        return null;
      });
    ctx.body = { success: !!data, message: data ? "查询成功" : "查询失败", data: data };
  }
);
export default router;
