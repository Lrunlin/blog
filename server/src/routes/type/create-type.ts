import Router from "@koa/router";
import DB from "@/db";
import id from "@/utils/useId";

let router = new Router();

router.post("/type", async ctx => {
  let { name, description, icon_url } = ctx.request.body;

  let indexes = await DB.Type.findAndCountAll();

  await DB.Type.create({
    id: id(),
    name: name,
    description: description,
    icon_url: icon_url,
    indexes: indexes.count + 1,
    time: new Date(),
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
