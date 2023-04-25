import compose from "koa-compose";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import authMiddleware from "@/common/middleware/auth";
import tag from "@/common/verify/modules/tag";
import interger from "../../integer";

const schema = Joi.object({
  title: Joi.string().min(5).max(200).required().error(new Error("标题为5-50的字符串")),
  content: Joi.string().min(20).required().error(new Error("文章内容为最短20的HTML字符串")),
  tag: tag,
});
export default compose([interger([], ["id"]), authMiddleware(0), validator(schema)]);
