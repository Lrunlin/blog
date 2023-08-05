import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import email from "@/common/utils/email";
import sequelize from "@/db/config";
import interger from "@/common/verify/integer";

const schema = Joi.object({
  message: Joi.string().min(0).error(new Error("回复内容错误")),
});

let router = new Router();

router.delete("/friendly-link/:id", interger([], ["id"]), validator(schema), auth(), async ctx => {
  let message = ctx.query.message as string;
  let id = +(ctx.params.id as string);
  const t = await sequelize.transaction();

  //   先判断删除结果
  let deleteResult = await DB.FriendlyLink.destroy({ where: { id: id }, transaction: t })
    .then(res => !!res)
    .catch(() => false);

  if (!deleteResult) {
    ctx.body = { success: false, message: "删除失败" };
    return;
  }

  //删除成功后判断是否需要发送邮件
  if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(message)) {
    ctx.body = { success: true, message: "删除成功，不进行提醒" };
    await t.commit();
    return;
  }

  //   获取友链以及用户ID后发送邮件提醒
  let linkData = await DB.FriendlyLink.findByPk(id)
    .then(row => row || false)
    .catch(() => false as false); //!不加断言影响后面的类型推断
  if (!linkData) {
    ctx.body = { success: false, message: "删除失败" };
    await t.rollback();
    return;
  }

  //根据用户ID查询邮箱发送邮件进行通知，同时进行事务回滚或提交
  let userData = await DB.User.findByPk(linkData.user_id, { attributes: ["email"] });
  if (!userData) {
    ctx.body = { success: false, message: "删除失败" };
    await t.rollback();
    return;
  }

  let emailOption = {
    subject: linkData.state == 1 ? "您的友情链接被删除" : "您的友情链接没有通过",
    content: `
      <h2>${linkData.state == 1 ? "您的友链链接被删除" : "您的友链链接互换申请失败"}</h2>
      <div>站名:${process.env.SITE_NAME} (${process.env.CLIENT_HOST})</div>
      <div>名称:${linkData.name}</div>
      <div>链接:${linkData.url}</div>
      <div>回复:${message}</div>
      `,
  };
  await email({ ...emailOption, target: userData.email })
    .then(async res => {
      ctx.body = { success: true, message: "删除成功，发送提醒邮件" };
      await t.commit();
    })
    .catch(async err => {
      ctx.body = { success: false, message: "删除失败,邮件发送错误" };
      await t.rollback();
    });
});
export default router;
