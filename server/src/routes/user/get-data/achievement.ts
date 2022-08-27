import Router from "@koa/router";
import DB from "@/db";

let router = new Router();
// 用户页面的用户成就
router.get("/achievement/:user_id", async ctx => {
  let userID = +ctx.params.user_id;

  //   该用户发布的文章
  let articleList = DB.Article.findAll({
    where: { author: userID },
    attributes: ["id", "view_count"],
  });
  //判断有多少文章被收藏了
  let articleCollectionCount = Promise.all(
    (await articleList).map(item => DB.Collection.findOne({ where: { article_id: item.id } }))
  ).then(result => {
    return result.filter(item => item).length;
  });

  //被多少人关注了
  let fansCount = DB.Follow.findAll({ where: { blogger_id: userID } });

 await Promise.all([articleCollectionCount, fansCount, articleList])
    .then(result => {
      ctx.body = {
        success: true,
        message: "查询指定用户的成就数据",
        data: {
          article_collection_count: result[0],
          funs_count: result[1].length,
          article_count: result[2].length,
          article_view_count: result[2]
            .map(item => item.toJSON())
            .reduce((total, item) => (total += item.view_count), 0),
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
