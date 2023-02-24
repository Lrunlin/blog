import Router from "@koa/router";
import DB from "@/db";
import integer from "@/common/verify/integer";
import getUserId from "@/common/middleware/getUserId";

let router = new Router();

// 用户的关注列表(他是哪些人的粉丝)
router.get("/following/:user_id", integer(["page"], ["user_id"]), getUserId, async ctx => {
  let userID = ctx.params.user_id;
  let page = +(ctx.query.page as unknown as string);

  // 查询关注列表
  let { count, rows: followList } = await DB.Follow.findAndCountAll({
    where: { user_id: userID },
    offset: (page - 1) * 20,
    limit: 20,
    order: [["create_time", "desc"]],
    attributes: ["belong_id"],
  });

  // 根据关注列表查询指定的用户信息
  let userList = await DB.User.findAll({
    where: { id: followList.map(item => item.belong_id) },
    attributes: ["id", "name", "description", "avatar_file_name", "avatar_url"],
  });

  // 根据用户信息查询浏览页面的用户是否关注了这些用户
  await Promise.all(
    userList.map(item =>
      DB.Follow.findOne({
        where: { user_id: ctx.id, belong_id: item.id },
        attributes: ["id"],
      })
    )
  )
    .then(rows => {
      ctx.body = {
        success: true,
        message: `查询用户ID为${userID}的关注列表`,
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
