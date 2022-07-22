import Router from "@koa/router";
import DB from "@/db";
import useId from "@/utils/useId";
import Joi from "Joi";
import validator from "@/common/middleware/validator";
import { cache } from "@/utils/article/modules/get-type-data";
import { TagAttributes } from "@/db/models/tag";
import auth from "@/common/middleware/auth";

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
let router = new Router();

router.post("/article", auth([0, 1]), validator(schema), async ctx => {
  let { title, description, cover_file_name, reprint, content, tag } = ctx.request.body;

  let id = useId();

  await DB.Article.create({
    id: id,
    title: title,
    description: description,
    cover_file_name: cover_file_name,
    reprint: reprint,
    content: content,
    author: ctx.id as number,
    tag: tag,
    create_time: new Date(),
  })
    .then(res => {
      ctx.body = { success: true, message: `发布成功`, data: { article_id: id } };
    })
    .catch(err => {
      ctx.body = { success: false, message: "发布失败" };
      console.log(err);
    });
});
export default router;
