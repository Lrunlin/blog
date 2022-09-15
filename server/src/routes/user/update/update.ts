import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";

const option = Joi.object({
  name: Joi.string().min(1).max(12).required().error(new Error("用户昵称格式错误")),
  location: Joi.string().allow(null).allow("").min(1).max(12).error(new Error("地区格式错误")),
  unit: Joi.string().allow(null).allow("").min(1).max(20).error(new Error("单位(机构)格式错误")),
  site: Joi.string()
    .allow(null)
    .allow("")
    .min(1)
    .max(100)
    .pattern(/https:\/\/([\w.]+\/?)\S*/)
    .error(new Error("个人主页格式错误")),
  description: Joi.string()
    .allow(null)
    .allow("")
    .min(1)
    .max(200)
    .error(new Error("自我介绍格式错误")),
  avatar_file_name: Joi.string()
    .min(15)
    .max(50)
    .required()
    .lowercase()
    .pattern(/^((?!http).)*$/)
    .pattern(/^((?!\/).)*$/)
    .error(new Error("头像错误")),
});

let router = new Router();
router.put("/user", validator(option), auth([0, 1]), async ctx => {
  await DB.User.update(ctx.request.body, { where: { id: ctx.id } })
    .then(([res]) => {
      ctx.body = { success: !!res, message: `成功修改${res}条数据` };
    })
    .catch(err => {
      ctx.body = { success: false, message: "更新错误" };
      console.log(err);
    });
});
export default router;
