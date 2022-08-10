import Router from "@koa/router";
import DB from "@/db";
import type { Comment } from "@/db/models/init-models";
let router = new Router();

function createCommentTree(data: Comment[]) {
  /** 最终数据*/
  let list = data.map(item => ({ ...item, children: [] as Comment[] })).filter(item => !item.reply);
  /** 仅回复评论*/
  let replyList = data
    .filter(item => item.reply)
    .forEach(item => {
      /** 当前子评论属于那个父评论的children中*/
      //?判断要求父评论的ID和reply相等或者children中有评论和reply相等
      let target = list.find(
        _item =>
          item.reply == _item.id || _item.children.some(_children => _children.id == item.reply)
      );

      let reply = data.find(_item => _item.id == item.reply) as any;

      target?.children.push(
        Object.assign(item, { reply: { content: reply.content, user_data: reply.user_data } })
      );
    });

  return list;
}

router.get("/comment/list/:article_id", async ctx => {
  let articleID = ctx.params.article_id;
  let commentList = await DB.Comment.findAll({
    where: { article_id: articleID },
    include: [
      {
        model: DB.User,
        as: "user_data",
        attributes: ["id","name", "auth", "avatar_file_name", "avatar_url"],
      },
    ],
    order: [["create_time", "desc"]],
    attributes: { exclude: ["client_ip"] },
  });

  //   await new Promise(r =>
  //     setTimeout(() => {
  //       r("");
  //     }, 20100)
  //   );
  ctx.body = {
    success: true,
    message: `查询文章${articleID}的评论数据`,
    data: createCommentTree(commentList.map(item => item.toJSON())),
  };
});
export default router;
