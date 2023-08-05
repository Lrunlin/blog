import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import sequelize from "@/db/config";
import sendEmail from "@/common/utils/email";
import interger from "@/common/verify/integer";

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

  await sendEmail({
    target: email,
    subject: "您的友链申请已通过",
    content: `
  <h2>友链申请通过</h2>
  <div>
    <div>${name}:</div>
    <div>
     您的在网站<a href="${process.env.CLIENT_HOST}">${process.env.SITE_NAME}</a>上的友链申请通过啦。
     </div>
     <div>请将本站添加至您的网站中</div>
  </div>
  `,
  })
    .then(async () => {
      ctx.body = { success: true, message: "修改成功" };
      await t.commit();
    })
    .catch(async () => {
      ctx.body = { success: false, message: "修改失败，邮箱发送错误" };
      await t.rollback();
    });
});
export default router;
