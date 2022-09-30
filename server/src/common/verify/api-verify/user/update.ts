import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import { fileName } from "../../modules/file-name";
import { urlAllowNull } from "../../modules/url";
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
  avatar_file_name: fileName.error(new Error("头像格式错误")),
});
export default validator(option);
