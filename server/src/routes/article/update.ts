import Router from "@koa/router";
import auth from "@/common/middleware/auth";
import DB from "@/db";
let router = new Router();

import Joi from "Joi";
import validator from "@/common/middleware/validator";
import { cache } from "@/modules/cache/type";
import { TagAttributes } from "@/db/models/tag";

const schema = Joi.object({
  title: Joi.string().min(1).max(50).required().error(new Error("标题为1-50的字符串")),
  description: Joi.string()
    .allow("")
    .max(200)
    .required()
    .allow(null)
    .error(new Error("文章介绍为1-200的字符串或者null")),
  cover_file_name: Joi.string()
    .allow("")
    .min(35)
    .max(100)
    .required()
    .allow(null)
    .lowercase()
    .pattern(/^((?!http).)*$/)
    .pattern(/^((?!\/).)*$/)
    .error(new Error("封面地址为图片名称，禁止包含http、/等字眼")),
  view_count: Joi.number().min(0).error(new Error("文章阅读量大于0的数字")),
  reprint: Joi.string()
    .allow("")
    .max(100)
    .required()
    .allow(null)
    .lowercase()
    .pattern(/^https:\/\/.*/)
    .error(new Error("转载地址为1-100的字符串，要求为https网址")),
  tag: Joi.array()
    .items(Joi.number().required())
    .min(1)
    .max(6)
    .required()
    .error(new Error("网站标签为1-5个"))
    .custom((value: number[], helper) => {
      let tags = cache.get("tag") as Array<TagAttributes>;
      if (value.every(item => tags.some(_item => _item.id == item))) {
        return true;
      } else {
        return helper.message(new Error("tag_id不在数据表内") as any);
      }
    }),
  content: Joi.string().min(20).required().error(new Error("文章内容为最短20的HTML字符串")),
});

router.put("/article/:id", auth([0, 1]), validator(schema), async ctx => {
  let { title, description, cover_file_name, reprint, content, tag, view_count } = ctx.request.body;
  let where: { id: string; author?: number } = {
    id: ctx.params.id,
  };

  if (ctx.auth != 1) {
    where.author = ctx.id;
  }

  await DB.Article.update(
    {
      title: title,
      description: description,
      cover_file_name: cover_file_name,
      reprint: reprint,
      content: content,
      tag: tag,
      update_time: new Date(),
      view_count:ctx.auth==1?view_count:undefined,
    },
    {
      where: where,
    }
  )
    .then(result => {
      let isSuccess = !!result[0];
      ctx.body = { success: isSuccess, message: `成功修改${result[0]}条内容` };
    })
    .catch(err => {
      ctx.body = { success: false, message: "修改错误" };
      console.log(err);
    });
});
export default router;
