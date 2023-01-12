import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import { fileName } from "../../modules/file-name";
import { url } from "../../modules/url"; 
const schema = Joi.object({
  name: Joi.string().required().min(2).max(30).error(new Error("网站名称填写错误")),
  url: url.error(new Error("网址填写错误")),
  logo_file_name: fileName.error(new Error("logo文件名错误")),
});
export default validator(schema);