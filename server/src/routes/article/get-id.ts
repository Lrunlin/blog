import Router from "@koa/router";
import DB from "@/db";
import getTagData from "@/common/utils/article/modules/get-type-data";
import cache from "@/common/middleware/cache";

import HTMLToMarkDown from "@/common/utils/article/modules/html-to-markdown";
import getCodeBlockLanguage from "@/common/utils/article/modules/get-code-block-language";
import imgPrefix from "@/common/utils/article/modules/img-add-prefix";

let router = new Router();

router.get("/article/:id", cache, async ctx => {
  let id = +ctx.params.id;

  await DB.Article.findByPk(id, {
    include: [
      {
        model: DB.User,
        as: "author_data",
        attributes: ["id", "name", "auth", "avatar_url"],
      },
    ],
    attributes: {
      exclude: ["author"],
    },
  })
    .then(row => {
      if (row) {
        let data: any = row.toJSON();

        if (!ctx.query.update) {
          data = getCodeBlockLanguage(imgPrefix(getTagData(data) as any) as any);
        } else {
          data = imgPrefix(data, true);
        }

        if (ctx.query.update == "md") {
          data = HTMLToMarkDown(data);
        }

        ctx.body = { success: true, message: "查询成功", data: data };
      } else {
        ctx.status = 404;
        ctx.body = { success: false, message: "没有找到对应的文章", data: [] };
      }
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "查询失败" };
      console.log(err);
    });
});
export default router;
