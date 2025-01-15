import Router from "@koa/router";
import DB from "@/db";
import Sequelize from "@/db/config";
import type { AnswerAttributes } from "@/db/models/answer";
import setExternalLink from "@/common/modules/article/get/external-link";
import setImageTag from "@/common/modules/article/get/img-add-prefix";
import getCodeBlockLanguage from "@/common/modules/article/get/set-code-block-language";
import getTagData from "@/common/modules/article/get/set-tag-data";
import verify from "@/common/verify/api-verify/problem/questions";

let router = new Router();

/** 问答功能评论处理
 * 处理问题的答案的评论
 * 为comment中的reply添加用户名和用户ID
 */
function createCommentTree(data: any) {
  /** 获取答案中的的全部评论*/
  let answerCommentList = data.answer_list
    .map((item: any) => item.comment_data)
    .flat();
  return Object.assign(data, {
    answer_list: data.answer_list
      .map((item: any) => {
        return Object.assign(item, {
          content: setImageTag(
            setExternalLink(item.content),
            "answer",
            "answer image",
          ),
          comment_data: item.comment_data
            .map((_item: any) => {
              if (_item.reply) {
                let target = answerCommentList.find(
                  (_comment: any) => _comment.id == _item.reply,
                );
                return Object.assign(_item, {
                  reply: target.user_data,
                });
              } else {
                return _item;
              }
            })
            .sort(
              (a: any, b: any) =>
                +new Date(a.create_time) - +new Date(b.create_time),
            ),
          like_data: item.like_data.length
            ? item.like_data[0]
            : { like_count: 0, like_state: 0 },
        });
      })
      .sort((a: any) => {
        return a.id == data.answer_id ? 1 - 2 : 2 - 1;
      }),
    comment_data: data.comment_data
      .map((_item: any) => {
        if (_item.reply) {
          let target = data.comment_data.find(
            (_comment: any) => _comment.id == _item.reply,
          );
          return Object.assign(_item, { reply: target.user_data });
        } else {
          return _item;
        }
      })
      .sort(
        (a: any, b: any) => +new Date(a.create_time) - +new Date(b.create_time),
      ),
  });
}

/** 为问题的收藏数据、点赞数据、关注数据进行初始化*/
function problemInit(data: any) {
  return Object.assign(data, {
    like_data: data.like_data || { like_count: 0, like_state: 0 },
    follow_data: data.follow_data || { follow_count: 0, follow_state: 0 },
  });
}

/** 查看问题以及回答详情*/
router.get("/problem/:id", verify, async (ctx) => {
  const id = ctx.params.id;
  const data = await DB.Problem.findByPk(id, {
    attributes: {
      include: [
        [
          Sequelize.literal(
            `(SELECT COUNT(DISTINCT user_id) FROM collection WHERE collection.belong_id = article.id)`,
          ),
          "collection_count",
        ],
        [
          Sequelize.literal(
            `(SELECT GROUP_CONCAT(favorites_id) FROM collection WHERE collection.user_id = ${ctx.id || -1} and belong_id = ${id})`,
          ),
          "collection_state",
        ],
      ],
    },
    include: [
      {
        model: DB.ArticleTag, // 通过中间表关联标签
        as: "tag_problem_list", // 使用 Problem 与 ArticleTag 之间关系的别名
        attributes: ["tag_id"], // 获取 tag_id
        include: [
          {
            model: DB.Tag, // 关联 Tag 表
            as: "tag_data", // Tag 表的别名
            attributes: ["id", "name"], // 获取 Tag 的 id 和 name
          },
        ],
      },
      {
        model: DB.Likes,
        as: "like_data",
        attributes: [
          [
            Sequelize.literal(
              `(SELECT COUNT(id) FROM likes WHERE likes.belong_id = problem.id)`,
            ),
            "like_count",
          ],
          [
            Sequelize.literal(
              `(SELECT COUNT(id) FROM likes WHERE likes.user_id = ${
                ctx.id || -1
              } and likes.belong_id=${id})`,
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
            Sequelize.literal(
              `(SELECT COUNT(id) FROM follow WHERE follow.belong_id = problem.id)`,
            ),
            "follow_count",
          ],
          [
            Sequelize.literal(
              `(SELECT COUNT(id) FROM follow WHERE follow.user_id = ${
                ctx.id || -1
              } and follow.belong_id=problem.id)`,
            ),
            "follow_state",
          ],
        ],
      },
      {
        model: DB.Comment,
        as: "comment_data",
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
                  `(SELECT COUNT(id) FROM likes WHERE likes.belong_id = answer.id)`,
                ),
                "like_count",
              ],
              [
                Sequelize.literal(
                  `(SELECT COUNT(id) FROM likes WHERE likes.user_id = ${ctx.id || -1})`,
                ),
                "like_state",
              ],
            ],
          },
          {
            model: DB.User,
            as: "author_data",
            attributes: [
              "id",
              "name",
              "auth",
              "avatar_file_name",
              "avatar_url",
            ],
          },
          {
            model: DB.Comment,
            as: "comment_data",
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
    .then((row) => {
      if (row) {
        let data = row.toJSON();
        let tag = (data as any).tag_problem_list.map((article_tag: any) => ({
          id: article_tag.tag_data.id,
          name: article_tag.tag_data.name,
        }));
        let _data = { ...data, tag } as unknown as {
          answer_list: AnswerAttributes[];
          content: string;
        };

        return createCommentTree(
          problemInit(
            Object.assign(
              _data,
              getCodeBlockLanguage(
                setImageTag(
                  setExternalLink(_data.content),
                  "problem",
                  data.title,
                ),
              ),
              {
                answer_list: _data.answer_list.map((item) =>
                  Object.assign(
                    item,
                    getCodeBlockLanguage(setExternalLink(item.content)),
                  ),
                ),
              },
            ),
          ),
        );
      } else {
        return row;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  if (data) {
    let language = (data.answer_list || []).reduce(
      (total: any, item: any, index: number) => {
        if (item.language) {
          let data = total.concat(item.language);
          item.language = undefined;
          return data;
        } else {
          item.language = undefined;
          return total;
        }
      },
      data.language || [],
    );

    if (data?.collection_state) {
      data.collection_state = data.collection_state
        .split(",")
        .map((item: string) => +item);
    }

    if (language) {
      data.language = [...new Set(language)];
    }
  }

  if (data) {
    ctx.body = { success: true, message: "查询成功", data: data };
  } else {
    ctx.body = { success: false, message: "查询失败" };
    ctx.status = 404;
  }
});
export default router;
