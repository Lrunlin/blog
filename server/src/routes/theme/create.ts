import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/theme/create";

let router = new Router();

// 检测是否设置了默认样式
if ([undefined, "0"].includes(process.env.NODE_APP_INSTANCE)) {
  DB.Theme.findOne({ where: { id: 0 } }).then(row => {
    if (!row) {
      throw new Error("主题表（Theme）需要设置默认样式{id:0}");
    }
  });
}

router.post("/theme", verify, async ctx => {
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
    .then(res => {
      ctx.body = { success: true, message: "添加成功" };
    })
    .catch(err => {
      console.log(err);
      ctx.body = { success: false, message: "添加失败" };
      ctx.status = 500;
    });
});
export default router;
