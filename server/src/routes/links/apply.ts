import Router from "@koa/router";
import DB from "@/db";
import useID from "@/common/hooks/useId";
import Joi from "joi";
import validator from "@/common/middleware/validator";
import auth from "@/common/middleware/auth";

const schema = Joi.object({
  name: Joi.string().required().min(2).max(30).error(new Error("网站名称填写错误")),
  url: Joi.string()
    .required()
    .min(8)
    .max(100)
    .lowercase()
    .pattern(/^https:\/\/.*/)
    .error(new Error("网址填写错误")),
  logo_file_name: Joi.string()
    .required()
    .min(15)
    .max(50)
    .required()
    .lowercase()
    .pattern(/^((?!http).)*$/)
    .pattern(/^((?!\/).)*$/)
    .error(new Error("logo文件名错误")),
});

let router = new Router();

router.post("/links", validator(schema), auth(0), async ctx => {
  let { name, url, logo_file_name } = ctx.request.body;
  let id = useID();
  await DB.Links.create({
    id,
    user_id: ctx.id as number,
    name,
    url,
    logo_file_name,
    create_time: new Date(),
    state: 0,
  })
    .then(res => {
      ctx.body = { success: true, message: "申请成功，请等待邮箱回复结果" };
    })
    .catch(err => {
      ctx.body = { success: false, message: "发送失败" };
      console.log(err);
    });
});
export default router;
