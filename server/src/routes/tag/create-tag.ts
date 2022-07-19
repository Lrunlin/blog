import Router from "@koa/router";
import DB from "@/db";
import id from "@/utils/useId";

let router = new Router();

router.post("/tag", async ctx => {
  let { name, belong, icon_url } = ctx.request.body;

  let indexes = await DB.Tag.findAndCountAll({
    where: {
      belong: belong,
    },
  });

  await DB.Tag.create({
    id: id(),
    name: name,
    belong: belong,
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
