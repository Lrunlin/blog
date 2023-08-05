import Joi from "joi";
import validator from "@/common/middleware/verify/validatorAsync";
import { fileName } from "../../modules/file-name";
import { urlAllowNull } from "../../modules/url";
import exist from "@/common/utils/static/exist";
const option = Joi.object({
  name: Joi.string().min(1).max(12).required().error(new Error("用户昵称格式错误")),
  location: Joi.string().allow(null).allow("").min(1).max(12).error(new Error("地区格式错误")),
  unit: Joi.string().allow(null).allow("").min(1).max(20).error(new Error("单位(机构)格式错误")),
  site: urlAllowNull,
  description: Joi.string()
    .allow(null)
    .allow("")
    .min(1)
    .max(200)
    .error(new Error("自我介绍格式错误")),
  avatar_file_name: fileName
    .external(async (value: string | null) => {
      if (value) {
        let result = await exist([`avatar/${value}`])
          .then(res => res)
          .catch(err => err);
        if (!result.success) throw new Error(result.message);
      }
    })
    .error(new Error("头像格式错误")),
});
export default validator(option);
