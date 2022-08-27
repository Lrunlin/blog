import Router from "@koa/router";
import DB from "@/db";
import useID from "@/common/hooks/useId";
import auth from "@/common/middleware/auth";
let router = new Router();
router.post("/advertisement", auth(1), async ctx => {
  let { poster_file_name, url, indexes, position } = ctx.request.body;
  let id = useID();

  await DB.Advertisement.create({
    id: id,
    poster_file_name: poster_file_name,
    url: url,
    indexes: indexes,
    position: position,
    create_time: new Date(),
  })
    .then(res => {
      ctx.body = { success: true, message: "添加成功" };
    })
    .catch(err => {
      ctx.body = { success: false, message: "添加失败" };
      console.log(err);
    });
});
export default router;
