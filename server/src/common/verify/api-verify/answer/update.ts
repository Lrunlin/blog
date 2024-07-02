import { load } from "cheerio";
import Joi from "joi";
import compose from "koa-compose";
import auth from "@/common/middleware/auth";
import validator from "@/common/middleware/verify/validatorAsync";
import { exist } from "@/common/utils/static";

let verifyId = Joi.object({
  id: Joi.number().min(0).required().error(new Error("答案ID格式错误")),
});
let verifyContent = Joi.object({
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
          .then((res) => res)
          .catch((err) => err);
        if (!result.success) throw new Error(result.message);
      }
    })
    .error(new Error("文章内容为最短20的HTML字符串")),
});
export default compose([
  auth(0),
  validator(verifyId, true),
  validator(verifyContent),
]);
