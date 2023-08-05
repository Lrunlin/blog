import Joi from "joi";
import validator from "@/common/middleware/verify/validatorAsync";
import { fileName } from "../../modules/file-name";
import { url } from "../../modules/url";
import exist from "@/common/utils/static/exist";

const schema = Joi.object({
  name: Joi.string().required().min(2).max(30).error(new Error("网站名称填写错误")),
  url: url.error(new Error("网址填写错误")),
  logo_file_name: fileName.external(async (value: string) => {
    let result = await exist([`friendly-link/${value}`])
      .then(res => res)
      .catch(err => err);
    if (!result.success) throw new Error(result.message);
  }),
});
export default validator(schema);
