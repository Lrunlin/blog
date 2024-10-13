import Router from "@koa/router";
import DB from "@/db";
import { WhereOptions } from "sequelize";
import Sequelize from "@/db/config";
import { UserAttributes } from "@/db/models/user";
import authMiddleware from "@/common/middleware/auth";
import interger from "@/common/verify/integer";

let router = new Router();
router.get(
  "/user/list/:page",
  interger([], ["page"]),
  authMiddleware(),
  async (ctx) => {
    let page = +ctx.params.page;

    let where: WhereOptions<UserAttributes> = {};
    if (ctx.query.state) {
      where.state = ctx.query.state;
    }
    if (ctx.query.user_id) {
      where.id = ctx.query.user_id;
    }

    await DB.User.findAndCountAll({
      offset: (page - 1) * 10,
      limit: 10,
      where: where,
      order: [["create_time", "desc"]],
      attributes: {
        exclude: ["password"],
        include: [
          // 发布了多少文章
          [
            Sequelize.literal(
              `(SELECT COUNT(*) FROM article WHERE article.author = user.id and article.state=1)`,
            ),
            "article_count",
          ],
          // 收藏了多少文章
          [
            Sequelize.literal(
              `(SELECT COUNT(*) FROM collection WHERE collection.user_id = user.id)`,
            ),
            "collection_count",
          ],
          [
            // 多少人关注了他
            Sequelize.literal(
              `(SELECT COUNT(*) FROM follow WHERE follow.belong_id = user.id)`,
            ),
            "follower_count",
          ],
          [
            // 他关注了多少人
            Sequelize.literal(
              `(SELECT COUNT(*) FROM follow WHERE follow.user_id = user.id)`,
            ),
            "followe_count",
          ],
          [
            // 评论数量
            Sequelize.literal(
              `(SELECT COUNT(*) FROM comment WHERE comment.user_id = user.id)`,
            ),
            "comment_count",
          ],
        ],
      },
    })
      .then(({ count, rows }) => {
        ctx.body = {
          success: true,
          message: "查询用户列表",
          data: {
            total: count,
            list: rows,
          },
        };
      })
      .catch((err) => {
        ctx.status = 500;
        ctx.body = {
          success: false,
          message: "查询用户列表失败",
        };
        console.log(err);
      });
  },
);
export default router;
