import Router from "@koa/router";
import DB from "@/db";
import validator from "@/common/middleware/verify/validator";
import Joi from 'joi';
let router = new Router();
const schema = Joi.object({
  position: Joi.string().valid("index", "article", "creator"),
});
router.get("/advertisement", validator(schema), async ctx => {
  let option = ctx.header.isadmin
    ? {
        order: [["indexes", "asc"]],
      }
    : {
        where: {
          position: ctx.query.position,
        },
        order: [["indexes", "asc"]],
        attributes: ["id", "poster_file_name", "poster_url", "url"],
      };

  await DB.Advertisement.findAll(option as any)
    .then(rows => {
      ctx.body = { success: true, message: "查询推广内容", data: rows };
    })
    .catch(err => {
      ctx.body = { success: false, message: "查询失败" };
    });
});
export default router;
