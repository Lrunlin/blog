import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import authMiddleware from "@/common/middleware/auth";

let router = new Router();

router.post("/tag", authMiddleware(), async ctx => {
  let { name, belong_id, icon_file_name, description } = ctx.request.body;
  let indexes = await DB.Tag.findAndCountAll({
    where: {
      belong_id: belong_id,
    },
  });

  await DB.Tag.create({
    id: id(),
    name: name,
    belong_id: belong_id,
    icon_file_name: icon_file_name,
    indexes: indexes.count + 1,
    description,
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
