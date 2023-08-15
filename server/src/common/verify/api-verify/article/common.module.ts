import Joi from "joi";
import tag from "@/common/verify/modules/tag";
import { urlAllowNull } from "../../modules/url";
import { fileNameAllowNull } from "../../modules/file-name";
import exist from "@/common/utils/static/exist";
import { load } from "cheerio";
import DB from "@/db";

/** 创建、更新、文章、草稿箱 多个配置*/
export default {
  title: Joi.string().min(3).max(200).required().error(new Error("标题为1-50的字符串")),
  description: Joi.string()
    .allow("")
    .max(200)
    .required()
    .allow(null)
    .error(new Error("文章介绍为1-200的字符串或者null")),
  cover_file_name: fileNameAllowNull.external(async (value: string | null) => {
    if (value) {
      let result = await exist([`cover/${value}`])
        .then(res => res)
        .catch(err => err);
      if (!result.success) throw new Error(result.message);
    }
  }),
  tag: tag,
  theme_id: Joi.number()
    .min(0)
    .required()
    .external(async (value: number) => {
      let result = await DB.Theme.findByPk(value, { attributes: ["id"] })
        .then(res => !!res)
        .catch(err => false);
      if (!result) throw new Error('主题ID不存在');
    }),
  content: Joi.string()
    .min(20)
    .required()
    .error(new Error("文章内容为最短20的HTML字符串"))
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
    }),
  reprint: urlAllowNull,
};
