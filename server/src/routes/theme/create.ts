import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/theme/create";

let router = new Router();
// 检测是否设置了默认样式
(async () => {
  if ([undefined, "0"].includes(process.env.NODE_APP_INSTANCE)) {
    let row = await DB.Theme.findOne({ where: { id: 0 } })
      .then((row) => row)
      .catch((err) => {
        console.log("查询默认主题失败", err);
        return true;
      });
    if (row) {
      return;
    }
    console.log(
      `主题表（Theme）需要设置默认样式{id:0} 开始自动添加默认主题信息。`,
    );
    // 查询目前多少主题
    let count = await DB.Theme.count();
    //查询管理员的ID或用户ID
    let userId = await DB.User.findOne({
      order: [["auth", "DESC"]],
      attributes: ["id"],
    })
      .then((row) => row?.id)
      .catch((err) => {
        console.log("查询用户失败");
        return false as false;
      });
    if (!userId) {
      console.log(
        "没有查询到管理员或者用户，无法为默认主题设置作者ID，待注册用户后自动添加默认主题。",
      );
      return;
    }

    DB.Theme.create({
      id: 0,
      name: "default",
      content: "",
      author: userId,
      state: 1,
      create_time: new Date(),
      indexes: count + 1,
    })
      .then((res) => {
        if (res) {
          console.log("默认主题创建成功");
        }
      })
      .catch((err) => {
        console.log("默认主题创建失败", err);
      });
  }
})();

router.post("/theme", verify, async (ctx) => {
  let count = await DB.Theme.count();

  await DB.Theme.create({
    id: id(),
    name: ctx.request.body.name,
    content: ctx.request.body.content,
    author: ctx.id as number,
    state: ctx.auth == 1 ? 1 : 0,
    create_time: new Date(),
    indexes: count + 1,
  })
    .then((res) => {
      ctx.body = { success: true, message: "添加成功" };
    })
    .catch((err) => {
      console.log(err);
      ctx.body = { success: false, message: "添加失败" };
      ctx.status = 500;
    });
});
export default router;
