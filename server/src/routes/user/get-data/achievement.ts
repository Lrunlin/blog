import Router from "@koa/router";
import DB from "@/db";

let router = new Router();
// 用户页面的用户成就
router.get("/achievement/:user_id", async ctx => {
  let userID = +ctx.params.user_id;

  //该用户发布的文章数量
  let articleList = DB.Article.count({
    where: { author: userID },
  });

  //判断有多少文章被收藏了
  let articleCollectionCount = await DB.Collection.count({
    include: [
      {
        model: DB.Article,
        where: {
          author: userID,
        },
      },
    ],
  });

  //文章的总阅读数量是多少
  let articleViewCount = (await DB.Article.sum("view_count", { where: { author: userID } })) || 0;

  //被多少人关注了
  let fansCount = DB.Follow.count({ where: { belong_id: userID } });

  await Promise.all([articleCollectionCount, fansCount, articleList, articleViewCount])
    .then(result => {
      let [article_collection_count, funs_count, article_count, article_view_count] = result;
      ctx.body = {
        success: true,
        message: "查询指定用户的成就数据",
        data: {
          article_collection_count,
          funs_count,
          article_count,
          article_view_count,
        },
      };
    })
    .catch(err => {
      ctx.body = {
        success: false,
        message: "查询失败",
        data: {},
      };
      console.log(err);
    });
});
export default router;
