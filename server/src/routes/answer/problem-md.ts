import Router from "@koa/router";
import DB from "@/db";
import verify from "@/common/verify/api-verify/answer/problem-md";
import setImageTag from "@/common/modules/article/get/img-add-prefix";
let router = new Router();

/** 查询用户在某个问题下的回答内容(返回MarkDown)*/
router.get("/answer", verify, async ctx => {
  await DB.Answer.findOne({
    where: {
      problem_id: ctx.query.problem_id,
      author: ctx.id,
    },
    attributes: ["id", "content"],
  })
    .then(row => {
      if (row) {
        ctx.body = {
          success: true,
          message: "查询答案并且以MarkDown形式返回内容",
          data: Object.assign(row, {
            content: setImageTag(row.content, "answer"),
          }),
        };
      } else {
        ctx.status = 404;
      }
    })
    .catch(err => {
      console.log(err);
      ctx.status = 500;
    });
});
export default router;
