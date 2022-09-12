import Router from "@koa/router";
import DB from "@/db";
import getUserId from "@/common/middleware/getUserId";
import Joi from "joi";
import validator from "@/common/middleware/validator";

const schema = Joi.object({
  state: Joi.number().valid(0, 1, 2).error(new Error("state参数错误")),
});

let router = new Router();
router.get("/links", getUserId, validator(schema), async ctx => {
  // 用户端查询SSR不携带token无论谁都按照非管理员处理
  await DB.Links.findAll({
    where: ctx.auth != 1 ? { state: 1 } : { state: ctx.query.state || [0, 1, 2] },
    attributes: { exclude: ctx.auth != 1 ? ["create_time", "is_allow", "user_id"] : ["user_id"] },
    order: [["create_time", "desc"]],
    include: [
      {
        model: DB.User,
        as: "user_data",
        attributes: ["id", "name", "auth", "avatar_file_name", "avatar_url"],
      },
    ],
  })
    .then(rows => {
      ctx.body = { success: true, message: "查询友链列表", data: rows };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "查询错误" };
      console.log(err);
    });
});
export default router;
