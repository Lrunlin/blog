import Joi from "joi";
import validator from "@/common/middleware/verify/validatorAsync";
import compose from "koa-compose";
import auth from "@/common/middleware/auth";
import DB from "@/db";

let schema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(40)
    .external(async (value: string) => {
      if (value) {
        let result = await DB.Theme.findOne({ where: { name: value } });
        if (result) {
          if (result.state == 0) {
            throw new Error("已有相同名称的主题等待审核");
          } else {
            throw new Error("不能重复添加主题");
          }
        }
      }
    })
    .error(new Error("主题名称错误"))
    .optional(),
  content: Joi.string().min(1).error(new Error("样式内容错误")).optional(),
  indexes: Joi.number().min(1).error(new Error("索引值错误")).optional(),
  state: Joi.number().valid(0, 1).error(new Error("状态值错误")).optional(),
});

export default compose([auth(), validator(schema)]);
