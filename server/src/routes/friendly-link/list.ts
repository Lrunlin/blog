import Router from "@koa/router";
import DB from "@/db";
import getUserId from "@/common/middleware/auth/getUserId";
import redis from "@/common/utils/redis";

let router = new Router();
router.get("/friendly-link", getUserId, async ctx => {
  await DB.FriendlyLink.findAll({
    where: ctx.auth != 1 ? { state: 1 } : undefined,
    attributes: { exclude: ctx.auth != 1 ? ["create_time", "is_allow", "user_id"] : ["user_id"] },
    order: [["create_time", "desc"]],
    include: [
      {
        model: DB.User,
        as: "user_data",
        attributes: ["id", "name", "auth", "avatar_file_name", "avatar_url"],
      },
    ],
  })
    .then(async (rows: any[]) => {
      if (ctx.auth == 1) {
        let responseData = await redis.get("friendly-link-response-time");
        if (responseData) {
          let data = JSON.parse(responseData);
          rows = rows.map(item => {
            return Object.assign(item.toJSON(), data[item.id] || {});
          });
        }
      }
      ctx.body = { success: true, message: "查询友链列表", data: rows };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "查询错误" };
      console.log(err);
    });
});
export default router;
