import compose from "koa-compose";
import Joi from "joi";
import validator from "@/common/middleware/verify/validatorAsync";
import authMiddleware from "@/common/middleware/auth";
import tag from "@/common/verify/modules/tag";
import interger from "../../integer";
import { load } from "cheerio";
import exist from "@/common/utils/static/exist";

const schema = Joi.object({
  title: Joi.string().min(5).max(200).required().error(new Error("标题为5-50的字符串")),
  content: Joi.string()
    .min(20)
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
  tag: tag,
});
export default compose([interger([], ["id"]), authMiddleware(0), validator(schema)]);
