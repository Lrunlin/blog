import Joi from "joi";
import validator from "@/common/middleware/verify/validatorAsync";
import DB from "@/db";

const schema = Joi.object({
  href: Joi.string()
    .min(3)
    .max(150)
    .pattern(/^[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/)
    .error(new Error("链接格式错误"))
    .external(async (value: string) => {
      let count = await DB.ExternalLink.count({ where: { href: value } });
      if (count) {
        throw new Error("链接已存在");
      }
    }),
});
export default validator(schema);
