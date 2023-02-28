import Router from "@koa/router";
import DB from "@/db";
import getTagData from "@/common/modules/article/get/get-tag-data";
import getCodeBlockLanguage from "@/common/modules/article/get/get-code-block-language";
import type { AnswerAttributes } from "@/db/models/answer";
import setImageTag from "@/common/modules/article/get/img-add-prefix";
import Sequelize from "@/db/config";
import verify from "@/common/verify/api-verify/problem/questions";
let router = new Router();

/** 问答功能评论处理
 * 处理问题的答案的评论
 * 为comment中的reply添加用户名和用户ID
 */
function createCommentTree(data: any) {
  /** 获取答案中的的全部评论*/
  let answerCommentList = data.answer_list.map((item: any) => item.comment_list).flat();
  return Object.assign(data, {
    answer_list: data.answer_list
      .map((item: any) => {
        return Object.assign(item, {
          content: setImageTag(item.content, { prefix: "answer", update: true }),
          comment_list: item.comment_list
            .map((_item: any) => {
              if (_item.reply) {
                let target = answerCommentList.find((_comment: any) => _comment.id == _item.reply);
                return Object.assign(_item, {
                  reply: target.user_data,
                });
              } else {
                return _item;
              }
            })
            .sort((a: any, b: any) => +new Date(a.create_time) - +new Date(b.create_time)),
          like_data: item.like_data.length ? item.like_data[0] : { like_count: 0, like_state: 0 },
        });
      })
      .sort((a: any) => {
        return a.id == data.answer_id ? 1 - 2 : 2 - 1;
      }),
    comment_list: data.comment_list
      .map((_item: any) => {
        if (_item.reply) {
          let target = data.comment_list.find((_comment: any) => _comment.id == _item.reply);
          return Object.assign(_item, { reply: target.user_data });
        } else {
          return _item;
        }
      })
      .sort((a: any, b: any) => +new Date(a.create_time) - +new Date(b.create_time)),
  });
}

/** 为问题的收藏数据、点赞数据、关注数据进行初始化*/
function problemInit(data: any) {
  return Object.assign(data, {
    collection_data: data.collection_data || { collection_count: 0, collection_state: 0 },
    like_data: data.like_data || { like_count: 0, like_state: 0 },
    follow_data: data.follow_data || { follow_count: 0, follow_state: 0 },
  });
}

/** 查看问题以及回答详情*/
router.get("/problem/:id", verify, async ctx => {
  const id = ctx.params.id;
  const data = await DB.Problem.findByPk(id, {
    include: [
      {
        model: DB.Collection,
        as: "collection_data",
        attributes: [
          [
            Sequelize.literal(
              `(SELECT COUNT(id) FROM collection WHERE collection.belong_id = problem.id)`
            ),
            "collection_count",
          ],
          [
            Sequelize.literal(
              `(SELECT COUNT(id) FROM collection WHERE collection.user_id = ${
                ctx.id || -1
              } and collection.belong_id=${id})`
            ),
            "collection_state",
          ],
        ],
      },
      {
        model: DB.Likes,
        as: "like_data",
        attributes: [
          [
            Sequelize.literal(`(SELECT COUNT(id) FROM likes WHERE likes.belong_id = problem.id)`),
            "like_count",
          ],
          [
            Sequelize.literal(
              `(SELECT COUNT(id) FROM likes WHERE likes.user_id = ${
                ctx.id || -1
              } and likes.belong_id=${id})`
            ),
            "like_state",
          ],
        ],
      },
      {
        model: DB.User,
        as: "author_data",
        attributes: ["id", "name", "auth", "avatar_file_name", "avatar_url"],
      },
      {
        model: DB.Follow,
        as: "follow_data",
        attributes: [
          [
            Sequelize.literal(`(SELECT COUNT(id) FROM follow WHERE follow.belong_id = problem.id)`),
            "follow_count",
          ],
          [
            Sequelize.literal(
              `(SELECT COUNT(id) FROM follow WHERE follow.user_id = ${
                ctx.id || -1
              } and follow.belong_id=problem.id)`
            ),
            "follow_state",
          ],
        ],
      },
      {
        model: DB.Comment,
        as: "comment_list",
        attributes: {
          exclude: ["is_review"],
        },
        include: [
          {
            model: DB.User,
            as: "user_data",
            attributes: ["id", "name"],
          },
        ],
      },
      {
        model: DB.Answer,
        as: "answer_list",
        separate: true,
        include: [
          {
            model: DB.Likes,
            as: "like_data",
            attributes: [
              [
                Sequelize.literal(
                  `(SELECT COUNT(id) FROM likes WHERE likes.belong_id = answer.id)`
                ),
                "like_count",
              ],
              [
                Sequelize.literal(
                  `(SELECT COUNT(id) FROM likes WHERE likes.user_id = ${ctx.id || -1})`
                ),
                "like_state",
              ],
            ],
          },
          {
            model: DB.User,
            as: "author_data",
            attributes: ["id", "name", "auth", "avatar_file_name", "avatar_url"],
          },
          {
            model: DB.Comment,
            as: "comment_list",
            attributes: {
              exclude: ["is_review"],
            },
            include: [
              {
                model: DB.User,
                as: "user_data",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
      },
    ],
  })
    .then(row => {
      if (row) {
        let data = row.toJSON();
        let tag = getTagData(data.tag as unknown as number[], ["name"]);
        let _data = { ...data, tag } as unknown as {
          answer_list: AnswerAttributes[];
          content: string;
        };
        // 累加一下，获取问题和所有回答中代码块使用的语言
        let content = (_data as unknown as { answer_list: AnswerAttributes[] }).answer_list.reduce(
          (total, item) => {
            return (total += item.content);
          },
          _data.content
        );
        return createCommentTree(
          problemInit(
            Object.assign(
              _data,
              getCodeBlockLanguage(
                setImageTag(_data.content, { prefix: "problem", update: true }, data.title)
              )
            )
          )
        );
      } else {
        return row;
      }
    })
    .catch(err => {
      console.log(err);
      return null;
    });

  ctx.body = { success: !!data, message: data ? "查询成功" : "查询失败", data: data };
});
export default router;
