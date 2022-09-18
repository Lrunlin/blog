import Router from "@koa/router";
import DB from "@/db";
import type { Comment } from "@/db/models/init-models";
import interger from "@/common/verify/integer";
let router = new Router();

function createCommentTree(data: Comment[]) {
  /** 文章中的顶层数据*/
  let list = data.filter(item => !item.reply).map(item => ({ ...item, children: [] as Comment[] }));

  /** 处理仅回复评论*/
  data
    .filter(item => item.reply)
    .filter(item => {
      // 处理二级评论
      /** 当前子评论属于那个评论的children中*/
      //?判断要求父评论的ID和reply相等或者children中有评论和reply相等
      let target = list.find(
        _item =>
          item.reply == _item.id || _item.children.some(_children => _children.id == item.reply)
      );

      // 为上级评论添加子集
      target?.children.push(item);
      return !target;
    })
    .forEach(item => {
      // 三级评论
      let target = list.find(
        _item =>
          item.reply == _item.id || _item.children.some(_children => _children.id == item.reply)
      );
      /** 上级元素的信息*/
      let reply = data.find(_item => _item.id == item.reply) as any;
      target?.children.push(
        Object.assign(item, { reply: { content: reply.content, user_data: reply.user_data } })
      );
    });

  return list;
}

router.get("/comment/list/:article_id", interger([], ["article_id"]), async ctx => {
  let articleID = ctx.params.article_id;
  let commentList = await DB.Comment.findAll({
    where: { article_id: articleID },
    include: [
      {
        model: DB.User,
        as: "user_data",
        attributes: ["id", "name", "auth", "avatar_file_name", "avatar_url"],
      },
    ],
    order: [["create_time", "desc"]],
    attributes: { exclude: ["client_ip", "is_examine", "is_review"] },
  });
  ctx.body = {
    success: true,
    message: `查询文章${articleID}的评论数据`,
    data: createCommentTree(commentList.map(item => item.toJSON())),
  };
});
export default router;
