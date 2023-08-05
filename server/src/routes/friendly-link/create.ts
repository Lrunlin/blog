import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import authMiddleware from "@/common/middleware/auth";
import verify from "@/common/verify/api-verify/friendly-link/create";

let router = new Router();

/** 管理员添加友链用于没在网站注册的用户*/
router.post("/friendly-link", authMiddleware(), verify, async ctx => {
  let { name, url, logo_file_name } = ctx.request.body;

  await DB.FriendlyLink.create({
    id: id(),
    name,
    url,
    logo_file_name,
    create_time: new Date(),
    state: 1,
  })
    .then(() => {
      ctx.body = { success: true, message: "创建成功" };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "创建失败" };
      console.log(err);
    });
});
export default router;
