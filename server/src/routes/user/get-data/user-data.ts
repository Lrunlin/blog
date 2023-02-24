import Router from "@koa/router";
import DB from "@/db";
import Sequelize from "@/db/config";
import interger from "@/common/verify/integer";

let router = new Router();
router.get("/user/data/:id",interger([],['id']), async ctx => {
  await DB.User.findByPk(ctx.params.id, {
    attributes: {
      exclude: ["password"],
      include: [
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM article WHERE article.author = user.id and article.state=1)`
          ),
          "article_count",
        ],
        [
          Sequelize.literal(`(SELECT COUNT(*) FROM collection WHERE collection.user_id = user.id)`),
          "collection_count",
        ],
        [
          // 多少人关注了他
          Sequelize.literal(`(SELECT COUNT(*) FROM follow WHERE follow.belong_id = user.id and type="user")`),
          "follower_count",
        ],
        [
          // 他关注了多少人
          Sequelize.literal(`(SELECT COUNT(*) FROM follow WHERE follow.user_id = user.id)`),
          "followee_count",
        ],
      ],
    },
  }).then(row => {
    let isSuccess = !!row;
    if (!isSuccess) {
      ctx.status = 404;
    }
    ctx.body = { success: isSuccess, message: isSuccess ? "查询成功" : "查询失败", data: row };
  });
});
export default router;
