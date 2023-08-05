import Router from "@koa/router";
import DB from "@/db";
import getTagData from "@/common/modules/article/get/set-tag-data";
import setDescription from "@/common/modules/article/get/set-description";
import Sequelize from "@/db/config";
import integer from "@/common/verify/integer";
let router = new Router();

// 查询指定用户收藏的文章
router.get("/collection/:user_id", integer([], ["user_id"]), async ctx => {
  let page = +(ctx.query.page as string) || 1;

  let { count: collectionCount, rows: collectionList } = await DB.Collection.findAndCountAll({
    where: { user_id: ctx.params.user_id },
    offset: (page - 1) * 10,
    limit: 10,
    attributes: ["belong_id"],
    order: [["create_time", "desc"]],
  });

  await DB.Article.findAll({
    where: { id: collectionList.map(item => item.toJSON().belong_id) },
    include: [
      {
        model: DB.User,
        as: "author_data",
        attributes: ["name"],
      },
    ],
    attributes: [
      "id",
      "title",
      "description",
      "cover_file_name",
      "cover_url",
      "state",
      "create_time",
      "tag",
      "content",
      "view_count",
      "update_time",
      [
        Sequelize.literal(
          `(SELECT COUNT(*) FROM comment WHERE comment.belong_id = article.id and type="article")`
        ),
        "comment_count",
      ],
      [
        Sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE likes.belong_id = article.id)`),
        "like_count",
      ],
    ],
  })
    .then(rows => {
      ctx.body = {
        success: true,
        message: "查询指定用户的文章收藏列表",
        data: {
          total: collectionCount,
          list: rows.map(row => {
            let item = row.toJSON();
            let description = setDescription(item.content);
            let tag = getTagData(item.tag as unknown as number[], ["name"]);
            (item as any).content = undefined;
            return Object.assign(item, {
              description,
              tag,
              content: undefined,
            });
          }),
        },
      };
    })
    .catch(err => {
      ctx.body = { success: false, message: "查询失败" };
      console.log(err);
    });
});
export default router;
