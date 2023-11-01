import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import { Op } from "sequelize";
import redis from "@/common/utils/redis";


let router = new Router();
router.get("/statistics/index", auth(), async ctx => {
  let link = DB.FriendlyLink.findAndCountAll({ where: { state: 0 }, raw: true })
    .then(({ count }) => ({ type: "friendly-link", count: count }))
    .catch(() => []);

  let adminId = await DB.User.findAll({ where: { auth: 1 }, attributes: ["id"], raw: true }).then(
    rows => rows.map(item => item.id)
  );

  let comment = DB.Comment.findAndCountAll({
    where: { is_review: 0, user_id: { [Op.not]: adminId } },
    raw: true,
  })
    .then(({ count }) => ({ type: "comment", count: count }))
    .catch(() => []);
  let repositoryData = (await redis.get("visualization-github")) as string;

  await Promise.all([link, comment])
    .then(data => {
      ctx.body = {
        success: true,
        message: "查询首页内容",
        data: {
          notice: data.flat().filter(item => item.count),
          repository_data: JSON.parse(repositoryData),
        },
      };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: "查询失败",
      };
    });
});
export default router;
