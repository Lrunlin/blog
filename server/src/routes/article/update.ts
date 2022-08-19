import Router from "@koa/router";
import auth from "@/common/middleware/auth";
import DB from "@/db";
let router = new Router();
import { verifyStateMiddleware, verifyParamsMiddleware } from "@/common/verify/update-article";

router.put(
  "/article/:id",
  auth([0, 1]),
  verifyStateMiddleware,
  verifyParamsMiddleware,
  async ctx => {
    let { title, description, cover_file_name, reprint, content, tag, view_count, state } =
      ctx.request.body;
    let id = ctx.params.id;
    let where: { id: string; author?: number } = {
      id: id,
    };

    if (ctx.auth != 1) {
      where.author = ctx.id;
    }

    /** 如果state本来就是1那么就不接受修改否则可以修改*/
    let oldState = await DB.Article.findByPk(id)
      .then(res => {
        if (res) {
          return res.state;
        } else {
          ctx.body = { success: false, message: "修改错误" };
          return null;
        }
      })
      .catch(err => {
        ctx.body = { success: false, message: "修改错误" };
        return null;
      });

    if (typeof oldState != "number") {
      return;
    }

    await DB.Article.update(
      {
        title: title,
        description: description,
        cover_file_name: cover_file_name,
        reprint: reprint,
        content: content,
        tag: tag,
        state: oldState == 1 ? 1 : state,
        update_time: new Date(),
        view_count: ctx.auth == 1 ? view_count : undefined,
      },
      {
        where: where,
      }
    )
      .then(result => {
        let isSuccess = !!result[0];
        ctx.body = { success: isSuccess, message: `成功修改${result[0]}条内容` };
      })
      .catch(err => {
        ctx.body = { success: false, message: "修改错误" };
        console.log(err);
      });
  }
);
export default router;
