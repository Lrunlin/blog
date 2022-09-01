import Router from "@koa/router";
import DB from "@/db";
import getUserId from "@/common/middleware/getUserId";

let router = new Router();

// 用户的粉丝列表
router.get("/follower/:user_id", getUserId, async ctx => {
  let userID = ctx.params.user_id;
  let page = +(ctx.query.page as unknown as string);

  // 查询粉丝列表
  let { count, rows: followList } = await DB.Follow.findAndCountAll({
    where: { blogger_id: userID },
    offset: (page - 1) * 20,
    limit: 20,
    order: [["create_time", "desc"]],
    attributes: ["id"],
  });

  // 根据粉丝列表查询指定的用户信息
  let userList = await DB.User.findAll({
    where: { id: followList.map(item => item.id) },
    attributes: ["id", "name", "description", "avatar_file_name", "avatar_url"],
  });

  // 根据用户信息查询浏览页面的用户是否关注了这些用户
  await Promise.all(
    userList.map(item =>
      DB.Follow.findOne({
        where: { user_id: ctx.id, blogger_id: item.id },
        attributes: ["id"],
      })
    )
  )
    .then(rows => {
      ctx.body = {
        success: true,
        message: `查询用户ID为${userID}的粉丝列表`,
        data: {
          total: count,
          list: userList.map((item, index) => ({ ...item.toJSON(), isFollow: !!rows[index] })),
        },
      };
    })
    .catch(err => {
      ctx.body = {
        success: false,
        message: "查询失败",
        data: {
          total: 0,
          list: [],
        },
      };
      console.log(err);
    });
    
});
export default router;
