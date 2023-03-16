import Router from "@koa/router";
import DB from "@/db";
import Sequelize from "@/db/config";
import type { UserAttributes } from "@/db/models/user";
let router = new Router();

// 粉丝排行榜
router.get("/ranking/funs", async ctx => {
  const data = await DB.User.findAll({
    offset: 0,
    limit: 5,
    order: [["funs_count", "desc"]],
    attributes: [
      "id",
      "name",
      "auth",
      "avatar_file_name",
      "avatar_url",
      "description",
      "unit",
      "location",
      [
        Sequelize.literal(
          `(SELECT count(id) FROM follow WHERE user.id = follow.belong_id and type="user")`
        ),
        "funs_count",
      ],
    ],
  })
    .then(rows => {
      type userType = UserAttributes & { funs_count: number };
      return rows.filter(item => {
        return !!(item.toJSON() as userType).funs_count;
      });
    })
    .catch(e => {
      console.log(e);
      return [];
    });

  ctx.body = {
    success: true,
    message: "查询作者榜",
    data: data,
  };
});
export default router;
