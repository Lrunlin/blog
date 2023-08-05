import Joi from "joi";
import validator from "@/common/middleware/verify/validatorAsync";
import compose from "koa-compose";
import auth from "@/common/middleware/auth";
import DB from "@/db";
import { Next, Context } from "koa";
import exist from "@/common/utils/static/exist";
import { load } from "cheerio";
async function verify(ctx: Context, next: Next) {
  /** 如果为false则终止*/
  let result = await DB.Answer.findOne({
    where: { author: ctx.id, problem_id: ctx.request.body.problem_id },
    attributes: ["id"],
  })
    .then(res => !res)
    .catch();

  if (!result) {
    ctx.status = 400;
    ctx.body = { success: false, message: "只能进行一次回答，请修改原答案" };
    return;
  }

  let problemResult = await DB.Problem.findByPk(ctx.request.body.problem_id, {
    attributes: ["author"],
  })
    .then(row => row?.toJSON())
    .catch(err => {
      console.log(err);
      return false as false;
    });

  if (!problemResult) {
    ctx.status = 400;
    ctx.body = { success: false, message: "没有找到对应的答案" };
    return;
  }

  if (problemResult.author == ctx.id) {
    ctx.status = 400;
    ctx.body = { success: false, message: "不要回答自己的问题" };
    return;
  }

  await next();
}

let schema = Joi.object({
  problem_id: Joi.number().min(0).required().error(new Error("问题ID错误")),
  content: Joi.string()
    .min(1)
    .required()
    .external(async (value: string) => {
      let $ = load(value);
      let images = $("img")
        .map((i, el) => $(el).attr("src")?.replace(`${process.env.CDN}/`, ""))
        .get();

      if (images.length) {
        let result = await exist(images)
          .then(res => res)
          .catch(err => err);

        if (!result.success) throw new Error(result.message);
      }
    })
    .error(new Error("文章内容为最短20的HTML字符串")),
});

export default compose([auth(0), validator(schema), verify]);
