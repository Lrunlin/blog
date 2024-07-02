import Router from "@koa/router";
import DB from "@/db";
import getUserId from "@/common/middleware/auth/getUserId";
import getGithubName from "@/common/modules/github/getGithubName";
import updata from "@/common/modules/github/updata";
import sign from "@/common/utils/auth/sign";

let router = new Router();

// 如果有绑定了指定github的字段就登录，否则就是绑定
router.post("/user/github", getUserId, async (ctx) => {
  let { code } = ctx.request.body;
  let githubName = await getGithubName(code);

  if (!githubName) {
    ctx.body = { success: false, message: "Github服务器访问失败，请稍后再试" };
    return;
  }

  // 判断是否有用户绑定了该github用户名
  let userData = await DB.User.findOne({
    where: { github: githubName },
    attributes: ["id", "auth"],
    raw: true,
  })
    .then((row) => row)
    .catch(() => false as false);

  if (userData == false) {
    ctx.body = { success: false, message: "数据库查询错误，绑定失败" };
    return;
  }

  if (userData == null) {
    if (ctx.id) {
      ctx.body = await updata(ctx.id as number, githubName);
    } else {
      ctx.body = { success: false, message: `没有找到对应的账户` };
    }
  } else {
    ctx.body = {
      success: true,
      message: "登录成功",
      token: await sign({ id: userData.id, auth: userData.auth }),
    };
  }
});
export default router;
