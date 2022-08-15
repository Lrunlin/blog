import Router from "@koa/router";
import Joi from "joi";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import validator from "@/common/middleware/validator";
import useID from "@/common/hooks/useId";

const schema = Joi.object({
  title: Joi.string().min(1).max(50).required().error(new Error("标题为1-50的字符串")),
  content: Joi.string().min(20).required().error(new Error("文章内容为最短20的HTML字符串")),
});

let router = new Router();
router.post("/drafts", validator(schema), auth([0, 1]), async ctx => {
  let { title, content } = ctx.request.body;
  await DB.Drafts.create({
    id: useID(),
    title: title,
    content: content,
    user_id: ctx.id as number,
    time: new Date(),
  })
    .then(res => {
      ctx.body = { success: true, message: "保存成功" };
    })
    .catch(err => {
      ctx.body = { success: false, message: "保存失败" };
      console.log(err);
    });
});
export default router;
