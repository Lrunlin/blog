import Router from "@koa/router";
import DB from "@/db";
import Sequelize from "@/db/config";
import sequelize from "sequelize";
let router = new Router();

router.get("/ranking/funs", async ctx => {
  const data = await DB.Follow.findAll({
    offset: 0,
    limit: 5,
    order: [["funs_count", "desc"]],
    attributes: [
      [
        Sequelize.literal(`(SELECT count(id) FROM user WHERE user.id = follow.blogger_id)`),
        "funs_count",
      ],
    ],
    include: [
      {
        model: DB.User,
        as: "user_data",
        attributes: [
          "id",
          "name",
          "auth",
          "avatar_file_name",
          "avatar_url",
          "description",
          "unit",
          "location",
        ],
      },
    ],
  })
    .then(rows =>
      rows.map(item => ({
        ...(item.toJSON() as any).user_data,
      }))
    )
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
