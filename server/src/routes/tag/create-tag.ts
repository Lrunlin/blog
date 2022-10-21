import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import authMiddleware from "@/common/middleware/auth";

let router = new Router();

router.post("/tag", authMiddleware(), async ctx => {
  let { name, belong, icon_file_name } = ctx.request.body;
  let indexes = await DB.Tag.findAndCountAll({
    where: {
      belong: belong,
    },
  });

  await DB.Tag.create({
    id: id(),
    name: name,
    belong: belong,
    icon_file_name: icon_file_name,
    indexes: indexes.count + 1,
  })
    .then(res => {
      ctx.body = { success: true, message: `成功添加类型:${name}` };
    })
    .catch(err => {
      ctx.body = { success: false, message: "添加失败" };
      console.log(err);
    });
});
export default router;
