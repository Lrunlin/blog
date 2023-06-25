import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import Sequelize from "@/db/config";
import interger from "@/common/verify/integer";

let router = new Router();
router.get("/favorites/:user_id", auth(0), interger([], ["user_id"]), async ctx => {
  let userId = +ctx.params.user_id; //被查询的用户ID

  await DB.Favorites.findAll({
    where: {
      user_id: ctx.id,
      //如果是查询自己的就展示全部，否则展示非隐私文件夹
      is_private: userId == ctx.id ? [true, false] : false,
    },
    attributes: [
      "id",
      "name",
      "is_private",
      ...(ctx.query.edit ? ["description", "user_id"] : []),
      [
        Sequelize.literal(
          `(SELECT COUNT(id) FROM collection WHERE collection.favorites_id LIKE CONCAT('%', favorites.id, '%'))`
        ),
        "favorites_collection_count",
      ],
    ],
    include: [
      {
        model: DB.Collection,
        as: "favorites_data",
        attributes: [],
      },
    ],
    raw: true,
  })
    .then(rows => {
      ctx.body = { success: true, message: "查询用户对应收藏夹", data: rows };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: true, message: "查询用户对应收藏夹，失败" };
      console.log(err);
    });
});
export default router;
