import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import sequelize from "@/db/config";
import sendEmail from "@/common/utils/email";
import interger from "@/common/verify/integer";
import fs from "fs";
import ejs from "ejs";

let router = new Router();

router.put("/friendly-link/:id", interger([], ["id"]), auth(), async ctx => {
  let id = ctx.params.id;
  let t = await sequelize.transaction();
  let updateResult = await DB.FriendlyLink.update(
    { state: 1 },
    { where: { id: id }, transaction: t }
  )
    .then(([res]) => !!res)
    .catch(() => false);

  if (!updateResult) {
    ctx.body = { success: false, message: "更新失败" };
    await t.rollback();
    return;
  }

  let linkData = await DB.FriendlyLink.findByPk(id, {
    attributes: [],
    include: [
      {
        model: DB.User,
        as: "user_data",
        attributes: ["name", "email"],
      },
    ],
  });

  let { email, name }: { email: string; name: string } = (linkData as any).user_data;

  const content = ejs.render(fs.readFileSync("src/views/friendly-apply.ejs").toString(), {
    site_href: process.env.CLIENT_HOST,
    site_name: process.env.SITE_NAME,
    user_name: name,
  });

  await sendEmail({
    target: email,
    subject: "您的友链申请已通过",
    content: content,
  })
    .then(async () => {
      ctx.body = { success: true, message: "修改成功" };
      await t.commit();
    })
    .catch(async () => {
      ctx.status = 500;
      ctx.body = { success: false, message: "修改失败，邮箱发送错误" };
      await t.rollback();
    });
});
export default router;
