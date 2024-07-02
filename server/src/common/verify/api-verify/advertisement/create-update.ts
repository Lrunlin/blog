import Joi from "joi";
import verify from "@/common/middleware/verify/validator";
import { fileName } from "@/common/verify/modules/file-name";
import { urlAllowNull } from "@/common/verify/modules/url";

const schema = Joi.object({
  poster_file_name: fileName,
  url: urlAllowNull,
  indexes: Joi.number().min(0).required(),
  position: Joi.string().valid("index", "article", "creator").required(),
});

export default verify(schema);
