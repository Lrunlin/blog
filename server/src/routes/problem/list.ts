import Router from "@koa/router";
import verify from "@/common/verify/api-verify/problem/list";
import DB from "@/db";
import getTagData from "@/common/modules/article/get/set-tag-data";
import Sequelize from "@/db/config";

let router = new Router();
router.get("/problem/page/:page", verify, async ctx => {
  let page = +ctx.params.page;

  await DB.Problem.findAndCountAll({
    offset: (page - 1) * 10,
    limit: 10,
    attributes: [
      "id",
      "title",
      "tag",
      "content",
      "view_count",
      "create_time",
      "update_time",
      [
        Sequelize.literal(`(SELECT COUNT(id) FROM answer WHERE problem.id = answer.problem_id)`),
        "answer_count",
      ],
    ],
  })
    .then(({ count, rows }) => {
      ctx.body = {
        success: true,
        message: `查询问答成功`,
        data: {
          total: count,
          list: rows.map(row => {
            return { ...row.toJSON(), tag: getTagData(row.toJSON().tag as unknown as number[], ["name"]) };
          }),
        },
      };
    })
    .catch(err => {
      ctx.body = { success: false, message: "请求错误" };
      console.log(err);
    });
});
export default router;
