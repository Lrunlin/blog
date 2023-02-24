import Router from "@koa/router";
import DB from "@/db";
import type { Comment } from "@/db/models/init-models";
import interger from "@/common/verify/integer";
import { load } from "cheerio";

let router = new Router();

/** 递归设置评论树*/
export function createCommentTree(data: Comment[]) {
  /** 获取文章中的顶层数据*/
  let list = data.filter(item => !item.reply).map(item => ({ ...item, children: [] as Comment[] }));

  /** 传递评论reply ID找出对应的上级评论并返回*/
  function findTarget(id: number) {
    let target: any;
    function _findTarget(id: number, _list: typeof list) {
      for (const item of _list) {
        if (item.id == id) {
          target = item as any;
          break;
        }
        if (item.children) {
          _findTarget(id, item.children as unknown as typeof list);
        }
      }
    }
    _findTarget(id, list);
    if (target.children) {
      return target;
    } else {
      return Object.assign(target, { children: [] });
    }
  }

  //处理仅回复评论
  data
    .sort((a, b) => +new Date(a.create_time) - +new Date(b.create_time))
    .filter(item => item.reply)
    .forEach(item => {
      let target = findTarget(item.reply as number);
      let $ = load(target.content);
      target.children.push(
        Object.assign(item, {
          reply: {
            user_data: { id: target.user_data.id, name: target.user_data.name },
            content: $("body").text(),
          },
        })
      );
    });

  return list;
}

router.get("/comment/article/:belong_id", interger([], ["belong_id"]), async ctx => {
  let articleID = ctx.params.belong_id;
  let commentList = await DB.Comment.findAll({
    where: { belong_id: articleID },
    include: [
      {
        model: DB.User,
        as: "user_data",
        attributes: ["id", "name", "auth", "avatar_file_name", "avatar_url"],
      },
    ],
    order: [["create_time", "desc"]],
    attributes: { exclude: ["is_review"] },
  });

  ctx.body = {
    success: true,
    message: `查询文章${articleID}的评论数据`,
    data: createCommentTree(commentList.map(item => item.toJSON())),
  };
});
export default router;
