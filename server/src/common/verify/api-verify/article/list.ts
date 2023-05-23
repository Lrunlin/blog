import Joi from "joi";
import auth from "@/common/middleware/auth";
import type { Context, Next } from "koa";
import verify from "@/common/middleware/verify/validator";
import compose from "koa-compose";
import interger from "../../integer";
const schema = Joi.object({
  sort: Joi.string().valid("recommend", "newest", "hottest").error(new Error("排序方式参数错误")),
  // 暂时 以下三个参数只能通知存在一个
  tag: Joi.string().min(5).max(18).error(new Error("标签错误")),
  type: Joi.string().min(5).max(18).error(new Error("类型错误")),
  follow: Joi.boolean().error(new Error("follow参数错误")),
});

const _auth = async (ctx: Context, next: Next) => {
  if (ctx.query.follow) {
    return auth(0)(ctx, next);
  } else {
    await next();
  }
};

export default compose([verify(schema), _auth, interger([], ["page"])]);
